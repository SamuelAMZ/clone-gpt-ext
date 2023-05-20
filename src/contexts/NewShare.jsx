import { createContext, useState } from "react";

const NewShareContext = createContext();

export const NewShareScrensProvider = ({ children }) => {
  const [shareScreens, setScreen] = useState({
    first: true,
    privacy: false,
    result: false,
  });

  const setShareScreens = (newLogin) => {
    setScreen(newLogin);
  };

  return (
    <NewShareContext.Provider value={{ shareScreens, setShareScreens }}>
      {children}
    </NewShareContext.Provider>
  );
};

export default NewShareContext;
