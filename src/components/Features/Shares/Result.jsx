import React, { useContext } from "react";

// contexts
import VisibleScrensContext from "../../../contexts/VisibleScreens";
import NewShareContext from "../../../contexts/NewShare";
import ShareLinkContext from "../../../contexts/ShareLink";

// icons
import { IoIosArrowBack } from "react-icons/io";
import { BsCheck2Square } from "react-icons/bs";
import { BiLink } from "react-icons/bi";

const Result = () => {
  const { screen, changeScreen } = useContext(VisibleScrensContext);
  const { shareScreens, setShareScreens } = useContext(NewShareContext);
  const { shareLink, setShareLink } = useContext(ShareLinkContext);

  const backLogic = () => {
    // reset new share screen state
    setShareScreens({
      first: true,
      privacy: false,
      result: false,
    });
    changeScreen({
      routes: true,
      newShare: true,
      home: false,
    });
  };

  const redirectToShareLink = () => {
    chrome.runtime.sendMessage({
      from: "openUserUrl",
      url: shareLink ? shareLink : "https://kalami.ai",
    });
  };

  return (
    <div className="clone-gpt-result">
      {/* back btn */}
      <label className="clonegpt-back-btn" onClick={backLogic}>
        <IoIosArrowBack /> Back
      </label>

      <div>
        {/* success message */}
        <BsCheck2Square
          className="clonegpt-icon-first-result"
          onClick={redirectToShareLink}
        />
        <p onClick={redirectToShareLink}>Successfully shared your chat</p>

        {/* redirect/copy link */}
        <div className="form-control w-full">
          <div className="input-group">
            <input
              type="text"
              value={shareLink ? shareLink : "https://kalami.ai"}
              className="input input-bordered input-secondary clonegpt-input-result"
            />
            <button
              className="btn btn-square clonegpt-button-result"
              onClick={redirectToShareLink}
            >
              <BiLink className="clonegpt-icon-result" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
