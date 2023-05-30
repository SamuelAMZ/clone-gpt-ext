import React, { useContext } from "react";

// contexts
import NewContextContext from "../../../contexts/NewContext";

// icons
import { IoIosArrowBack } from "react-icons/io";
// icons
import { BsFileEarmarkPdf } from "react-icons/bs";

const ContextStatus = () => {
  const { contextScreen, setContextScreens } = useContext(NewContextContext);

  const backLogic = () => {
    setContextScreens({
      first: true,
      copyAndPaste: false,
      moduleType: false,
      moduleStatus: false,
      pdf: false,
      externalSite: false,
      publicDisc: false,
      txt: false,
      googleDrive: false,
    });
  };

  return (
    <div className="clonegpt-single-context-page">
      {/* back btn */}
      <label className="clonegpt-back-btn" onClick={backLogic}>
        <IoIosArrowBack /> Back
      </label>

      <div className="clonegpt-single-context-wraper">
        {/* module logo */}
        <BsFileEarmarkPdf className="clonegpt-single-context-icon" />

        {/* context name */}
        <h3>Lorem ipsum dolor sit...</h3>

        {/* context text preview */}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius odio
          natus dicta sint, reiciendis in! Modi, eaque vero?Incidunt voluptatem
          earum accusamus quidem? <span>more</span>
        </p>

        {/* context stats */}
        <div className="clonegpt-single-context-stats">
          <h4>Stats</h4>
          <ul>
            <li>used 10 times</li>
            <li>100 words in the context</li>
            <li>created 10/02/2023</li>
            <li className="clonegpt-more">More</li>
          </ul>
        </div>

        {/* context actions */}
        <div className="clonegpt-single-context-actions">
          <button className="btn btn-outline w-full clonegpt-new-share">
            Activate
          </button>
          <button className="btn btn-outline w-full">Remove</button>
        </div>
      </div>
    </div>
  );
};

export default ContextStatus;
