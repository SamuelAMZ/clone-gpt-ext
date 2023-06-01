import React, { useEffect } from "react";

// react query
import { useQuery } from "react-query";

// helpers
import postReq from "../../../helpers/postReq";
import getUid from "../Contexts/helpers/getUid";

// icons
import { MdOutlineWindow } from "react-icons/md";

const ContextBtn = () => {
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
      "use this above context as an additional context for the answer";

    contextFoundArr.forEach((elm) => {
      contextParagraph = `${contextParagraph} \n\n ${elm}`;
    });

    let prompt = `
      [context]
      ${contextParagraph}
      \n
      
      [instructions]
      ${intructionParagraph}
      \n
      
      [query]
      ${query}
    `;

    return prompt;
  };

  // update textarea
  const updateTextAreaWithPrompt = (prompt) => {
    let openAiTextArea = document.querySelector("textarea#prompt-textarea");

    openAiTextArea.value = prompt;
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

    // get uid
    const uid = await getUid();
    if (!uid) {
      console.log("session expire, please login.");
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

    console.log(prompt);

    // update textarea with prompt
    updateTextAreaWithPrompt(prompt);

    // return to not submit
    return;
  };

  // send context generation query
  const generateContextBaseOnQuery = async () => {
    let btns = document.querySelectorAll("#clonegpt-context-btn");
    console.log(btns, "gg");

    btns?.forEach((elm) => {
      elm.addEventListener("click", sendQueryRequest);
    });
  };

  useEffect(() => {
    generateContextBaseOnQuery();
  }, []);

  return (
    <div
      id="clonegpt-context-btn"
      className="btn relative btn-neutral border-0 md:border"
    >
      <div className="flex w-full gap-2 items-center justify-center">
        <MdOutlineWindow className="h-3 w-3 flex-shrink-0" />
        Generate context
        <span className="clonegpt-context-number inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold rounded-full">
          {userActiveContextsData?.payload?.count}
        </span>
      </div>
    </div>
  );
};

export default ContextBtn;
