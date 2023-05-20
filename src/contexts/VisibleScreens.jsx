import { createContext, useState } from "react";

const VisibleScrensContext = createContext();

export const VisibleScrensProvider = ({ children }) => {
  const [screen, setScreen] = useState({
    routes: false,
    login: false,
    home: false,
    newShare: false,
  });

  const changeScreen = (newLogin) => {
    setScreen(newLogin);
  };

  return (
    <VisibleScrensContext.Provider value={{ screen, changeScreen }}>
      {children}
    </VisibleScrensContext.Provider>
  );
};

export default VisibleScrensContext;
