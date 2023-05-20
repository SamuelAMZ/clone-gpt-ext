import { createContext, useState } from "react";

const ShareLinkContext = createContext();

export const ShareLinkProvider = ({ children }) => {
  const [shareLink, setScreen] = useState({
    first: true,
    privacy: false,
    result: false,
  });

  const setShareLink = (newLogin) => {
    setScreen(newLogin);
  };

  return (
    <ShareLinkContext.Provider value={{ shareLink, setShareLink }}>
      {children}
    </ShareLinkContext.Provider>
  );
};

export default ShareLinkContext;
