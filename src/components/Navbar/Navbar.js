import React from "react";
import styled from "styled-components";

const NavWrapper = styled.div`
  height:100%;
  width: 5%;
  display: flex;
  flex-direction: column
  justify-content: start;
  align-items: center;
`;

const Navbar = props => {
  return <NavWrapper>Nav</NavWrapper>;
};

export default Navbar;
