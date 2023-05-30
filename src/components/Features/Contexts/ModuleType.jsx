import React, { useContext } from "react";

// contexts
import NewContextContext from "../../../contexts/NewContext";

// icons
import {
  BsFileEarmarkPdf,
  BsFiletypeTxt,
  BsChatRightDots,
} from "react-icons/bs";
import { BiCopyAlt } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";
import { MdAddToDrive } from "react-icons/md";

const ModuleType = () => {
  const { contextScreen, setContextScreens } = useContext(NewContextContext);

  return (
    <div className="clonegpt-context-modules">
      {/* selects */}
      <h3>Select a module</h3>
      {/* pdf */}
      <div
        className="clonegpt-single-module"
        onClick={() => {
          console.log("hhh");
        }}
      >
        <BsFileEarmarkPdf className="context-module-icon" />
        <div>
          <p>PDF</p>
          <p>Load your context from a PDF file</p>
        </div>
      </div>
      {/* copy and paste */}
      <div
        className="clonegpt-single-module"
        onClick={() => {
          setContextScreens({
            copyAndPaste: true,
            moduleType: false,
            first: false,
            moduleStatus: false,
            pdf: false,
            externalSite: false,
            publicDisc: false,
            txt: false,
            googleDrive: false,
          });
        }}
      >
        <BiCopyAlt className="context-module-icon" />
        <div>
          <p>Copy and paste</p>
          <p>Copy and paste a text for your context</p>
        </div>
      </div>
      {/* external site */}
      <div
        className="clonegpt-single-module"
        onClick={() => {
          console.log("hhh");
        }}
      >
        <FiExternalLink className="context-module-icon" />
        <div>
          <p>External site</p>
          <p>Load your context from a public link</p>
        </div>
      </div>
      {/* txt */}
      <div
        className="clonegpt-single-module"
        onClick={() => {
          console.log("hhh");
        }}
      >
        <BsFiletypeTxt className="context-module-icon" />
        <div>
          <p>Text file (.TXT)</p>
          <p>Use a Text file (.TXT) file as a context</p>
        </div>
      </div>
      {/* public disc */}
      <div
        className="clonegpt-single-module"
        onClick={() => {
          console.log("hhh");
        }}
      >
        <BsChatRightDots className="context-module-icon" />
        <div>
          <p>Public Discussion</p>
          <p>Use a public Discussion as a context</p>
        </div>
      </div>
      {/* Google Drive */}
      <div
        className="clonegpt-single-module"
        onClick={() => {
          console.log("hhh");
        }}
      >
        <MdAddToDrive className="context-module-icon" />
        <div>
          <p>Google Drive</p>
          <p>Load your context from your Google drive</p>
        </div>
      </div>
    </div>
  );
};

export default ModuleType;
