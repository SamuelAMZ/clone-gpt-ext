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

  // requests
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
    <div className="clonegpt-recent-shares">
      {/* title */}
      <h3>Your contexts</h3>

      {/* data fetched succesfully component */}
      {!userContextsDataLoading &&
        userContextsData &&
        userContextsData?.payload?.contexts.map((elm, idx) => {
          return (
            <div
              key={idx}
              className="clonegpt-single-recent-share"
              onClick={() => redirectToContextPage(elm?._id)}
            >
              <MdOutlineWindow />
              <p>
                {elm?.name.substr(0, 27)}
                {elm?.name.length >= 27 && "..."}
              </p>
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
  );
};

export default RecentContexts;
