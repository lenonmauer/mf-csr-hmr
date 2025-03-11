import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


if (module.hot) {
  module.hot.accept("app2/Button", () => {
    console.log("Remote Button atualizado!");
    window.location.reload();
  });
}