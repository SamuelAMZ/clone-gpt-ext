let userAuthed = false;
// dynamic showing the popup elmts
let userOutScreen = document.querySelector(".user-out");
let userInScreen = document.querySelector(".user-in");
let settings = document.querySelector("#settings");
let login = document.querySelector("#login");
let yourChats = document.querySelector("#your-chats");
let header = document.querySelector(".clone-header");
let footer = document.querySelector(".clone-footer");

// auth check
const authUser = () => {
  if (userAuthed) {
    userOutScreen.style.display = "none";
    userInScreen.style.display = "flex";
  }
  if (!userAuthed) {
    userOutScreen.style.display = "flex";
    userInScreen.style.display = "none";
  }
};

// events
login.addEventListener("click", () => {
  chrome.tabs.create({ url: "https://iprompt.co/auth" });
});
settings.addEventListener("click", () => {
  chrome.tabs.create({ url: "https://iprompt.co" });
});
yourChats.addEventListener("click", () => {
  chrome.tabs.create({ url: "https://iprompt.co" });
});
header.addEventListener("click", () => {
  chrome.tabs.create({ url: "https://iprompt.co" });
});
footer.addEventListener("click", () => {
  chrome.tabs.create({ url: "https://iprompt.co" });
});

(() => {
  // check in localstorage
  chrome.storage.local.get("uid", function (item) {
    if (item.uid) {
      userAuthed = item.uid;
      authUser();
    }
    if (!item.uid) {
      userAuthed = false;
      authUser();
    }
  });
})();
