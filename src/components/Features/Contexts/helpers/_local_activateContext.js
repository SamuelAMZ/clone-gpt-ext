// this file will help in adding a new contextId to the active contexts array

// helpers
import getActiveContexts from "./_local_activeContextsList";

const activateContext = async (contextId) => {
  let actualActiveContextsList = await getActiveContexts();

  const setNewContextToLocalstorage = async () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set(
        { activeContexts: [...actualActiveContextsList, contextId] },
        function () {
          resolve(true);
        }
      );
    });
  };

  try {
    let status = await setNewContextToLocalstorage("contextId");
    return status;
  } catch (error) {
    console.log(error);
  }

  return false;
};

export default activateContext;
