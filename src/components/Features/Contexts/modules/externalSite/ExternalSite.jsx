import React, { useContext, useState, useEffect } from "react";

// import loading lib
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

// icons
import { IoIosArrowBack } from "react-icons/io";

// context
import NewContextContext from "../../../../../contexts/NewContext";
import CurrentContextIdContext from "../../../../../contexts/CurrentContextId";

// helpers
import postReq from "../../../../../helpers/postReq";
import getUid from "../../helpers/getUid";
import LoadingOnCreation from "../../helpers/LoadingOnCreation";

const ExternalSite = () => {
  const { contextScreen, setContextScreens } = useContext(NewContextContext);
  const { currentContextId, setCurrentContextId } = useContext(
    CurrentContextIdContext
  );

  // new context form state
  const [formDataG, setFormDataG] = useState({
    name: "",
  });
  const [typeOfWebsite, setTypeOfWebsite] = useState("single");
  const [websiteLinks, setWebsiteLinks] = useState("");

  // form btn loading state
  const [newContextLoading, setNewContextLoading] = useState(false);

  // loading component state
  const [loadingStates, setLoadingStates] = useState([
    {
      text: "Preparing",
      status: false,
    },
    {
      text: "Indexing",
      status: false,
    },
    {
      text: "finishing",
      status: false,
    },
  ]);

  const backLogic = () => {
    setContextScreens({
      moduleType: true,
      first: false,
      copyAndPaste: false,
      moduleStatus: false,
      pdf: false,
      externalSite: false,
      publicDisc: false,
      txt: false,
      googleDrive: false,
    });
  };

  // create scraping job
  const createJob = async (uid, type, links) => {
    let jobData = { uid, type, links };

    let serverRes = await postReq(jobData, "/api/new-scraping-job");
    if (!serverRes || serverRes.code === "bad") {
      console.log("something wrong when creating scraping job");
      resetLoadingState();
      return;
    }

    return serverRes.payload.jobId;
  };

  // start visiting and scraping the actual content
  const scrapeContent = async (jobId, jobUrls) => {
    // set job id to localstorage
    chrome.storage.local.set(
      {
        currentJobStatus: {
          last: false,
          jobId: jobId,
        },
      },
      function () {
        console.log("job set");
      }
    );

    // start scraping
    chrome.runtime.sendMessage({
      from: "scrapeWebPages",
      links: jobUrls,
      jobId: jobId,
    });
  };

  // wathing for when the job is done
  const watchingJob = async (jobId) => {
    while (true) {
      try {
        const response = await postReq({ jobId }, "/api/get-job-data");

        if (response && response?.payload?.job?.status) {
          return response?.payload?.job?.endFile;
          break;
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }

      // Wait for 1 second before sending the next request
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  const NewContextHandler = async (e) => {
    e.preventDefault();

    // verify if fields are filled
    if (!formDataG || !formDataG.name || !websiteLinks) {
      return console.log("Please check your fields");
    }

    // start loading component
    setNewContextLoading(true);
    setLoadingStates([
      {
        text: "scraping",
        status: "loading",
      },
      {
        text: "preparing",
        status: false,
      },
      {
        text: "indexing",
        status: false,
      },
      {
        text: "finishing",
        status: false,
      },
    ]);

    // get uid
    const uid = await getUid();
    if (!uid) {
      console.log("session expire, please login.");
      resetLoadingState();
      return;
    }

    // get website links
    let links = websiteLinks.replaceAll("\n", "").trim().split(",");

    // create job
    const jobId = await createJob(uid, typeOfWebsite, links);

    // start scraper (inject content script with job id)
    await scrapeContent(jobId, links);

    // keep watching job whne it s done to get job url
    let jobEndFile = await watchingJob(jobId);

    // loading creating context
    setLoadingStates([
      {
        text: "scraping",
        status: true,
      },
      {
        text: "preparing",
        status: true,
      },
      {
        text: "indexing",
        status: "loading",
      },
      {
        text: "finishing",
        status: false,
      },
    ]);

    // create data body
    const newContextData = {
      uid: uid,
      name: formDataG.name.trim(),
      fileUrl: jobEndFile,
      module: "externalSite",
    };

    // create new context
    let serverRes = await postReq(newContextData, "/api/new-context");
    if (!serverRes || serverRes.code === "bad") {
      console.log("something wrong when creating context");
      resetLoadingState();
      return;
    }

    // set current context id
    setCurrentContextId(serverRes?.payload?.contextId);

    // set new online context id

    // stop loading
    setNewContextLoading(false);
    setLoadingStates([
      {
        text: "preparing",
        status: true,
      },
      {
        text: "indexing",
        status: true,
      },
      {
        text: "finishing",
        status: true,
      },
    ]);

    // redirect to single context page
    setContextScreens({
      moduleStatus: true,
      moduleType: false,
      first: false,
      pdf: false,
      copyAndPaste: false,
      externalSite: false,
      publicDisc: false,
      txt: false,
      googleDrive: false,
    });
  };

  const resetLoadingState = () => {
    setFormDataG({
      name: "",
    });
    setLoadingStates([
      {
        text: "preparing",
        status: false,
      },
      {
        text: "indexing",
        status: false,
      },
      {
        text: "finishing",
        status: false,
      },
    ]);
    setNewContextLoading(false);
  };

  // reset states on exit
  useEffect(() => {
    return () => resetLoadingState();
  }, []);

  return (
    <div className="clonegpt-single-module-screen">
      {/* back btn */}
      <label className="clonegpt-back-btn" onClick={backLogic}>
        <IoIosArrowBack /> Back
      </label>

      <h3>External Site module</h3>
      <form onSubmit={NewContextHandler} encType="multipart/form-data">
        <div className="clonegpt-field-group">
          <p>Context name</p>
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Name the context"
            value={formDataG.name}
            onChange={(e) => {
              setFormDataG({
                ...formDataG,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className="clonegpt-field-group">
          <p>Type</p>
          <select
            className="select w-full"
            onChange={(e) => {
              setTypeOfWebsite(e.target.value);
            }}
          >
            <option disabled selected>
              Select the type of web page
            </option>
            <option value="single">A single web page</option>
            <option value="multiple">Multiple web pages</option>
            <option value="entire">Entire web site (coming soon)</option>
          </select>
        </div>
        <div className="clonegpt-field-group">
          {typeOfWebsite === "single" && (
            <>
              <p>Page URL</p>
              <input
                className="input input-bordered w-full"
                type="text"
                placeholder="https://example.com"
                value={websiteLinks}
                onChange={(e) => setWebsiteLinks(e.target.value)}
              />
            </>
          )}
          {typeOfWebsite === "multiple" && (
            <>
              <p>Pages URLs seperate by a comma</p>
              <textarea
                className="textarea textarea-bordered"
                placeholder="https://example1.com,  https://example2.com, ..."
                value={websiteLinks}
                onChange={(e) => setWebsiteLinks(e.target.value)}
              ></textarea>
            </>
          )}
          {typeOfWebsite === "entire" && (
            <>
              <p>Website URL</p>
              <h3>Will be available soon</h3>
              {/* <input
                className="input input-bordered w-full"
                type="text"
                placeholder="https://example.com"
                value={websiteLinks}
                onChange={(e) => setWebsiteLinks(e.target.value)}
              /> */}
            </>
          )}
        </div>

        {newContextLoading && (
          <button className="btn btn-outline w-full clonegpt-new-share loading">
            Working...
          </button>
        )}
        {!newContextLoading && (
          <button
            className="btn btn-outline w-full clonegpt-new-share"
            onClick={NewContextHandler}
          >
            Upload Context
          </button>
        )}
      </form>

      {newContextLoading && <LoadingOnCreation loadingStates={loadingStates} />}
    </div>
  );
};

export default ExternalSite;
