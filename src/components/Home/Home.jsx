import React, { useContext } from "react";

// context
import VisibleScrensContext from "../../contexts/VisibleScreens";
import NewShareContext from "../../contexts/NewShare";

// icons
import { BiShareAlt } from "react-icons/bi";
import { MdOutlineWindow } from "react-icons/md";

const Home = () => {
  const { screen, changeScreen } = useContext(VisibleScrensContext);
  const { shareScreens, setShareScreens } = useContext(NewShareContext);

  const redirectToNewShare = () => {
    changeScreen({
      routes: true,
      newShare: true,
      home: false,
      newContext: false,
    });
    setShareScreens({
      first: true,
      privacy: false,
      result: false,
    });
  };
  const redirectToNewContext = () => {
    changeScreen({
      routes: true,
      newContext: true,
      newShare: false,
      home: false,
    });
  };
  const redirectToLogin = () => {
    changeScreen({
      routes: true,
      login: true,
      newShare: false,
      home: false,
      newContext: false,
    });
  };

  return (
    <div className="clonegpt-home-wrapper">
      <h2 class="clonegpt-home-heading">
        <span>Hello there!</span>
        <span>How can I help you?</span>
      </h2>
      <div className="clonegpt-feature-single" onClick={redirectToNewShare}>
        <BiShareAlt className="clonegpt-single-icon" />
        <div className="clonegpt-desc">
          <h3>Share Chat</h3>
          <p>
            Share your chat and specify your desired level of privacy control.
          </p>
        </div>
      </div>
      <div className="clonegpt-feature-single" onClick={redirectToNewContext}>
        <MdOutlineWindow className="clonegpt-single-icon" />
        <div className="clonegpt-desc">
          <h3>Contexts</h3>
          <p>
            Broaden the contextual range of your chat by incorporating diverse
            sources.
          </p>
        </div>
      </div>
      <div>
        <button className="btn btn-primary" onClick={redirectToLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
