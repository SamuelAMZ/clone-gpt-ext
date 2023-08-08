import React, { useContext } from "react";

// contexts
import VisibleScrensContext from "../../contexts/VisibleScreens";
import NewShareContext from "../../contexts/NewShare";

// icons
import { BiHomeSmile, BiChat, BiHelpCircle, BiCog } from "react-icons/bi";

const Footer = () => {
  const { screen, changeScreen } = useContext(VisibleScrensContext);
  const { shareScreens, setShareScreens } = useContext(NewShareContext);

  const navigateTo = (page) => {
    if (page === "home") {
      changeScreen({
        routes: true,
        home: true,
        login: false,
        newShare: false,
        newContext: false,
        help: false,
      });
    }
    if (page === "contexts") {
      changeScreen({
        routes: true,
        newContext: true,
        home: false,
        login: false,
        help: false,
        newShare: false,
      });
    }
    if (page === "help") {
      changeScreen({
        routes: true,
        help: true,
        login: false,
        home: false,
        newShare: false,
        newContext: false,
      });
    }
    if (page === "settings") {
      changeScreen({
        routes: true,
        newShare: true,
        home: false,
        login: false,
        newContext: false,
        help: false,
      });
      setShareScreens({
        first: false,
        privacy: true,
        result: false,
      });
    }
    
  };

  return (
    <div className="clonegpt-footer-wrapper">
      <div
        className={
          screen.home ? "clonegpt-footer-elm active" : "clonegpt-footer-elm"
        }
        onClick={() => navigateTo("home")}
      >
        <BiHomeSmile />
        <p>Home</p>
      </div>
      <div
        className={
          screen.newContext ? "clonegpt-footer-elm active" : "clonegpt-footer-elm"
        }
        onClick={() => navigateTo("contexts")}
      >
        <BiChat />
        <p>Contexts</p>
      </div>
      <div
        className={
          screen.help ? "clonegpt-footer-elm active" : "clonegpt-footer-elm"
        }
        onClick={() => navigateTo("help")}
      >
        <BiHelpCircle />
        <p>Help</p>
      </div>
      <div
        className={
          screen.newShare ? "clonegpt-footer-elm active" : "clonegpt-footer-elm"
        }
        onClick={() => navigateTo("settings")}
      >
        <BiCog />
        <p>Settings</p>
      </div>
    </div>
  );
};

export default Footer;
