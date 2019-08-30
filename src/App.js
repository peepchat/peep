import React from "react";
import "./App.css";
import routes from "./routes";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Signika&display=swap');
 
  body {
    padding: 0;
    margin: 0;
    font-family: 'Signika', sans-serif;
    -webkit-font-smoothing: subpixel-antialiased;
  }
`;

function App() {
  return <div className="App">{routes}</div>;
}

export default App;
