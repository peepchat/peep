import React from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./redux/store";
import { HashRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Signika&display=swap');
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

  body {
    font-family: 'Signika', sans-serif;
  }

`;
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
      <GlobalStyle/>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
