import React, { useEffect } from "react";

// helpers
import postReq from "../../../helpers/postReq";

// react query
import { useQuery } from "react-query";

// icons
import { BsChatRightDots } from "react-icons/bs";

const RecentShares = () => {
  // fetch user chats
  const handleUserChats = async () => {
    const getItemFromLocalStorage = async (key) => {
      return new Promise((resolve, reject) => {
        chrome.storage.local.get(key, function (item) {
          resolve(item.uid);
        });
      });
    };
    let uid = await getItemFromLocalStorage("uid");

    // send req
    return await postReq(
      {
        uid: uid,
        page: "0",
        perPage: "5",
      },
      "/api/user-chats"
    );
  };
  const { data: userChatsData, isLoading: userChatsLoading } = useQuery(
    ["user-chats"],
    handleUserChats,
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const redirectToShare = (url) => {
    chrome.runtime.sendMessage({
      from: "openUserUrl",
      url: `https://iprompt.co/disc/${url}`,
    });
  };

  return (
    <div className="clonegpt-recent-shares">
      {/* title */}
      <h3>Your recent shares</h3>

      {!userChatsLoading &&
        userChatsData &&
        userChatsData?.payload?.chats.map((elm, idx) => {
          return (
            <div
              key={idx}
              className="clonegpt-single-recent-share"
              onClick={() => redirectToShare(elm?._id)}
            >
              <BsChatRightDots />
              <p>
                {decodeURIComponent(elm?.slug)
                  .replaceAll("-", " ")
                  .substr(0, 27)}
                {elm?.slug.length >= 27 && "..."}
              </p>
            </div>
          );
        })}

      {userChatsLoading && <p>Loading...</p>}

      {/* load more btn */}
      {!userChatsLoading && userChatsData && (
        <button
          className="btn btn-outline w-full"
          onClick={() =>
            chrome.runtime.sendMessage({
              from: "openUserUrl",
              url: `https://iprompt.co/`,
            })
          }
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default RecentShares;
