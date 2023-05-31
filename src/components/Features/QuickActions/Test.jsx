import React, { useEffect, useState } from "react";

// components
import ContextBtn from "./ContextBtn";

const Test = () => {
  const [actualUrl, setActualUrl] = useState(null);
  const [btns, setBtns] = useState([]);

  let di;

  const getActualUrl = async () => {
    const getNow = async () => {
      return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage(
          { from: "getActualLink" },
          function (response) {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve(response);
            }
          }
        );
      });
    };

    let url = await getNow();
    return url.url;
  };
  const moveBtnToTheRightPlace = () => {
    let contextBtn = document.querySelectorAll("#clonegpt-context-btns");
    const btnsParent = document.querySelector("form div div div");

    console.log(contextBtn, btnsParent);

    if (btnsParent && contextBtn) {
      contextBtn.forEach((elm) => {
        btnsParent.appendChild(elm);
      });
      clearInterval(di);
    }
  };
  const preventMoreThanOneBtn = () => {
    const btns = document.querySelectorAll("#clonegpt-context-btns");
    if (btns.length > 1) {
      btns.forEach((item, idx) => {
        if (idx != 1) {
          item.remove();
        }
      });
    }
  };

  useEffect(() => {
    (async () => {
      let id = setInterval(async () => {
        let res = await getActualUrl();
        setActualUrl(res);
      }, [1000]);
    })();
  }, []);

  useEffect(() => {
    setBtns([...btns, <ContextBtn />]);
    di = setInterval(() => {
      moveBtnToTheRightPlace();
      preventMoreThanOneBtn();
    }, [500]);
  }, [actualUrl]);

  return btns.map((elm, idx) => {
    return (
      <>
        <div
          key={idx}
          id="clonegpt-context-btns"
          className="clonegpt-context-btns"
        >
          {elm}
        </div>
      </>
    );
  });
};

export default Test;
