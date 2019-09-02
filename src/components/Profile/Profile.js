import React, { useState } from "react";
import styled from "styled-components";
import { uploadPic } from "../../redux/UserReducer/userReducer";
import { connect } from "react-redux";

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  left: 25%;
  position: fixed;
  background: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgrey;
`;

const ChatBox = styled.div`
  width: 100%;
  height: 90%;
`;

const MessageDiv = styled.div`
  width: 100%;
  height: 10%;
  background-color: pink;
`;

const WidgetButton = styled.button`
  width: 75px;
  height: 30px;
  background-color: #81e6d9;
  border-radius: 50%;
`;

const Profile = props => {
  const checkUploadResult = async (error, resultEvent) => {
    if (resultEvent.event === "success") {
      await setImageurl(resultEvent.info.secure_url);
      await props.uploadPic(imageurl);
    }
  };

  const [imageurl, setImageurl] = useState("");

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dtkvcgoz6",
      uploadPreset: "pvstqpgq",
      sources: ["local", "url", "dropbox", "facebook", "instagram"]
    },
    (error, result) => {
      checkUploadResult(error, result);
    }
  );

  return (
    <ProfileWrapper>
      <ChatBox>
        <WidgetButton onClick={() => widget.open()}>Cloudinary</WidgetButton>
      </ChatBox>

      <MessageDiv>MessageDiv</MessageDiv>
    </ProfileWrapper>
  );
};

export default connect(
  null,
  { uploadPic }
)(Profile);
