const waitForClass = (selector) => {
  return new Promise((resolve) => {
    const checkExistence = () => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
      } else {
        setTimeout(checkExistence, 100); // Check again after a short delay
      }
    };
    checkExistence();
  });
};

const alreadyChangedUi = (elm) => {
  if (elm.querySelector(".clonegpt-collapse")) {
    return true;
  }

  return false;
};

const addToggleTogeneratedContext = async () => {
  await waitForClass("main > div > div .group");

  // detect context and add html to it logic
  document.querySelectorAll("main > div > div .group").forEach((elm) => {
    if (
      elm?.textContent?.split("[context]").length > 1 &&
      !alreadyChangedUi(elm)
    ) {
      let originalText = elm.querySelector(
        ".flex.flex-col.items-start.whitespace-pre-wrap.break-words"
      ).textContent;

      let queryText = elm?.textContent
        ?.split("[query]")[1]
        ?.trim()
        .replaceAll("\n", "");

      let newText = `
        <div class="clonegpt-collapse">
            <button class="clonegpt-collapse-toggle">Generated Context</button>
            <div class="clonegpt-collapse-content">
                <p>${originalText}</p>
            </div>
        </div>${queryText}
            `;

      elm.querySelector(
        ".flex.flex-col.items-start.whitespace-pre-wrap.break-words"
      ).innerHTML = newText;
    }
  });

  // toggle function anim
  document.querySelectorAll(".clonegpt-collapse-toggle").forEach((elm) => {
    elm.addEventListener("click", function () {
      this.parentNode.classList.toggle("active");
    });
  });
};

export default addToggleTogeneratedContext;
