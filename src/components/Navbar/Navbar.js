import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  checkUserLoggedIn,
  getUserInfo,
  logoutUser
} from "../../redux/AuthReducer/AuthReducer";
import {
  getGroups,
  getGroupPending
} from "../../redux/GroupReducer/groupReducer";
import { connect } from "react-redux";
import Modal from "react-awesome-modal";
import CreateForm from "../CreateForm/CreateForm";
import JoinForm from "../JoinForm/JoinForm";
import io from "socket.io-client";
import Loader from "../Loader/Loader";
import Peep from "../../Logo/Peep.svg";

export const socket = io();

const Navbar = props => {
  const {
    getUserInfo,
    nickname,
    user_id,
    checkUserLoggedIn,
    history,
    getGroups,
    groups,
    getGroupPending,
    groupPending
  } = props;

  useEffect(() => {
    checkUserLoggedIn().catch(() => history.push("/"));
    getUserInfo();
    getGroups();
    getGroupPending();
  }, [getUserInfo, checkUserLoggedIn, history, getGroups, getGroupPending]);

  if (props.nickname) {
    socket.emit("login", {
      user_id,
      msg: `${nickname} logged in.`
    });
  }

  const [visible, setVisible] = useState(false);
  const [modalView, setModalView] = useState("");

  const groupNames = groups.map(group => group.group_name.toLowerCase());
  const pendingGroupRequests = groupPending.map(group =>
    group.group_name.toLowerCase()
  );

  const viewCreate = () => {
    setModalView("Create");
  };

  const viewJoin = () => {
    setModalView("Join");
  };

  const viewDefault = () => {
    setModalView("");
  };

  const handleLogout = () => {
    props.logoutUser().then(() => props.history.push("/"));
    setVisible(false);
    setModalView("");
    // socket.emit("disconnect");
  };

  const goToHome = () => {
    props.history.push(`/peep/dm/profile/${props.email}`);
  };

  return (
    <>
      <Loader></Loader>
      <NavWrapper>
        <ChannelWrapper>
          <HomeLogo src={Peep} onClick={goToHome}></HomeLogo>
          <Underline />
          {groups.map((group, index) => {
            return (
              <Channel
                src={group.group_img}
                alt="group_img"
                key={index}
                onClick={() => {
                  props.history.push(`/peep/group/${group.group_id}`);
                }}
              ></Channel>
            );
          })}
          <PlusButton onClick={() => setVisible(true)}>+</PlusButton>
        </ChannelWrapper>
        <LogoutButtonCont>
          <LogoutButton onClick={handleLogout}>
            <i class="material-icons">exit_to_app</i>
          </LogoutButton>
        </LogoutButtonCont>
      </NavWrapper>
      <Modal
        visible={visible}
        width="700"
        height="450"
        effect="fadeInDown"
        onClickAway={() => setVisible(false)}
      >
        {modalView === "" ? (
          <ModalWrapper>
            <CardOne>
              <CardTitle>Create</CardTitle>
              <CardContent>
                Create a new group and invite your friends! It's free! He he ex
                dee
              </CardContent>
              <CardButton onClick={viewCreate}>Create a group</CardButton>
            </CardOne>
            <CardTwo>
              <CardTitle>Join</CardTitle>
              <CardContent>
                Join your friends messaging group and start making fun of your
                friends!
              </CardContent>
              <CardButton onClick={viewJoin}>Join a group</CardButton>
            </CardTwo>
          </ModalWrapper>
        ) : modalView === "Create" ? (
          <CreateForm
            viewDefault={viewDefault}
            setVisible={setVisible}
            setModalView={setModalView}
          />
        ) : modalView === "Join" ? (
          <JoinForm
            viewDefault={viewDefault}
            groupNames={groupNames}
            setModalView={setModalView}
            setVisible={setVisible}
            pendingGroupRequests={pendingGroupRequests}
          />
        ) : null}
      </Modal>
    </>
  );
};

function mapStateToProps(state) {
  return {
    email: state.authReducer.email,
    nickname: state.authReducer.nickname,
    user_id: state.authReducer.user_id,
    groups: state.groupReducer.groups,
    groupPending: state.groupReducer.groupPending
  };
}

export default connect(
  mapStateToProps,
  {
    getUserInfo,
    checkUserLoggedIn,
    logoutUser,
    getGroups,
    getGroupPending
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

const ChannelWrapper = styled.div`
  height: 90%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const Channel = styled.img`
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
  cursor: pointer;
  &:hover {
    transition: 400ms;
    transform: scale(0.96);
    background-color: lightgray;
  }
`;

const HomeLogo = styled.img`
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
  padding: 0.25rem;
  background-color: ${props => props.theme.teal2};
  cursor: pointer;

  &:hover {
    transition: 400ms;
    background-color: ${props => props.theme.teal3};
    transform: scale(0.96);
  }
`;

const LogoutButtonCont = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoutButton = styled.button`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  /* position: fixed; */
  bottom: 0;
  left: 0;
  border: none;
  cursor: pointer;
  i {
    font-size: 2rem;
    text-align: center;
  }

  &:hover {
    transition: 400ms;
    background-color: #f56565;
    transform: scale(0.95);
    color: white;
  }
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
  cursor: pointer;
  color: grey;
  &:hover {
    transition: 400ms;
    background-color: #4fd1c5;
    color: white;
    transform: scale(0.95);
  }
`;

const Underline = styled.div`
  width: 80%;
  border-bottom: solid 3px #81e6d9;
`;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const CardOne = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 35%;
  height: 75%;
  border: solid 1px lightgray;
  padding: 1rem;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
`;

const CardTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 85%;
  height: 8%;
  padding: 1rem;
  font-size: 2rem;
`;

const CardContent = styled.div`
  width: 85%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  font-size: 1rem;
  text-align: center;
  line-height: 1.618;
`;

const CardButton = styled.button`
  width: 85%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 1rem;
  font-size: 1rem;
  background-color: #81e6d9;
  border: none;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  outline: none;

  &:hover {
    transition: 400ms;
    background-color: #4fd1c5;
    color: white;
    transform: scale(0.95);
  }
`;

const CardTwo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 35%;
  height: 75%;
  border: solid 1px lightgray;
  padding: 1rem;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
`;
