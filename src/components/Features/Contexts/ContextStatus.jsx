import React, { useContext } from "react";

// react query
import { useQuery } from "react-query";

// import loading lib
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

// contexts
import NewContextContext from "../../../contexts/NewContext";
import CurrentContextIdContext from "../../../contexts/CurrentContextId";

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
  const { contextScreen, setContextScreens } = useContext(NewContextContext);
  const { currentContextId, setCurrentContextId } = useContext(
    CurrentContextIdContext
  );

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

  return (
    <div className="clonegpt-single-context-page">
      {/* back btn */}
      <label className="clonegpt-back-btn" onClick={backLogic}>
        <IoIosArrowBack /> Back
      </label>

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

          {/* context name */}
          <h3>{contextData?.payload?.data?.name}</h3>

          {/* context text preview */}
          <p>
            {contextData?.payload?.data?.preview}... {/* <span>more</span> */}
          </p>

          {/* context stats */}
          <div className="clonegpt-single-context-stats">
            <h4>Stats</h4>
            <ul>
              <li>used {contextData?.payload?.data?.used} times</li>
              <li>{contextData?.payload?.data?.size} words in the context</li>
              <li>
                created at{" "}
                {contextData?.payload?.data?.createdAt?.split("T")[0]}
              </li>
              {/* <li className="clonegpt-more">More</li> */}
            </ul>
          </div>

          {/* context actions */}
          <div className="clonegpt-single-context-actions">
            <button className="btn btn-outline w-full clonegpt-new-share">
              Activate
            </button>
            <button className="btn btn-outline w-full">Remove</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextStatus;
