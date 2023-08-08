import React, { useContext } from "react";

// contexts
import VisibleScrensContext from "../../contexts/VisibleScreens";

// icons
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const { screen, changeScreen } = useContext(VisibleScrensContext);

  const closeWidget = () => {
    changeScreen({
      routes: false,
    });
  };

  return (
    <div className="clonegpt-header-wrapper">
      <div className="clonegpt-header">
        <img src={chrome.runtime.getURL("/assets/logo.png")} alt="logo" />
        {screen.home && <p>Kalami</p>}
        {screen.newContext && <p> Contexts </p>}
        {screen.help && <p>Help</p>}
        {screen.newShare && <p>Settings</p>}
        <IoMdClose
          className="clonegpt-widget-icon-close"
          onClick={closeWidget}
        />
      </div>
    </div>
  );
};

export default Header;
