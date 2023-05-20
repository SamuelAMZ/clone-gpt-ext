import React, { useContext, useEffect, useState } from "react";

// context
import VisibleScrensContext from "../../contexts/VisibleScreens";

// components
import Header from "../Globals/Header";
import Home from "../Home/Home";
import Login from "../Login/Login";

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
    <div className="clonegpt-routes-container">
      <Header />
      {screen.login && <Login />}
      {screen.home && <Home />}
    </div>
  );
};

export default AllRoutes;
