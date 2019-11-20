import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import configureStore from "./store";
import { Provider } from "react-redux";
import "./stylesheet/main.sass";

const rootElement = document.getElementById("App");
ReactDOM.render(
  <Provider store={configureStore()}>
    {" "}
    <App />
  </Provider>,
  rootElement
);
