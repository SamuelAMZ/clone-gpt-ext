import React, { useContext, useState } from "react";

// contexts
import VisibleScrensContext from "../../../contexts/VisibleScreens";
import NewContextContext from "../../../contexts/NewContext";

// icons
import { IoIosArrowBack } from "react-icons/io";

// components
import ModuleType from "./ModuleType";
import RecentContexts from "./RecentContexts";
import ContextStatus from "./ContextStatus";

// components (modules)
import CopyAndPaste from "./modules/copyAndPaste/CopyAndPaste";
import Pdf from "./modules/pdf/Pdf";

const NewContext = () => {
  const { screen, changeScreen } = useContext(VisibleScrensContext);
  const { contextScreen, setContextScreens } = useContext(NewContextContext);

  const backLogic = () => {
    changeScreen({
      routes: true,
      home: true,
      NewContext: false,
      newShare: false,
    });
  };
  const switchToModuleType = () => {
    setContextScreens({
      moduleType: true,
      first: false,
      moduleStatus: false,
      pdf: false,
      copyAndPaste: false,
      externalSite: false,
      publicDisc: false,
      txt: false,
      googleDrive: false,
    });
  };

  return (
    <div className="clonegpt-shares-wrapper">
      <>
        {/* new context first page */}
        {contextScreen.first && (
          <>
            {/* back btn */}
            <label className="clonegpt-back-btn" onClick={backLogic}>
              <IoIosArrowBack /> Back
            </label>

            {/* new btn */}
            <button
              className="btn btn-outline w-full clonegpt-new-share"
              onClick={switchToModuleType}
            >
              New context
            </button>

            {/* your recent contexts */}
            <RecentContexts />
          </>
        )}

        {/* modules listing page */}
        {contextScreen.moduleType && <ModuleType />}

        {/* single module page */}
        {contextScreen.copyAndPaste && <CopyAndPaste />}
        {contextScreen.pdf && <Pdf />}

        {/* context status page */}
        {contextScreen.moduleStatus && <ContextStatus />}
      </>
    </div>
  );
};

export default NewContext;
