import React, { useContext, useEffect, useState } from "react";

// context provider
import { NewShareScrensProvider } from "../../contexts/NewShare";
import { ShareLinkProvider } from "../../contexts/ShareLink";
import { NewContextScrensProvider } from "../../contexts/NewContext";
import { CurrentContextProvider } from "../../contexts/CurrentContextId";
import { HelpContextProvider } from "../../contexts/HelpContext";

// context
import VisibleScrensContext from "../../contexts/VisibleScreens";

// components
import Header from "../Globals/Header";
import Footer from "../Globals/Footer";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Help from "../Help/Help";
import NewShare from "../Features/Shares/NewShare";
import NewContext from "../Features/Contexts/NewContext";

const AllRoutes = () => {
  const { screen, changeScreen } = useContext(VisibleScrensContext);

  // user uid
  const [userId, setUserId] = useState(null);

  // check user before loading the screens
  const checkUserAndLoadScreens = async () => {
    chrome.storage.local.get("uid", function (item) {
      if (item && item.uid) {
        setUserId(item.uid);
        changeScreen({
          routes: true,
          newContext: true,
          home: false,
          login: false,
        });
        return;
      }

      setUserId(null);
      changeScreen({
        routes: true,
        login: false,
        home: true,
      });
    });
  };

  // check for user auth status
  useEffect(() => {
    (async () => {
      await checkUserAndLoadScreens();
    })();
  }, []);

  return (
    <>
      <NewShareScrensProvider>
        <ShareLinkProvider>
          <NewContextScrensProvider>
            <CurrentContextProvider>
              <HelpContextProvider>
                <div className="clonegpt-routes-container">
                  <Header />
                  {screen.login && <Login />}
                  {screen.home && <Home />}
                  {screen.newShare && <NewShare />}
                  {screen.newContext && <NewContext />}
                  {screen.help && <Help />}
                  <Footer />
                </div>
              </HelpContextProvider>
            </CurrentContextProvider>
          </NewContextScrensProvider>
        </ShareLinkProvider>
      </NewShareScrensProvider>
    </>
  );
};

export default AllRoutes;
