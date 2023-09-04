// trigger new share
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  const REACT_APP_API_URL = "https://iprompt-backend.uc.r.appspot.com";

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

  // scrape websites content
  if (message.from === "scrapeWebPages") {
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    const links = message.links;
    const jobId = message.jobId;

    const visitLink = async (link) => {
      const tab = await chrome.tabs.create({ url: link });
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["app/scraping/webPages.js"],
      });

      await delay(10000);
    };

    const visitLinksSequentially = async () => {
      for (let i = 0; i < links.length; i++) {
        // set last link to true (let the content script know that this is the last link)
        if (i === links.length - 1) {
          chrome.storage.local.set(
            {
              currentJobStatus: {
                last: true,
                jobId: jobId,
              },
            },
            function () {
              console.log("job set 1");
            }
          );
          await delay(200);
        }

        await visitLink(links[i]);
      }
    };

    visitLinksSequentially();
  }

  // close web page
  if (message.from === "closeWebPage") {
    chrome.tabs.remove(sender.tab.id);
  }

  return true;
});
