import React, { useContext, useEffect, useState } from "react";

// context provider
import { NewShareScrensProvider } from "../../contexts/NewShare";
import { ShareLinkProvider } from "../../contexts/ShareLink";
import { NewContextScrensProvider } from "../../contexts/NewContext";
import { CurrentContextProvider } from "../../contexts/CurrentContextId";

// context
import VisibleScrensContext from "../../contexts/VisibleScreens";

// components
import Header from "../Globals/Header";
import Home from "../Home/Home";
import Login from "../Login/Login";
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
          home: true,
          login: false,
        });
        return;
      }

      setUserId(null);
      changeScreen({
        routes: true,
        login: true,
        home: false,
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
    <NewShareScrensProvider>
      <ShareLinkProvider>
        <NewContextScrensProvider>
          <CurrentContextProvider>
            <div className="clonegpt-routes-container">
              <Header />
              {screen.login && <Login />}
              {screen.home && <Home />}
              {screen.newShare && <NewShare />}
              {screen.newContext && <NewContext />}
            </div>
          </CurrentContextProvider>
        </NewContextScrensProvider>
      </ShareLinkProvider>
    </NewShareScrensProvider>
  );
};

export default AllRoutes;
