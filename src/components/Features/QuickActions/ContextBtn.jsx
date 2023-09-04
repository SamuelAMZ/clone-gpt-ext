import React, { useState, useContext } from "react";

// react query
import { useQuery } from "react-query";

// context
import VisibleScrensContext from "../../../contexts/VisibleScreens";

// components
import AllRoutes from "../../AllRoutes/AllRoutes";

// helpers
import postReq from "../../../helpers/postReq";
import getUid from "../Contexts/helpers/getUid";
import addToggleTogeneratedContext from "../helpers/addToggleToUi";

// icons
import { BiSend } from "react-icons/bi";

const ContextBtn = () => {
  const { screen, changeScreen } = useContext(VisibleScrensContext);
  const [loadingQuery, setLoadingQuery] = useState(false);

  const cloneGptShowRoutes = () => {
    if (screen.routes) {
      changeScreen({
        routes: false,
        home: false,
        login: false,
      });
      return;
    }

    changeScreen({
      routes: true,
      home: false,
      login: false,
    });
  };

  // active contexts
  const handleActiveContextsList = async () => {
    const uid = await getUid();
    if (!uid) {
      return console.log("session expire, please login.");
    }

    // send req
    return await postReq(
      {
        uid: uid,
      },
      "/api/active-contexts"
    );
  };
  const {
    data: userActiveContextsData,
    isLoading: userActiveContextsDataLoading,
    refetch,
  } = useQuery(["user-active-contexts"], handleActiveContextsList, {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  // check if textarea value is not empty
  const checkTextArea = () => {
    let openAiTextArea = document.querySelector("textarea#prompt-textarea");
    if (!openAiTextArea.value) {
      return false;
    }
    return openAiTextArea.value;
  };

  // send context getting request with query
  const getContext = async (data) => {
    let serverRes = await postReq(data, "/api/new-query");
    if (!serverRes) {
      console.log("something wrong when creating context");
      return;
    }

    return serverRes;
  };

  // create prompt
  const createPrompt = (contextFoundArr, query) => {
    let contextParagraph = "";
    let intructionParagraph =
      "Use this above context as an additional context for the answer";

    contextFoundArr.forEach((elm) => {
      contextParagraph = `${contextParagraph} \n\n ${elm}`;
    });

    let prompt = `[context]
      ${contextParagraph}
      \n[instructions]
      ${intructionParagraph}
      \n[query]
      ${query}`;

    return prompt.trim();
  };

  // update textarea
  const updateTextAreaWithPrompt = (prompt) => {
    let openAiTextArea = document.querySelector("textarea#prompt-textarea");

    openAiTextArea.value = prompt;
  };

  // send prompt
  const sendPrompt = () => {
    const submitBtn = document.querySelector("form button.absolute");
    submitBtn.click();
  };

  // send request
  const sendQueryRequest = async () => {
    // get textarea form value
    let query = checkTextArea();
    // check if empty
    if (!query) {
      console.log("noting");
      return;
    }

    // loading anim
    setLoadingQuery(true);

    // get uid
    const uid = await getUid();
    if (!uid) {
      console.log("session expire, please login.");

      // loading anim
      setLoadingQuery(false);
      return;
    }

    // refetch active contexts
    let res = await refetch();

    // get contextIdArr
    let contextIdArr = [];
    if (res && res.data.payload.count > 0) {
      for (let i = 0; i < res.data.payload.contexts.length; i++) {
        contextIdArr.push(res.data.payload.contexts[i]._id);
      }
    }

    if (contextIdArr.length < 1) {
      // loading anim
      setLoadingQuery(false);
      return console.log("no active context");
    }

    // console.log({
    //   uid,
    //   contextIdArr,
    //   query,
    // });

    // send request with query
    const serverRes = await getContext({
      uid,
      contextIdArr,
      query,
    });

    let contextParagraphs = [];
    serverRes.payload.data.matches.forEach((elm) => {
      contextParagraphs.push(elm.metadata.chunk);
    });

    // create prompt
    let prompt = createPrompt(contextParagraphs, query);

    // update textarea with prompt
    updateTextAreaWithPrompt(prompt);

    // send prompt
    sendPrompt();

    // add toggle to new prompt
    await addToggleTogeneratedContext();

    // return to not submit
    // loading anim
    setLoadingQuery(false);
    return;
  };

  return (
    <>
      {loadingQuery && (
        <div
          id="clonegpt-context-btn"
          className="btn relative btn-neutral border-0 md:border loading"
        >
          loading...
        </div>
      )}
      {!loadingQuery && (
        <div
          id="clonegpt-context-btn"
          className="btn relative btn-neutral border-0 md:border"
          onClick={sendQueryRequest}
        >
          <div className="flex w-full gap-1 items-center justify-center">
            <BiSend className="h-3 w-3 flex-shrink-0" />
            <p>Ask Kalami</p>
            {/* <span className="clonegpt-context-number inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold rounded-full">
              {userActiveContextsData?.payload?.count}
            </span> */}
          </div>
        </div>
      )}
      <div className="clonegpt-opening-wraper" onClick={cloneGptShowRoutes}>
        <img src={chrome.runtime.getURL("/assets/logo.png")} alt="logo" />
      </div>
    </>
  );
};

export default ContextBtn;
