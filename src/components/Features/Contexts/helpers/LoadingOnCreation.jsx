import React, { useEffect } from "react";

// icons
import { BsCheckCircle } from "react-icons/bs";

// loader spinner
import { Oval } from "react-loader-spinner";

const LoadingOnCreation = ({ loadingStates }) => {
  // force scroll into last loader view
  useEffect(() => {
    const clonegptLastLoader = document.querySelector(
      "#clonegpt-loader-bottom"
    );

    clonegptLastLoader.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, []);

  return (
    <>
      <div className="clonegpt-loading-oncreation">
        {loadingStates.map((elm, idx) => {
          return (
            <div
              className={
                elm.status === true
                  ? "clonegpt-single-loader-elm active"
                  : "clonegpt-single-loader-elm"
              }
              key={idx}
            >
              <BsCheckCircle
                className={
                  elm.status === true
                    ? "single-loader-icon active"
                    : "single-loader-icon"
                }
              />
              <p>{elm.text}</p>
              {elm.status === "loading" && (
                <Oval
                  height={20}
                  width={20}
                  color="#cf046b"
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#cf046b"
                  strokeWidth={7}
                  strokeWidthSecondary={7}
                />
              )}
            </div>
          );
        })}
      </div>

      <span id="clonegpt-loader-bottom"></span>
    </>
  );
};

export default LoadingOnCreation;
