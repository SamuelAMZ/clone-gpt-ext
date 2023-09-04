import React, { useContext } from "react";

// contexts
import NewContextContext from "../../../contexts/NewContext";

// components
import BackBtn from "./BackBtn";

// icons
import {
  BsFileEarmarkPdf,
  BsFiletypeTxt,
  BsChatRightDots,
} from "react-icons/bs";
import { BiCopyAlt } from "react-icons/bi";
import { FiExternalLink, FiSlack } from "react-icons/fi";
import { MdAddToDrive } from "react-icons/md";
import { AiOutlineApi, AiOutlineGithub, AiFillFilePdf } from "react-icons/ai";
import { RxNotionLogo } from "react-icons/rx";
import { IoIosArrowBack } from "react-icons/io";

const ModuleType = () => {
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
    <div className="clonegpt-context-modules">
      {/* back btn */}
      <BackBtn
        onClick={backLogic}
        text="Upload new context"
        desc="Train GPT on your own data"
      />

      {/* pdf */}
      <div
        className="clonegpt-single-module"
        onClick={() => {
          setContextScreens({
            pdf: true,
            copyAndPaste: false,
            moduleType: false,
            first: false,
            moduleStatus: false,
            externalSite: false,
            publicDisc: false,
            txt: false,
            googleDrive: false,
          });
        }}
      >
        <AiFillFilePdf className="context-module-icon" />
        <div>
          <p>PDF</p>
          {/* <p>Load your context from a PDF file</p> */}
        </div>
      </div>
      {/* external site */}
      <div
        className="clonegpt-single-module"
        onClick={() => {
          setContextScreens({
            externalSite: true,
            copyAndPaste: false,
            moduleType: false,
            first: false,
            moduleStatus: false,
            pdf: false,
            publicDisc: false,
            txt: false,
            googleDrive: false,
          });
        }}
      >
        <FiExternalLink className="context-module-icon" />
        <div>
          <p>External site</p>
          {/* <p>Load your context from a public link</p> */}
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
          {/* <p>Copy and paste a text for your context</p> */}
        </div>
      </div>

      {/* api */}
      <div
        className="clonegpt-single-module faded"
        onClick={() => {
          console.log("hhh");
        }}
      >
        <AiOutlineApi className="context-module-icon " />
        <div>
          <p>API request</p>
          <span>Coming Soon</span>
          {/* <p>Get your context from an API request</p> */}
        </div>
      </div>
      {/* Github Repos */}
      <div
        className="clonegpt-single-module faded"
        onClick={() => {
          console.log("hhh");
        }}
      >
        <AiOutlineGithub className="context-module-icon" />
        <div>
          <p>Github</p>
          <span>Coming Soon</span>
          {/* <p>Load your context from your Google drive</p> */}
        </div>
      </div>
      {/* Notion */}
      <div
        className="clonegpt-single-module faded"
        onClick={() => {
          console.log("hhh");
        }}
      >
        <RxNotionLogo className="context-module-icon" />
        <div>
          <p>Notion</p>
          <span>Coming Soon</span>
          {/* <p>Load your context from your Google drive</p> */}
        </div>
      </div>
      {/* txt */}
      <div
        className="clonegpt-single-module faded"
        onClick={() => {
          console.log("hhh");
        }}
      >
        <FiSlack className="context-module-icon" />
        <div>
          <p>Slack</p>
          <span>Coming Soon</span>
        </div>
      </div>
      {/* public disc */}
      <div
        className="clonegpt-single-module faded"
        onClick={() => {
          console.log("hhh");
        }}
      >
        <BsChatRightDots className="context-module-icon" />
        <div>
          <p>Public Discussion</p>
          <span>Coming Soon</span>
          {/* <p>Use a public Discussion as a context</p> */}
        </div>
      </div>
      {/* Google Drive */}
      <div
        className="clonegpt-single-module faded"
        onClick={() => {
          console.log("hhh");
        }}
      >
        <MdAddToDrive className="context-module-icon" />
        <div>
          <p>Google Drive</p>
          <span>Coming Soon</span>
          {/* <p>Load your context from your Google drive</p> */}
        </div>
      </div>
    </div>
  );
};

export default ModuleType;
