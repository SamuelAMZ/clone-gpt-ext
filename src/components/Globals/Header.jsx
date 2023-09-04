import React, { useContext } from "react";

// contexts
import VisibleScrensContext from "../../contexts/VisibleScreens";

// icons
import { IoMdClose } from "react-icons/io";
import { FiSettings } from "react-icons/fi";

const Header = () => {
  const { screen, changeScreen } = useContext(VisibleScrensContext);

  const closeWidget = () => {
    changeScreen({
      routes: false,
    });
  };

  return (
    <>
      <div className="clonegpt-header-wrapper">
        <div className="clonegpt-header">
          {/* <img src={chrome.runtime.getURL("/assets/logo.png")} alt="logo" /> */}
          <p>kalami.ai</p>
        </div>
        <div className="clonegpt-header-icons">
          <FiSettings className="clonegpt-widget-icon-close" />
          <IoMdClose
            className="clonegpt-widget-icon-close close"
            onClick={closeWidget}
          />
        </div>
      </div>
      <span className="clonegpt-line-separator"></span>
    </>
  );
};

export default Header;
