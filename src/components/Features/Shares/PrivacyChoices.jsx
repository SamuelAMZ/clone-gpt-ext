import React, { useState, useContext } from "react";

// context
import NewShareContext from "../../../contexts/NewShare";
import ShareLinkContext from "../../../contexts/ShareLink";

// helpers
import getUid from "../Contexts/helpers/getUid";

const PrivacyChoices = () => {
  const { shareScreens, setShareScreens } = useContext(NewShareContext);
  const { shareLink, setShareLink } = useContext(ShareLinkContext);

  const [selection, setSelection] = useState({
    pub: true,
    team: false,
    you: false,
  });
  const [loadingSharing, setLoadingSharing] = useState(false);

  const scrapeDisc = async () => {
    // grab text format of the disc
    const discArr = [];
    Array.from(document.querySelectorAll("main > div > div .group")).forEach(
      (elm) => {
        discArr.push(elm.innerText);
      }
    );

    //   grab html version of the disc
    const discHtmlArr = [];
    Array.from(document.querySelectorAll("main > div > div .group")).forEach(
      (elm) => {
        discHtmlArr.push(elm.innerHTML);
      }
    );

    const uid = await getUid();
    if (!uid) {
      return console.log("session expire, please login.");
    }

    const data = {
      textFormat: discArr,
      htmlFormat: discHtmlArr,
      uid: uid,
      isPrivate: false,
    };

    return data;
  };

  const handleNewShare = async () => {
    // get actual discussion
    let data = await scrapeDisc();

    setLoadingSharing(true);

    // headers
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("GET", "POST", "OPTIONS");
    headers.append("Access-Control-Allow-Credentials", "true");

    // fetch
    const req = fetch(`${process.env.REACT_APP_API_URL}/api/new-share`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        // if response is bad then send a negative message to bckground
        if (!data || data.code === "bad") {
          setLoadingSharing(false);
          return console.log("error sharing");
        }

        // if response is ok then send a positive message to bckground
        if (data.code === "ok") {
          setLoadingSharing(false);

          // set the url in state
          setShareLink(data.payload.url);

          // on succss move to result page
          setShareScreens({
            first: false,
            privacy: false,
            result: true,
          });
        }
      })
      .catch((error) => {
        setLoadingSharing(false);
        console.error(error);
      });
  };

  return (
    <div className="clonegpt-privacy-choices">
      {/* selects */}
      <h3>Manage your permissions</h3>

      {/* public */}
      <div
        className="clonegpt-single-permission"
        onClick={() => {
          setSelection({
            pub: true,
            team: false,
            you: false,
          });
        }}
        style={
          selection.pub
            ? { border: "1px solid #cf046b" }
            : { border: "1px solid #424242" }
        }
      >
        <span
          style={
            selection.pub
              ? { background: "#cf046b" }
              : { background: "#ffffff" }
          }
        ></span>
        <div>
          <p>Public</p>
          <p>Available to everybody</p>
        </div>
      </div>

      {/* team */}
      <div
        className="clonegpt-single-permission"
        onClick={() => {
          setSelection({
            pub: false,
            team: true,
            you: false,
          });
        }}
        style={
          selection.team
            ? { border: "1px solid #cf046b" }
            : { border: "1px solid #424242" }
        }
      >
        <span
          style={
            selection.team
              ? { background: "#cf046b" }
              : { background: "#ffffff" }
          }
        ></span>
        <div>
          <p>Team</p>
          <p>Available to team members</p>
        </div>
      </div>

      {/* only you */}
      <div
        className="clonegpt-single-permission"
        onClick={() => {
          setSelection({
            pub: false,
            team: false,
            you: true,
          });
        }}
        style={
          selection.you
            ? { border: "1px solid #cf046b" }
            : { border: "1px solid #424242" }
        }
      >
        <span
          style={
            selection.you
              ? { background: "#cf046b" }
              : { background: "#ffffff" }
          }
        ></span>
        <div>
          <p>Only you</p>
          <p>Available to only you</p>
        </div>
      </div>

      {/* share new btn */}
      {loadingSharing && (
        <button className="btn btn-outline w-full loading clonegpt-new-share">
          Sharing...
        </button>
      )}
      {!loadingSharing && (
        <button
          className="btn btn-outline w-full clonegpt-new-share"
          onClick={handleNewShare}
        >
          Share now
        </button>
      )}
    </div>
  );
};

export default PrivacyChoices;
