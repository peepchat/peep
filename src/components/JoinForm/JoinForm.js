import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  searchGroup,
  makeRequest
} from "../../redux/GroupReducer/groupReducer";
import styled from "styled-components";

const JoinForm = props => {
  const [search, setSearch] = useState("");

  const {
    groupNames,
    makeRequest,
    searchGroups,
    searchGroup,
    pendingGroupRequests
  } = props;

  const pending = pendingGroupRequests;
  console.log(pending);
  console.log(groupNames);
  console.log(searchGroups);

  const updateState = event => {
    setSearch(event.target.value);
    searchGroup(event.target.value);
  };

  return (
    <>
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
          searchGroups
            .filter(
              group => !groupNames.includes(group.group_name.toLowerCase())
            )
            .filter(group => !pending.includes(group.group_name.toLowerCase()))
            .map((group, index) => {
              return (
                <UserName
                  key={index}
                  onClick={() => {
                    makeRequest(group.group_id);
                    props.setModalView("");
                    props.setVisible(false);
                  }}
                >
                  <UserItem>
                    {group.group_img ? (
                      <SearchPic src={group.group_img}></SearchPic>
                    ) : (
                      <i className="material-icons">group</i>
                    )}

                    {group.group_name}
                    <i className="material-icons add-icon">group_add</i>
                  </UserItem>
                </UserName>
              );
            })}
      </UserList>
    </>
  );
};

function mapStateToProps(state) {
  return {
    searchGroups: state.groupReducer.searchGroups,
    groupPending: state.groupReducer.groupPending
  };
}

export default connect(
  mapStateToProps,
  { searchGroup, makeRequest }
)(JoinForm);

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HeadWrapper = styled.div`
  width: 75%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeadFirstDiv = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 2rem;
  line-height: 1.618;
`;

const HeadSecondDiv = styled.div`
  width: 100%;
  height: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1rem;
  line-height: 1.618;
`;

const HeadThirdDiv = styled.div`
  width: 100%;
  height: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  input {
    padding: 1rem;
    border: none;
    font-size: 1rem;
    background: none;
    color: gray;
    width: 80%;
    outline: none;
    border-bottom: #81e6d9 2px solid;
    padding-left: 0;
    width: 75%;
  }
`;

const FooterWrapper = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: lightgray;
  font-size: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 50%;
  background: none;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  border: none;
  margin-left: 6rem;
  background-color: #81e6d9;
  outline: none;

  &:hover {
    transition: 400ms;
    background-color: #4fd1c5;
    color: white;
    transform: scale(0.95);
  }
`;

const JoinButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 50%;
  background: none;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  border: none;
  margin-right: 6rem;
  background-color: #81e6d9;
  outline: none;

  &:hover {
    transition: 400ms;
    background-color: #4fd1c5;
    color: white;
    transform: scale(0.95);
  }
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
  a {
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
  }
`;

const SearchPic = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  margin-right: 1rem;
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

  .add-icon {
    margin-left: 1rem;
  }
`;
