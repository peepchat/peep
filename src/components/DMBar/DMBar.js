import React from "react";
import styled from "styled-components";

const DMBarCont = styled.div`
  display: flex;
  flex-direction: column;

  left: 5%;
  width: 20%;
  height: 100%;
  position: fixed;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  background-color: #f5f5f5;
`;

const DMBarWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  border: 1px solid lightgrey;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  left: 5%;
  width: 100%;
  height: 90%;
  background-color: #f5f5f5;
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

const DMBar = props => {
  return (
    <DMBarCont>
      <DMBarWrapper>
        <SearchWrapper>
          <SearchInput placeholder="Search..."></SearchInput>
          <SearchButton>x</SearchButton>
        </SearchWrapper>

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
  );
};

export default DMBar;
