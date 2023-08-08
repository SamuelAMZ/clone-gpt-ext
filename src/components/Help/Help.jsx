import React, { useContext, useState } from "react";

// icons
import { BiSend } from "react-icons/bi";

import HelpDetail from "./HelpDetail";

import HelpContext from "../../contexts/HelpContext";

const Help = () => {
  const { isHelpDetail, setIsHelpDetail } = useContext(HelpContext);
  const  [helpTextIndex, setHelpTextIndex] = useState(0);
  const helpTitle = [
    "PDF Files",
    "External Site Module",
    "Copy And Paste Texts",
    "API Request Module",
    "Github Repos",
    "Google Drive Files",
  ];

  const helpText = [
    "At present, our services include comprehensive support for PDF files, and use of the content as context.",
    "You can share the URLs of your data sources with Kalami, enabling it to visit and leverage them as contextual references.",
    "Copy and paste your text content for Kalami to incorporate as context during your discussions.",
    "Configure API calls to pull data for dynamic context. Kalami leverages it in your chats",
    "Import your Github repository content directly to enhance the context of your conversation",
    "Upload any supported document from your Google Drive. Kalami makes it part of the dialogue",
  ];

  const goToDetail = (index) => {
    setIsHelpDetail(true);
    setHelpTextIndex(index);
  };
  return (
    <>
      {!isHelpDetail && (
        <div className="clonegpt-help-container">
          {/* posts */}
          <div className="clonegpt-help-posts">
            <div className="clonegpt-help-title">File Types We Support</div>
            {helpTitle.map((item, index) => (
              <div
                className="clonegpt-help-post"
                onClick={() => {
                  goToDetail(index);
                }}
                key={index}
              >
                <div className="clonegpt-help-post-texts">
                  <h3>{item}</h3>
                </div>
                <div className="clonegpt-help-post-icon">
                  <BiSend />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {isHelpDetail && <HelpDetail  helpText={helpText[helpTextIndex]} helpTitle={helpTitle[helpTextIndex]}/>}
    </>
  );
};

export default Help;
