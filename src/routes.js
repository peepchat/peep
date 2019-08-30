import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import DMBar from "./components/DMBar/DMBar";
import DMChatBox from "./components/DMChatBox/DMChatBox";
import Profile from "./components/Profile/Profile";

import styled from "styled-components";

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export default (
  <>
    <Route exact path="/" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route
      path="/peep"
      render={() => (
        <FlexWrapper>
          <Navbar />
          <Route path="/peep" component={DMBar} />
          <Route exact path="/peep" component={Profile} />
          <Route exact path="/peep/dm" component={DMChatBox} />
        </FlexWrapper>
      )}
    />
  </>
);
