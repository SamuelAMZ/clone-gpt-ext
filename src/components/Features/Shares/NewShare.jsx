import React, { useContext, useState } from "react";

// contexts
import VisibleScrensContext from "../../../contexts/VisibleScreens";
import NewShareContext from "../../../contexts/NewShare";

// icons
import { IoIosArrowBack } from "react-icons/io";

// components
import RecentShares from "./RecentShares";
import PrivacyChoices from "./PrivacyChoices";
import Result from "./Result";

const NewShare = () => {
  const { screen, changeScreen } = useContext(VisibleScrensContext);
  const { shareScreens, setShareScreens } = useContext(NewShareContext);

  const backLogic = () => {
    changeScreen({
      routes: true,
      home: true,
      newShare: false,
    });
  };
  const switchToPrivacyPage = () => {
    setShareScreens({
      first: false,
      privacy: true,
      result: false,
    });
  };

  return (
    <div className="clonegpt-shares-wrapper">
      <>
        {/* new share first page */}
        {shareScreens.first && (
          <>
            {/* back btn */}
            <label className="clonegpt-back-btn" onClick={backLogic}>
              <IoIosArrowBack /> Back
            </label>

            {/* new btn */}
            <button
              className="btn btn-outline w-full clonegpt-new-share"
              onClick={switchToPrivacyPage}
            >
              New share
            </button>

            {/* your recent shares */}
            <RecentShares />
          </>
        )}

        {/* select privacy page */}
        {shareScreens.privacy && <PrivacyChoices />}

        {/* result page */}
        {shareScreens.result && <Result />}
      </>
    </div>
  );
};

export default NewShare;
