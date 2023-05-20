import React, { useState, useContext, useEffect } from "react";

// react query
import { useQuery } from "react-query";

// contexts
import VisibleScrensContext from "../../contexts/VisibleScreens";

// components
import AllRoutes from "../AllRoutes/AllRoutes";

// icons
import { AiOutlinePlus } from "react-icons/ai";

const Widget = () => {
  const { screen, changeScreen } = useContext(VisibleScrensContext);

  const cloneGptShowRoutes = () => {
    changeScreen({
      routes: true,
      home: false,
      login: false,
    });
  };

  // get user first details
  // let userLinked = null;
  // chrome.storage.local.get("uid", function (item) {
  //   if (item.uid) {
  //     userLinked = item.uid;
  //   }
  //   if (!item.uid) {
  //     userLinked = null;
  //   }
  // });

  return (
    <>
      {/* widget never move */}
      <div className="clonegpt-wrapper" onClick={cloneGptShowRoutes}>
        <img src={chrome.runtime.getURL("/assets/logo.png")} alt="logo" />
        <AiOutlinePlus className="clonegpt-widget-icon" />
      </div>

      {/* the routes components will decide which page should show up */}
      {screen.routes && <AllRoutes />}
    </>
  );
};

export default Widget;
