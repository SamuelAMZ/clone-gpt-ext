const cloneExtCheckForUid = () => {
  const uid = sessionStorage.getItem("ext_user_sess");
  return uid;
};

// set user uid in localstorage from the background
if (cloneExtCheckForUid()) {
  chrome.runtime.sendMessage(
    { from: "auth_success", uid: cloneExtCheckForUid() },
    function (response) {
      console.log(response.message);
    }
  );
}
