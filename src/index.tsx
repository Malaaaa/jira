import "./wdyr";
import "antd";
import "antd/dist/antd.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadServer, DevTools } from "jira-dev-tool";
import { AppProviders } from "context";

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <App />
        <DevTools />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);
reportWebVitals();
