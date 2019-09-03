import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { searchUser } from "../../redux/UserReducer/userReducer";
import { Link } from "react-router-dom";
import Modal from "react-awesome-modal";

const DMBar = props => {
  const [search, setSearch] = useState("");

  const [visible, setVisible] = useState(false);

  const updateState = event => {
    setSearch(event.target.value);
    props.searchUser(event.target.value);
  };

  useEffect(() => {
    console.log(props);
  });

  return (
    <>
      <Modal
        visible={visible}
        width="700"
        height="450"
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
            <i class="material-icons">search</i>
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
                      onClick={() => setVisible(false)}
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
          <SearchWrapper>
            <SearchInput
              placeholder="Search..."
              onClick={() => setVisible(true)}
            ></SearchInput>
            <SearchButton>
              <i class="material-icons">search</i>
            </SearchButton>
          </SearchWrapper>
          <Label>Friends</Label>

          <Label>Direct Messages</Label>
          <PicNameCont>
            <UserPic>J</UserPic>
            <UserNickname>Mudduh J</UserNickname>
          </PicNameCont>
          <PicNameCont>
            <UserPic>A</UserPic>
            <UserNickname>Ali</UserNickname>
          </PicNameCont>
          <PicNameCont>
            <UserPic>H</UserPic>
            <UserNickname>H4Nade</UserNickname>
          </PicNameCont>
        </DMBarWrapper>
        <UserBar>
          <UserPic>J</UserPic>
          <UserNickname>Mudduh J</UserNickname>
        </UserBar>
      </DMBarCont>
    </>
  );
};

const mapStateToProps = state => {
  return {
    users: state.userReducer.users
  };
};

export default connect(
  mapStateToProps,
  { searchUser }
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
  background: white;
  border: solid 1px white;
  box-shadow: $box-shadow;
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
`;

const PicNameCont = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 8%;
`;

const UserPic = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  padding: 1rem;
  background-color: white;
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
