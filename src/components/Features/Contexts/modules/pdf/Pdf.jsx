import React, { useContext, useState, useEffect } from "react";

// import loading lib
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

// context
import NewContextContext from "../../../../../contexts/NewContext";
import CurrentContextIdContext from "../../../../../contexts/CurrentContextId";

// helpers
import postReq from "../../../../../helpers/postReq";
import getUid from "../../helpers/getUid";
import LoadingOnCreation from "../../helpers/LoadingOnCreation";

const Pdf = () => {
  const { contextScreen, setContextScreens } = useContext(NewContextContext);
  const { currentContextId, setCurrentContextId } = useContext(
    CurrentContextIdContext
  );

  // new context form state
  const [formDataG, setFormDataG] = useState({
    name: "",
    rawText: "",
  });
  const [fileUploaded, setFileUploaded] = useState(null);

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

  const handleFileChange = (event) => {
    setFileUploaded(event.target.files[0]);
  };

  const NewContextHandler = async (e) => {
    e.preventDefault();

    // verify if fields are filled
    if (!formDataG || !formDataG.name) {
      return console.log("Please check your fields");
    }

    // start loading component
    setNewContextLoading(true);
    setLoadingStates([
      {
        text: "preparing",
        status: "loading",
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

    // upload file
    const formData = new FormData();
    formData.append("file", fileUploaded);

    const uploadFile = async () => {
      let headers = new Headers();
      headers.append("GET", "POST", "OPTIONS");
      headers.append(
        "Access-Control-Allow-Origin",
        `${process.env.REACT_APP_API_URL}/`
      );
      headers.append("Access-Control-Allow-Credentials", "true");

      try {
        // fetch

        let req = await fetch(
          `${process.env.REACT_APP_API_URL}/api/upload-file`,
          {
            mode: "cors",
            method: "POST",
            headers: headers,
            body: formData,
            credentials: "include",
          }
        );

        const serverRes = await req.json();
        return serverRes;
      } catch (error) {
        console.log(error);
      }
    };

    let fileUploadedData = await uploadFile();
    if (!fileUploadedData || fileUploadedData.code === "bad") {
      console.log("something wrong when uploading context");
      resetLoadingState();
      return;
    }

    // create data body
    const newContextData = {
      uid: uid,
      name: formDataG.name.trim(),
      fileUrl: fileUploadedData.url,
      module: "pdf",
    };

    setLoadingStates([
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

    // create new context
    let serverRes = await postReq(newContextData, "/api/new-context");
    if (!serverRes || serverRes.code === "bad") {
      console.log("something wrong when creating context");
      resetLoadingState();
      return;
    }

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
        status: "loading",
      },
    ]);

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
      rawText: "",
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
      <h3>PDF module</h3>
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
          <p>Upload PDF file</p>
          <input
            type="file"
            name="file"
            className="file-input file-input-bordered w-full"
            onChange={handleFileChange}
          />
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
            Create Context
          </button>
        )}
      </form>

      {newContextLoading && <LoadingOnCreation loadingStates={loadingStates} />}
    </div>
  );
};

export default Pdf;
