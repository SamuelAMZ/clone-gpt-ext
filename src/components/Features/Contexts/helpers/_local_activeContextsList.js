// this file will help in getting a list of the current active contexts

const getActiveContexts = async () => {
  const getItemFromLocalStorage = async () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get("activeContexts", function (item) {
        resolve(item.activeContexts);
      });
    });
  };
  try {
    let list = await getItemFromLocalStorage();
    console.log(list);
    return list;
  } catch (error) {
    console.log(error);
  }

  return [];
};

export default getActiveContexts;
