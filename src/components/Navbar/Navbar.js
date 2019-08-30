import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { checkUserLoggedIn } from "../../redux/AuthReducer/AuthReducer";
import { connect } from "react-redux";

const NavWrapper = styled.div`
  height: 100%;
  width: 5%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  position: fixed;
  left: 0;
  border: 1px solid lightgrey;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
`;

const Navbar = props => {
  // useEffect(() => {
  //   props.checkUserLoggedIn().catch(() => props.history.push("/"));
  // });

  return <NavWrapper>Nav</NavWrapper>;
};

export default connect(
  null,
  { checkUserLoggedIn }
)(Navbar);
