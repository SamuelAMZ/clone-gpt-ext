import React, { useEffect, useState } from "react";

// helpers
import addToggleTogeneratedContext from "../helpers/addToggleToUi";

const ContextToggles = () => {
  const [actualUrl, setActualUrl] = useState(null);

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

  useEffect(() => {
    if (actualUrl && actualUrl.split("chat.openai.com")[0] === "https://") {
      (async () => {
        await addToggleTogeneratedContext();
      })();
    }
  }, [actualUrl]);

  useEffect(() => {
    (async () => {
      let id = setInterval(async () => {
        let res = await getActualUrl();
        setActualUrl(res);
      }, [1000]);
    })();
  }, []);

  return <></>;
};

export default ContextToggles;
