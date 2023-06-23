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

const CopyAndPaste = () => {
  const { contextScreen, setContextScreens } = useContext(NewContextContext);
  const { currentContextId, setCurrentContextId } = useContext(
    CurrentContextIdContext
  );

  // new context form state
  const [formData, setFormData] = useState({
    name: "",
    rawText: "",
  });

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

  const NewContextHandler = async (e) => {
    e.preventDefault();

    // verify if fields are filled
    if (!formData || !formData.name || !formData.rawText) {
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

    // create txt file and upload file
    const fileUploadedData = await postReq(
      { fileContent: formData.rawText },
      "/api/create-file-then-upload"
    );
    if (!fileUploadedData) {
      console.log("something wrong when uploading context");
      resetLoadingState();
      return;
    }

    // create data body
    const newContextData = {
      uid: uid,
      name: formData.name.trim(),
      fileUrl: fileUploadedData.url,
      module: "copyAndPaste",
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
    setFormData({
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
      <h3>Copy and paste module</h3>
      <form onSubmit={NewContextHandler}>
        <div className="clonegpt-field-group">
          <p>Context name</p>
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Name the context"
            value={formData.name}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className="clonegpt-field-group">
          <p>Context content</p>
          <textarea
            className="textarea w-full"
            placeholder="Paste your text here"
            rows="4"
            value={formData.rawText}
            onChange={(e) => {
              setFormData({
                ...formData,
                rawText: e.target.value,
              });
            }}
          ></textarea>
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

export default CopyAndPaste;
