import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  checkUserLoggedIn,
  getUserInfo
} from "../../redux/AuthReducer/AuthReducer";
import { connect } from "react-redux";
import io from "socket.io-client";

export const socket = io();

const Navbar = props => {
  const { getUserInfo, nickname, user_id } = props;

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  if (props.nickname) {
    socket.emit("login", {
      user_id,
      msg: `${nickname} logged in.`
    });
  }

  return (
    <NavWrapper>
      <Channel>A</Channel>
      <Underline />
      <Channel>B</Channel>
      <Channel>C</Channel>
      <Channel>D</Channel>
      <PlusButton>+</PlusButton>
    </NavWrapper>
  );
};

function mapStateToProps(state) {
  return {
    email: state.authReducer.email,
    nickname: state.authReducer.nickname,
    user_id: state.authReducer.user_id
  };
}

export default connect(
  mapStateToProps,
  {
    getUserInfo,
    checkUserLoggedIn
  }
)(Navbar);

const NavWrapper = styled.div`
  height: 100%;
  width: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  position: fixed;
  left: 0;
  z-index: 100;
  background: white;
  border: 1px solid lightgrey;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
`;

const Channel = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  padding: 1rem;
`;

const PlusButton = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  padding: 1rem;
  background-color: #81e6d9;
  color: grey;
`;

const Underline = styled.div`
  width: 80%;
  border-bottom: solid 3px #81e6d9;
`;
