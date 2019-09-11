import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

function Loader({ authLoading = false, friendsLoading = false }) {
  console.log(authLoading);
  return (
    <StyledLoader derping={authLoading || friendsLoading}>
      Loading...
    </StyledLoader>
  );
}

const mapStateToProps = state => {
  return {
    authLoading: state.authReducer.loading,
    friendsLoading: state.friendsReducer.loading
  };
};

export default connect(
  mapStateToProps,
  null
)(Loader);

const StyledLoader = styled.div`
  position: fixed;
  z-index: ${props => (props.derping ? 9999 : -1)};
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: white;
  color: ${props => props.theme.teal3};
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${props => (props.derping ? 1 : 0)};
  transition: all 300ms;
`;
