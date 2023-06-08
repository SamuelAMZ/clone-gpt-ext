import React, { useEffect, useState } from "react";

// components
import ContextBtn from "./ContextBtn";

const Test = () => {
  const waitForClass = (selector) => {
    return new Promise((resolve) => {
      const checkExistence = () => {
        console.log("check", " ", selector);
        const element = document.querySelector(selector);
        if (element) {
          resolve(element);
        } else {
          setTimeout(checkExistence, 100); // Check again after a short delay
        }
      };
      checkExistence();
    });
  };

  return (
    <>
      <div id="clonegpt-context-btns" className="clonegpt-context-btns">
        <div className="dropdown dropdown-hover dropdown-top dropdown-end">
          <label tabIndex={0} className="btn m-1">
            Quick Actions
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <ContextBtn />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Test;
