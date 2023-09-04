import React, { useState, useContext, useEffect } from "react";

// react query
import { useQuery } from "react-query";

// contexts
import VisibleScrensContext from "../../contexts/VisibleScreens";

// components
import AllRoutes from "../AllRoutes/AllRoutes";
import Test from "../Features/QuickActions/Test";

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

  return (
    <>
      {/* widget never move */}
      {/* <div className="clonegpt-wrapper" onClick={cloneGptShowRoutes}>
        <img src={chrome.runtime.getURL("/assets/logo.png")} alt="logo" />
        <AiOutlinePlus className="clonegpt-widget-icon" />
      </div> */}

      {/* btns */}
      <Test />

      {/* the routes components will decide which page should show up */}
      {screen.routes && <AllRoutes />}
    </>
  );
};

export default Widget;
