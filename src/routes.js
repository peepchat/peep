import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import DMBar from "./components/DMBar/DMBar";
import DMChatBox from "./components/DMChatBox/DMChatBox";
import Profile from "./components/Profile/Profile";
import GroupBar from "./components/GroupBar/GroupBar";
import GroupChatBox from "./components/GroupChatBox/GroupChatBox";

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
          <Route path="/peep" component={Navbar} />
          <Route path="/peep/dm" component={DMBar} />
          <Route exact path="/peep/dm/profile/:email" component={Profile} />
          <Route exact path="/peep/dm/:chat_id" component={DMChatBox} />
          <Route path="/peep/group" component={GroupBar} />
          <Route exact path="/peep/group/:group_id" component={GroupChatBox} />
        </FlexWrapper>
      )}
    />
  </>
);
