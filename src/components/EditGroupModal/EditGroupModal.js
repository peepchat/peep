import React, { useState, Effect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  editGroup,
  populateGroupName,
  handleGroupNameChange,
  getGroupName
} from "../../redux/GroupReducer/groupReducer";
require("dotenv").config();

const EditGroupModal = props => {
  const [imageurl, setImageurl] = useState("");
  const [groupName, setGroupName] = useState("");

  const checkUploadResult = resultEvent => {
    if (resultEvent.event === "success") {
      setImageurl(resultEvent.info.secure_url);
    }
  };

  const onClickSave = () => {
    props.setEditStatus(false);
    props.editGroup(props.id, props.editGroupName, imageurl);
    props.getGroupName(props.id);
    setImageurl("");
  };

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: process.env.REACT_APP_CLOUD_NAME,
      uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
      sources: ["local", "url", "dropbox", "facebook", "instagram"]
    },
    (error, result) => {
      checkUploadResult(result);
    }
  );

  return (
    <ModalWrapper>
      <HeadDiv>
        <HeadPictureDiv>
          <p>Update Picture:</p>
          {imageurl ? (
            <img src={imageurl} alt="" onClick={() => widget.open()} />
          ) : (
            <img
              onClick={() => widget.open()}
              src={props.groupPic}
              alt=""
            ></img>
          )}
        </HeadPictureDiv>
        <HeadNameDiv>
          Update Group Name:
          <input
            type="text"
            onChange={props.handleGroupNameChange}
            value={props.editGroupName}
          ></input>
        </HeadNameDiv>
      </HeadDiv>
      <Footer>
        <CancelButton onClick={() => props.setEditStatus(false)}>
          Cancel
        </CancelButton>
        <SaveButton onClick={onClickSave}>Save</SaveButton>
      </Footer>
    </ModalWrapper>
  );
};

export default connect(
  null,
  { editGroup, populateGroupName, handleGroupNameChange, getGroupName }
)(EditGroupModal);

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HeadDiv = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Footer = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: lightgray;
  font-size: 2rem;
`;

const HeadPictureDiv = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  div {
    width: 128px;
    height: 128px;
    border-radius: 50%;
    background-color: #81e6d9;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
      0 2px 4px 0 rgba(14, 30, 37, 0.12);
  }
  img {
    width: 128px;
    height: 128px;
    border-radius: 50%;
    border: solid 1px lightgray;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
      0 2px 4px 0 rgba(14, 30, 37, 0.12);
  }

  p {
    margin-bottom: 1rem;
  }
`;

const HeadNameDiv = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1rem;
  button {
    outline: none;
    background: none;
    border: none;
    border-radius: 50%;
    margin-left: 1rem;
    &:hover {
      transition: 400ms;
      transform: scale(0.95);
      background-color: ${props => props.theme.teal2};
      color: white;
    }
  }
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
  }
`;

const SaveButton = styled.button`
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

  &:hover {
    transition: 400ms;
    background-color: #4fd1c5;
    color: white;
    transform: scale(0.95);
  }
`;

const CancelButton = styled.button`
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

  &:hover {
    transition: 400ms;
    background-color: #4fd1c5;
    color: white;
    transform: scale(0.95);
  }
`;
