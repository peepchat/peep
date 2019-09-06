import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { searchUser } from "../../redux/UserReducer/userReducer";
import {
  getFriends,
  getPending,
  getRequests
} from "../../redux/FriendsReducer/friendsReducer";
import { getDirectMessages } from "../../redux/MessagesReducer/MessagesReducer";
import { Link } from "react-router-dom";
import Modal from "react-awesome-modal";
import { socket } from "../Navbar/Navbar";

const DMBar = props => {
  const [search, setSearch] = useState("");

  const [visible, setVisible] = useState(false);

  const updateState = event => {
    setSearch(event.target.value);
    props.searchUser(event.target.value);
  };

  const { getFriends, friends } = props;

  useEffect(() => {
    socket.on("refresh-friends", () => {
      getFriends();
    });
  }, [getFriends]);

  console.log(friends);

  return (
    <>
      <Modal
        visible={visible}
        width="750"
        height="550"
        effect="fadeInDown"
        onClickAway={() => setVisible(false)}
      >
        <SearchInputModalWrap>
          <SearchInputModal
            placeholder="Search..."
            onChange={updateState}
            value={search}
            type="text"
            autoComplete="off"
          ></SearchInputModal>
          <SearchInputModalIcon>
            <i className="material-icons">search</i>
          </SearchInputModalIcon>
        </SearchInputModalWrap>
        <UserList>
          {search &&
            props.users.map(user => {
              return (
                <UserName>
                  <UserItem>
                    <Link
                      to={`/peep/dm/profile/${user.email}`}
                      onClick={() => {
                        setVisible(false);
                        setSearch("");
                        props.getFriends();
                        props.getPending();
                        props.getRequests();
                      }}
                    >
                      <i className="material-icons">person</i>
                      {user.email}
                    </Link>
                  </UserItem>
                </UserName>
              );
            })}
        </UserList>
      </Modal>
      <DMBarCont>
        <DMBarWrapper>
          <SearchWrapper onClick={() => setVisible(true)}>
            <SearchInput
              disabled
              readonly
              placeholder="Search..."
            ></SearchInput>
            <SearchButton>
              <i className="material-icons">search</i>
            </SearchButton>
          </SearchWrapper>
          <Label>Friends</Label>

          {friends.map((friend, index) => {
            return (
              <PicNameCont
                key={index}
                onClick={() => {
                  props.history.push(`/peep/dm/${friend.chat_id}`);
                  props.getDirectMessages(friend.chat_id);
                }}
              >
                {!friend.profile_img ? (
                  <UserPic
                    src="https://res.cloudinary.com/john-personal-proj/image/upload/v1566234111/mello/dyx1e5pal1vn5nmqmzjs.png"
                    alt="default"
                  />
                ) : (
                  <UserPic src={friend.profile_img} alt="" />
                )}
                {friend.online ? <Online /> : <Offline />}
                <UserNickname>{friend.nickname}</UserNickname>
              </PicNameCont>
            );
          })}
        </DMBarWrapper>
        <UserBar>
          {props.profilePic !== "" ? (
            <UserPic src={props.profilePic} />
          ) : (
            <UserPic src="https://res.cloudinary.com/john-personal-proj/image/upload/v1566234111/mello/dyx1e5pal1vn5nmqmzjs.png" />
          )}
          <UserNickname>{props.nickname}</UserNickname>
        </UserBar>
      </DMBarCont>
    </>
  );
};

const mapStateToProps = state => {
  return {
    users: state.userReducer.users,
    friends: state.friendsReducer.friends,
    nickname: state.authReducer.nickname,
    profilePic: state.authReducer.profilePic
  };
};

export default connect(
  mapStateToProps,
  { searchUser, getFriends, getPending, getRequests, getDirectMessages }
)(DMBar);

const DMBarCont = styled.div`
  display: flex;
  flex-direction: column;

  left: 6rem;
  width: 20rem;
  height: 100%;
  position: fixed;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  background-color: #f5f5f5;
  z-index: 100;
`;

const DMBarWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  border: 1px solid lightgrey;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  left: 6rem;
  width: 100%;
  height: 90%;
  background-color: #f5f5f5;

  /* henry why */
  div + div > div > div {
    border-radius: 0 !important;
  }
`;

const Label = styled.div`
  font-size: 1rem;
  text-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  margin: 1rem;
  width: 75%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* background-color: #2f3136; */
  width: 100%;
  height: 6%;

  border: 1px solid lightgray;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
`;

const SearchInput = styled.input`
  height: 100%;
  width: 80%;
  font-size: 1rem;
  padding: 1rem;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  appearance: none;
  border: none;
  outline: none;
  cursor: pointer;
`;

const SearchInputModalWrap = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
`;

const SearchInputModal = styled.input`
  height: 100%;
  width: 85%;
  font-size: 1rem;
  padding: 1rem;
  appearance: none;
  border: none;
  outline: none;
  z-index: 100;
`;

const SearchInputModalIcon = styled.div`
  height: 100%;
  width: 15%;
  padding: 1rem;
  font-size: 1rem;
  /* box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12); */
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserList = styled.div`
  height: 90%;
  width: 100%;
  font-size: 0.8rem;
  padding: 1rem;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  appearance: none;
  border: none;
  outline: none;
  overflow-y: auto;
`;

const UserName = styled.div`
  width: 100%;
`;

const UserItem = styled.div`
  color: #3f3f3f;
  font-size: 1rem;
  text-transform: lowercase;
  letter-spacing: 1px;
  margin: 1rem 0;
  list-style: none;
  border: solid 1px white;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  padding-left: 1.7rem;
  height: 4rem;
  background-color: lightgray;
  i {
    margin-right: 1rem;
  }

  &:hover {
    transform: scale(1.03);
    transition: 400ms;
  }

  a {
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
  }
`;

const Online = styled.div`
  width: 12px;
  height: 12px;
  border: solid 1px lightgray;
  background-color: #68d391;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const Offline = styled.div`
  width: 12px;
  height: 12px;
  border: solid 1px lightgray;
  background-color: gray;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const SearchButton = styled.button`
  height: 100%;
  width: 20%;
  font-size: 1rem;
  /* padding: 1rem; */
  appearance: none;
  background-color: #81e6d9;
  border: none;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  cursor: pointer;
`;

const PicNameCont = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 8%;

  &:hover {
    transition: 200ms;
    background-color: lightgray;
  }
`;

const UserPic = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  margin: 1rem;
`;

const UserNickname = styled.div`
  font-size: 1rem;
`;

const UserBar = styled.div`
  width: 100%;
  height: 10%;
  border: solid 1px lightgray;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;
