import React, { useContext, useState } from "react";

// react query
import { useQuery } from "react-query";

// import loading lib
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

// contexts
import NewContextContext from "../../../contexts/NewContext";
import CurrentContextIdContext from "../../../contexts/CurrentContextId";

// components
import BackBtn from "./BackBtn";

// helpers
import getUid from "./helpers/getUid";
import postReq from "../../../helpers/postReq";

// icons
import { IoIosArrowBack } from "react-icons/io";
import {
  BsFileEarmarkPdf,
  BsFiletypeTxt,
  BsChatRightDots,
} from "react-icons/bs";
import { BiCopyAlt } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";

const ContextStatus = () => {
  // contexts
  const { contextScreen, setContextScreens } = useContext(NewContextContext);
  const { currentContextId, setCurrentContextId } = useContext(
    CurrentContextIdContext
  );

  // states
  const [updatingContextState, setUpdatingContextState] = useState(false);

  const backLogic = () => {
    setContextScreens({
      first: true,
      copyAndPaste: false,
      moduleType: false,
      moduleStatus: false,
      pdf: false,
      externalSite: false,
      publicDisc: false,
      txt: false,
      googleDrive: false,
    });
  };

  // fetch user chats
  const handleFetchContext = async () => {
    const uid = await getUid();
    if (!uid) {
      return console.log("session expire, please login.");
    }

    // send req
    return await postReq(
      {
        uid: uid,
        contextId: currentContextId,
      },
      "/api/single-context"
    );
  };
  const { data: contextData, isLoading: contextDataLoading } = useQuery(
    ["single-context", currentContextId],
    handleFetchContext,
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  // activate context
  const activateNewContext = async () => {
    setUpdatingContextState(true);

    // get uid
    const uid = await getUid();
    if (!uid) {
      setUpdatingContextState(false);
      return console.log("session expire, please login.");
    }

    // activate context
    const responseFromActivation = await postReq(
      {
        uid: uid,
        contextId: currentContextId,
      },
      "/api/activate-context"
    );
    if (!responseFromActivation || responseFromActivation?.code !== "ok") {
      setUpdatingContextState(false);
      return console.log("error activating context, retry later");
    }

    setUpdatingContextState(false);

    // redirect back to first page
    backLogic();
  };

  // pause context
  const pauseContext = async () => {
    setUpdatingContextState(true);

    // get uid
    const uid = await getUid();
    if (!uid) {
      setUpdatingContextState(false);
      return console.log("session expire, please login.");
    }

    // activate context
    const responseFromPausing = await postReq(
      {
        uid: uid,
        contextId: currentContextId,
      },
      "/api/pause-context"
    );
    if (!responseFromPausing || responseFromPausing?.code !== "ok") {
      setUpdatingContextState(false);
      return console.log("error activating context, retry later");
    }

    setUpdatingContextState(false);

    // redirect back to first page
    backLogic();
  };

  // redirect to context source
  const redirectToLink = async (link) => {
    chrome.runtime.sendMessage({
      from: "openUserUrl",
      url: link,
    });
  };

  return (
    <div className="clonegpt-single-context-page">
      {/* back btn */}
      <BackBtn
        text="Upload PDF context"
        desc="Single context page"
        onClick={backLogic}
      />

      {/* loading */}
      {contextDataLoading && (
        <div className="clonegpt-loader-container-skeleton">
          <SkeletonTheme baseColor="#8b8b8b35" highlightColor="#f9fafb35">
            <Skeleton height={37} width={37} count={1} circle={true} />
            <Skeleton height={13} width={"70%"} count={1} />
            <Skeleton height={50} width={"100%"} count={1} />
          </SkeletonTheme>
        </div>
      )}

      {/* actual view with data */}
      {!contextDataLoading && contextData && (
        <div className="clonegpt-single-context-wraper">
          <div className="clonegpt-single-context-wraper-head">
            <div className="clonegpt-single-context-wraper-icon-new">
              {/* module logo */}
              {contextData?.payload?.data?.module === "copyAndPaste" && (
                <BiCopyAlt className="clonegpt-single-context-icon" />
              )}
              {contextData?.payload?.data?.module === "pdf" && (
                <BsFileEarmarkPdf className="clonegpt-single-context-icon" />
              )}
              {contextData?.payload?.data?.module === "externalSite" && (
                <FiExternalLink className="clonegpt-single-context-icon" />
              )}
              {contextData?.payload?.data?.module === "txt" && (
                <BsFiletypeTxt className="clonegpt-single-context-icon" />
              )}
              {contextData?.payload?.data?.module === "publicDisc" && (
                <BsChatRightDots className="clonegpt-single-context-icon" />
              )}
            </div>

            {/* context name */}
            <h3>{contextData?.payload?.data?.name}</h3>

            {/* context text preview */}
            {/* <p>
            {contextData?.payload?.data?.preview}...
          </p> 
          */}
          </div>

          {/* context stats */}
          <div className="clonegpt-single-context-stats">
            <h4>Stats</h4>
            <span className="clonegpt-single-context-page-line"></span>
            <ul>
              {contextData?.payload?.data?.previewLink && (
                <li>
                  Context Source:
                  <span>
                    <p
                      onClick={() =>
                        redirectToLink(contextData?.payload?.data?.previewLink)
                      }
                      className="clonegpt-source-link"
                    >
                      Link
                    </p>
                  </span>
                </li>
              )}
              <li>
                Uses Time:
                <span>
                  <p>{contextData?.payload?.data?.used}</p>
                </span>
              </li>
              <li>
                Words in the context:
                <span>
                  <p>{contextData?.payload?.data?.size}</p>
                </span>
              </li>
              <li>
                Created at:
                <span>
                  <p>{contextData?.payload?.data?.createdAt?.split("T")[0]}</p>
                </span>
              </li>
              {/* <li className="clonegpt-more">More</li> */}
            </ul>
          </div>

          {/* context actions */}
          <div className="clonegpt-single-context-actions">
            {/* pause btn */}
            {!updatingContextState && contextData?.payload?.data?.state && (
              <button
                className="btn btn-outline w-full clonegpt-new-share paused"
                onClick={pauseContext}
              >
                Pause
              </button>
            )}
            {updatingContextState && contextData?.payload?.data?.state && (
              <button className="btn btn-outline w-full clonegpt-new-share paused loading">
                Pausing...
              </button>
            )}
            {/* actiavet btn */}
            {!updatingContextState && !contextData?.payload?.data?.state && (
              <button
                className="btn btn-outline w-full clonegpt-new-share"
                onClick={activateNewContext}
              >
                Activate
              </button>
            )}
            {updatingContextState && !contextData?.payload?.data?.state && (
              <button
                className="btn btn-outline w-full clonegpt-new-share loading"
                onClick={activateNewContext}
              >
                Activating...
              </button>
            )}

            <button className="btn btn-outline w-full">Remove</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextStatus;
