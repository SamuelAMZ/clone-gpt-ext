import React from "react";

// icons
import { BiShareAlt } from "react-icons/bi";
import { MdOutlineWindow } from "react-icons/md";

const Home = () => {
  return (
    <div className="clonegpt-home-wrapper">
      <div className="clonegpt-feature-single">
        <BiShareAlt className="clonegpt-single-icon" />
        <div className="clonegpt-desc">
          <h3>Share Chat</h3>
          <p>
            Share your chat and specify your desired level of privacy control.
          </p>
        </div>
      </div>
      <div className="clonegpt-feature-single">
        <MdOutlineWindow className="clonegpt-single-icon" />
        <div className="clonegpt-desc">
          <h3>Contexts</h3>
          <p>
            Broaden the contextual range of your chat by incorporating diverse
            sources.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
