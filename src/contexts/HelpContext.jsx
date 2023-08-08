import { createContext, useState } from "react";

const HelpContext = createContext();

export const HelpContextProvider = ({ children }) => {
  const [isHelpDetail, setIsHelpDetail] = useState(false);

  return (
    <HelpContext.Provider
      value={{ isHelpDetail, setIsHelpDetail }}
    >
      {children}
    </HelpContext.Provider>
  );
};

export default HelpContext;
