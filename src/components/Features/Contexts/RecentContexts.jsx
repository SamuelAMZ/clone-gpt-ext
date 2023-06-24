import React, { useContext, useState } from "react";

// contexts
import NewContextContext from "../../../contexts/NewContext";
import CurrentContextIdContext from "../../../contexts/CurrentContextId";

// helpers
import postReq from "../../../helpers/postReq";
import getUid from "./helpers/getUid";

// react query
import { useQuery } from "react-query";

// import loading lib
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

// loader spinner
import { Oval } from "react-loader-spinner";

// icons
import { MdOutlineWindow } from "react-icons/md";
import { BiCopyAlt } from "react-icons/bi";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

const RecentContexts = () => {
  // contexts
  const { contextScreen, setContextScreens } = useContext(NewContextContext);
  const { currentContextId, setCurrentContextId } = useContext(
    CurrentContextIdContext
  );

  // states
  const [changingContextState, setChangingContextState] = useState(false);

  // active contexts
  const handleActiveContextsList = async () => {
    const uid = await getUid();
    if (!uid) {
      return console.log("session expire, please login.");
    }

    // send req
    return await postReq(
      {
        uid: uid,
      },
      "/api/active-contexts"
    );
  };
  const {
    data: userActiveContextsData,
    isLoading: userActiveContextsDataLoading,
    refetch: refreshActiveList,
  } = useQuery(["user-active-contexts"], handleActiveContextsList, {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  // all contexts
  const handleContextsList = async () => {
    const uid = await getUid();
    if (!uid) {
      return console.log("session expire, please login.");
    }

    // send req
    return await postReq(
      {
        uid: uid,
        page: "0",
        perPage: "5",
      },
      "/api/contexts-list"
    );
  };
  const {
    data: userContextsData,
    isLoading: userContextsDataLoading,
    refetch: refreshList,
  } = useQuery(["user-contexts"], handleContextsList, {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  // redirect to single context page
  const redirectToContextPage = (contextId) => {
    // set current context id
    setCurrentContextId(contextId);

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

  // toggle
  const activateNewContext = async (currentContextId) => {
    // get uid
    const uid = await getUid();
    if (!uid) {
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
      return console.log("error activating context, retry later");
    }
  };
  const pauseContext = async (currentContextId) => {
    // get uid
    const uid = await getUid();
    if (!uid) {
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
      return console.log("error activating context, retry later");
    }
  };
  const handleToggle = async (state, contextId) => {
    setChangingContextState(contextId);

    if (state) {
      await pauseContext(contextId);
      await refreshList();
    }

    if (!state) {
      await activateNewContext(contextId);
      await refreshList();
    }

    await refreshActiveList();
    setChangingContextState(false);
  };

  return (
    <>
      {/* active contexts */}
      {!userActiveContextsDataLoading &&
        userActiveContextsData &&
        userActiveContextsData?.payload?.count > 0 && (
          <div className="clonegpt-recent-shares">
            {/* title */}

            <h3>Active contexts</h3>

            {/* data fetched succesfully component */}
            {!userActiveContextsDataLoading &&
              userActiveContextsData &&
              userActiveContextsData?.payload?.contexts.map((elm, idx) => {
                return (
                  <div key={idx} className="clonegpt-single-recent-share">
                    <div
                      className="context-elements"
                      onClick={() => redirectToContextPage(elm?._id)}
                    >
                      {elm?.module === "copyAndPaste" && <BiCopyAlt />}
                      {elm?.module === "pdf" && <BsFileEarmarkPdf />}
                      {elm?.module === "externalSite" && <FiExternalLink />}
                      <p>
                        {elm?.name.substr(0, 17)}
                        {elm?.name.length >= 17 && "..."}
                      </p>
                    </div>
                    <span className="spinnerAndSwitcher">
                      {changingContextState &&
                        changingContextState === elm?._id && (
                          <span>
                            <Oval
                              height={10}
                              width={10}
                              color="#fec204"
                              visible={true}
                              ariaLabel="oval-loading"
                              secondaryColor="#fec204"
                              strokeWidth={7}
                              strokeWidthSecondary={7}
                            />
                          </span>
                        )}
                      <label className={`switcher ${elm?.state ? "on" : ""}`}>
                        <input
                          type="checkbox"
                          className="toggle"
                          checked={elm?.state}
                          onChange={async () =>
                            await handleToggle(elm?.state, elm?._id)
                          }
                        />
                        <span className="slider" />
                      </label>
                    </span>
                  </div>
                );
              })}
          </div>
        )}

      {/* all contexts */}
      <div className="clonegpt-recent-shares">
        {/* title */}
        <h3>All contexts</h3>

        {/* data fetched succesfully component */}
        {!userContextsDataLoading &&
          userContextsData &&
          userContextsData?.payload?.contexts.map((elm, idx) => {
            return (
              <div key={idx} className="clonegpt-single-recent-share">
                <div
                  className="context-elements"
                  onClick={() => redirectToContextPage(elm?._id)}
                >
                  {elm?.module === "copyAndPaste" && <BiCopyAlt />}
                  {elm?.module === "pdf" && <BsFileEarmarkPdf />}
                  {elm?.module === "externalSite" && <FiExternalLink />}
                  <p>
                    {elm?.name.substr(0, 17)}
                    {elm?.name.length >= 17 && "..."}
                  </p>
                </div>

                <span className="spinnerAndSwitcher">
                  {changingContextState &&
                    changingContextState === elm?._id && (
                      <span>
                        <Oval
                          height={10}
                          width={10}
                          color="#fec204"
                          visible={true}
                          ariaLabel="oval-loading"
                          secondaryColor="#fec204"
                          strokeWidth={7}
                          strokeWidthSecondary={7}
                        />
                      </span>
                    )}
                  <label className={`switcher ${elm?.state ? "on" : ""}`}>
                    <input
                      type="checkbox"
                      className="toggle"
                      checked={elm?.state}
                      onChange={async () =>
                        await handleToggle(elm?.state, elm?._id)
                      }
                    />
                    <span className="slider" />
                  </label>
                </span>
              </div>
            );
          })}

        {/* fallback message */}
        {!userContextsDataLoading &&
          userContextsData &&
          userContextsData?.payload?.count === 0 && <p>No item yet</p>}

        {/* loading state component */}
        {userContextsDataLoading && (
          <div className="clonegpt-list-loader-container-skeleton">
            <SkeletonTheme baseColor="#8b8b8b35" highlightColor="#f9fafb35">
              <Skeleton height={25} width={"100%"} count={5} />
              <Skeleton height={40} width={"100%"} count={1} />
            </SkeletonTheme>
          </div>
        )}

        {/* load more btn */}
        {!userContextsDataLoading && userContextsData && (
          <div className="clonegpt-btn-bottom">
            <button className="btn btn-outline w-full">Load more</button>
          </div>
        )}
      </div>
    </>
  );
};

export default RecentContexts;
