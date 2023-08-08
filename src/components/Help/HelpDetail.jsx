import React, {useContext} from "react";

// icons
import { IoIosArrowBack } from "react-icons/io";

import HelpContext from "../../contexts/HelpContext";

const HelpDetail = (props) => {
  const { helpTitle, helpText } = props;
  const { setIsHelpDetail } = useContext(HelpContext);
  const backLogic = () => {
    setIsHelpDetail(false);
  }

  return (
    <>
      <div className="clonegpt-help-container">
        {/* posts */}
        <label className="clonegpt-back-btn" onClick={backLogic}>
          <IoIosArrowBack /> Back
        </label>
        <div className="clonegpt-help-posts">
          <div className="clonegpt-help-title">File Types We Support</div>
          <div className="clonegpt-help-post">
            <div className="clonegpt-help-post-texts">
              <h3>{helpTitle}</h3>
              <p>
                {helpText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpDetail;
