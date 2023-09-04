const REACT_APP_API_URL = "https://iprompt-backend.uc.r.appspot.com";

// scraper
const kalamiScrapeData = () => {
  let allTexts = document
    .querySelector("body")
    .innerText.replaceAll("\n", "")
    .trim();

  return allTexts;
};

// post request helper
const postReq = async (data, url) => {
  // headers
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("GET", "POST", "OPTIONS");
  headers.append("Access-Control-Allow-Origin", `${REACT_APP_API_URL}/`);
  headers.append("Access-Control-Allow-Credentials", "true");

  try {
    // fetch
    let req = await fetch(`${REACT_APP_API_URL}${url}`, {
      mode: "cors",
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
      credentials: "include",
    });

    const serverRes = await req.json();
    return serverRes;
  } catch (error) {
    console.log(error);
  }

  return false;
};

// get item from the localstorage
const getJobIdFromLocalStorage = async (key) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, function (item) {
      resolve(item.currentJobStatus);
    });
  });
};

// sleep
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

window.addEventListener("load", async () => {
  // sleep 5sec for most of the dynamic requests
  await delay(5000);

  // scrape content
  let kalamiTagertContent = await kalamiScrapeData();

  // get current job id
  let kalamiJobId = await getJobIdFromLocalStorage("currentJobStatus");

  // send content to the job for saving
  const kalamiData = {
    jobId: kalamiJobId.jobId,
    scrapeContent: kalamiTagertContent,
  };

  if (kalamiJobId.last) {
    await postReq(kalamiData, "/api/save-scraping-data");

    // when done visiting, set job to done
    const response = await postReq(
      { jobId: kalamiJobId.jobId },
      "/api/job-done"
    );
  }

  if (!kalamiJobId.last) {
    await postReq(kalamiData, "/api/save-scraping-data");
  }

  // close tab
  setTimeout(() => {
    chrome.runtime.sendMessage({ from: "closeWebPage" });
  }, 1000);
});
