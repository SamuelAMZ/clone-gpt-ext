// trigger new share
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // check the login uid and set it to the localstorage
  if (message.from === "auth_success") {
    chrome.storage.local.set({ uid: message.uid }, function () {
      console.log("user login success...");
    });
  }

  if (message.from === "auth_check") {
    chrome.storage.local.get("uid", function (item) {
      if (item.uid) {
        sendResponse({ user: true, uid: item.uid });
      }
      if (!item.uid) {
        sendResponse({ user: false });
      }
    });
  }

  // open linkedin user page
  if (message.from === "openUserUrl") {
    chrome.tabs.create(
      {
        url: message.url,
        active: true,
      },
      (tabs) => {
        const tabId = tabs.id;
      }
    );
  }

  // get actual link
  if (message.from === "getActualLink") {
    chrome.tabs.query(
      { active: true, lastFocusedWindow: true },
      function (tabs) {
        let url = tabs[0].url;
        sendResponse({ url: url });
      }
    );
  }

  return true;
});
