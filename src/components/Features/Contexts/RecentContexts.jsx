import React, { useContext } from "react";

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

// icons
import { MdOutlineWindow } from "react-icons/md";

const RecentContexts = () => {
  // contexts
  const { contextScreen, setContextScreens } = useContext(NewContextContext);
  const { currentContextId, setCurrentContextId } = useContext(
    CurrentContextIdContext
  );

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
  const { data: userContextsData, isLoading: userContextsDataLoading } =
    useQuery(["user-contexts"], handleContextsList, {
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

  return (
    <>
      {/* active contexts */}
      {!userActiveContextsDataLoading &&
        userActiveContextsData &&
        userActiveContextsData?.payload?.count > 0 && (
          <div className="clonegpt-recent-shares active-contexts">
            {/* title */}

            <h3>Active contexts</h3>

            {/* data fetched succesfully component */}
            {!userActiveContextsDataLoading &&
              userActiveContextsData &&
              userActiveContextsData?.payload?.contexts.map((elm, idx) => {
                return (
                  <div
                    key={idx}
                    className="clonegpt-single-recent-share"
                    onClick={() => redirectToContextPage(elm?._id)}
                  >
                    <div className="context-elements">
                      <MdOutlineWindow />
                      <p>
                        {elm?.name.substr(0, 27)}
                        {elm?.name.length >= 27 && "..."}
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      class="bg-gray-200 radix-state-checked:bg-green-600 relative h-[25px] w-[42px] cursor-pointer rounded-full"
                    >
                      <span class="block h-[21px] w-[21px] rounded-full translate-x-0.5 transition-transform duration-100 will-change-transform radix-state-checked:translate-x-[19px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.45)]"></span>
                    </button>
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
                  <MdOutlineWindow />
                  <p>
                    {elm?.name.substr(0, 27)}
                    {elm?.name.length >= 27 && "..."}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  data-state="checked"
                  class="bg-gray-200 radix-state-checked:bg-green-600 relative h-[25px] w-[42px] cursor-pointer rounded-full"
                >
                  <span
                    data-state="checked"
                    class="block h-[21px] w-[21px] rounded-full translate-x-0.5 transition-transform duration-100 will-change-transform radix-state-checked:translate-x-[19px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
                  ></span>
                </button>
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
