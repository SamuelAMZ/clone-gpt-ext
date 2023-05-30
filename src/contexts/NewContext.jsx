import { createContext, useState } from "react";

const NewContextContext = createContext();

export const NewContextScrensProvider = ({ children }) => {
  const [contextScreen, setScreen] = useState({
    first: true,
    moduleType: false,
    moduleStatus: false, //is in use or not, activate - stop - remove - rename
    pdf: false,
    copyAndPaste: false,
    externalSite: false,
    publicDisc: false,
    txt: false,
    googleDrive: false,
  });

  const setContextScreens = (newLogin) => {
    setScreen(newLogin);
  };

  return (
    <NewContextContext.Provider value={{ contextScreen, setContextScreens }}>
      {children}
    </NewContextContext.Provider>
  );
};

export default NewContextContext;
