import { createContext, useState } from "react";

const CurrentContextIdContext = createContext();

export const CurrentContextProvider = ({ children }) => {
  const [currentContextId, setScreen] = useState(null);

  const setCurrentContextId = (newLogin) => {
    setScreen(newLogin);
  };

  return (
    <CurrentContextIdContext.Provider
      value={{ currentContextId, setCurrentContextId }}
    >
      {children}
    </CurrentContextIdContext.Provider>
  );
};

export default CurrentContextIdContext;
