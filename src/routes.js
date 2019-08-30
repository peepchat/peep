import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import TempLandingPage from "./components/TempLandingPage/TempLandingPage";

export default (
  <>
    <Route exact path="/" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route
      path="/peep"
      render={() => (
        <div>
          <TempLandingPage />
        </div>
      )}
    />
  </>
);
