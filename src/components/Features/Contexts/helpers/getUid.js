// this file will get the user id

const getUid = async () => {
  const getItemFromLocalStorage = async (key) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(key, function (item) {
        resolve(item.uid);
      });
    });
  };
  try {
    let uid = await getItemFromLocalStorage("uid");
    return uid;
  } catch (error) {
    console.log(error);
  }

  return false;
};

export default getUid;
