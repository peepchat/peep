import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as cloudkey from "../../cloudkey.json";
import { createGroup } from "../../redux/GroupReducer/groupReducer";
import { connect } from "react-redux";

const CreateForm = props => {
  const [imageurl, setImageurl] = useState("");
  const [groupName, setGroupName] = useState("");

  const { createGroup } = props;

  const handleChange = event => {
    setGroupName(event.target.value);
  };

  const checkUploadResult = resultEvent => {
    if (resultEvent.event === "success") {
      setImageurl(resultEvent.info.secure_url);
    }
  };

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: cloudkey.cloud_name,
      uploadPreset: cloudkey.upload_preset,
      sources: ["local", "url", "dropbox", "facebook", "instagram"]
    },
    (error, result) => {
      checkUploadResult(result);
    }
  );

  return (
    <ModalWrapper>
      <HeadWrapper>
        <HeadFirstDiv>
          Create Your Group
          <p>
            When you create a group, you will be able to chat amongst your
            friends
          </p>
        </HeadFirstDiv>
        <HeadSecondDiv>
          <HeadSecondDivChildren>
            <p>Group Name</p>
            <input
              placeholder="Enter a Group Name..."
              onChange={handleChange}
            ></input>
          </HeadSecondDivChildren>
          <HeadSecondDivChildren onClick={() => widget.open()}>
            {imageurl == "" ? (
              <div></div>
            ) : (
              <img src={imageurl} alt="group_picture" />
            )}
          </HeadSecondDivChildren>
        </HeadSecondDiv>
      </HeadWrapper>
      <FooterWrapper>
        <BackButton onClick={props.viewDefault}>Back</BackButton>
        <CreateButton
          onClick={() => {
            if (groupName === "" || imageurl === "") {
              alert("Group name and image required.");
            } else {
              createGroup(groupName, imageurl);
              setImageurl("");
              setGroupName("");
              props.setVisible(false);
              props.setModalView("");
            }
          }}
        >
          Create
        </CreateButton>
      </FooterWrapper>
    </ModalWrapper>
  );
};

export default connect(
  null,
  { createGroup }
)(CreateForm);

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
  height: 33%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 2rem;
  p {
    font-size: 1rem;
    margin-top: 1rem;
    width: 60%;
    line-height: 1.618;
  }
`;

const HeadSecondDiv = styled.div`
  width: 100%;
  height: 67%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const HeadSecondDivChildren = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
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
  }
  p {
    font-size: 1rem;
    width: 80%;
    text-align: left;
    padding: 1rem;
    padding-left: 0;
    line-height: 1.618;
  }

  img {
    width: 128px;
    height: 128px;
    border-radius: 50%;
    border: solid 1px lightgray;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
      0 2px 4px 0 rgba(14, 30, 37, 0.12);
  }
  div {
    width: 128px;
    height: 128px;
    border-radius: 50%;
    background-color: #81e6d9;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
      0 2px 4px 0 rgba(14, 30, 37, 0.12);
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

  &:hover {
    transition: 400ms;
    background-color: #4fd1c5;
    color: white;
    transform: scale(0.95);
  }
`;

const CreateButton = styled.button`
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
