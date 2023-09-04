import React from "react";

// icons
import { BsArrowLeft, BsInfoCircle } from "react-icons/bs";

const BackBtn = ({ text, desc, onClick }) => {
  return (
    <div className="clonegpt-back-btn-new">
      <BsArrowLeft onClick={onClick} />
      <p>{text}</p>
      <div className="tooltip tooltip-bottom" data-tip={desc}>
        <BsInfoCircle className="clonegpt-back-btn-info" />
      </div>
    </div>
  );
};

export default BackBtn;
