import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// create dom element
let cloneGptWidget = document.createElement("div");
cloneGptWidget.setAttribute("id", "clonegpt-container");
document.body.appendChild(cloneGptWidget);

// append all code in the element
const root = ReactDOM.createRoot(document.getElementById("clonegpt-container"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
