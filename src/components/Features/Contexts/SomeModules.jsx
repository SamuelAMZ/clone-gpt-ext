import React from "react";

// icons
import { BsFileEarmarkPdf, BsFillPlusSquareFill } from "react-icons/bs";
import { BiCopyAlt, BiPlusMedical } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";
import { AiOutlineGithub, AiFillFilePdf } from "react-icons/ai";

const SomeModules = ({ onClick }) => {
  return (
    <div className="clonegpt-some-modules-container">
      <h3>Upload context via</h3>
      <div className="clonegpt-some-modules">
        <div className="clonegpt-some-modules-container-pre">
          <div className="tooltip tooltip-bottom" data-tip="PDF">
            <span className="clonegpe-gpt-somemodules-item">
              <AiFillFilePdf />
            </span>
          </div>
        </div>
        <div className="clonegpt-some-modules-container-pre">
          <div className="tooltip tooltip-bottom" data-tip="External Site">
            <span className="clonegpe-gpt-somemodules-item">
              <FiExternalLink />
            </span>
          </div>
        </div>
        <div className="clonegpt-some-modules-container-pre">
          <div className="tooltip tooltip-bottom" data-tip="Copy And Paste">
            <span className="clonegpe-gpt-somemodules-item">
              <BiCopyAlt />
            </span>
          </div>
        </div>
        <div className="clonegpt-some-modules-container-pre coming-soon">
          <div className="tooltip tooltip-bottom" data-tip="Github">
            <span className="clonegpe-gpt-somemodules-item">
              <AiOutlineGithub />
            </span>
          </div>
        </div>
        <div className="clonegpt-some-modules-container-pre" onClick={onClick}>
          <div className="tooltip tooltip-bottom" data-tip="More Modules">
            <span className="clonegpe-gpt-somemodules-item clone-gpt-more">
              <BiPlusMedical />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SomeModules;
