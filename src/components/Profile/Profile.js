import React, { useState } from "react";
import styled from "styled-components";
import { uploadPic } from "../../redux/UserReducer/userReducer";
import { connect } from "react-redux";

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  left: 5%;
  position: fixed;
  background: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  border: 1px solid lightgrey;
`;

const ChatBox = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
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

const ProfileBox = styled.div`
  height: 60vh;
  width: 50vw;
  border-radius: 10px;
  box-sizing: border-box;
  background: rgba(32, 34, 37, 0.6);
  border-color: #202225;
  padding: 20px;
  position: relative;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
`;
const PropfileCard = styled.div`
background: #202225
border-width: 1px;
    border-style: solid;
    border-radius: 5px;
`;
const ProfileH2 = styled.h2`

box-sizing: border-box;
text-transform: uppercase;
line-height: 20px;
margin-bottom: 20px;
margin-left: 10px;
font-weight: 600;
}
`;
const ProfileH3 = styled.h3`

box-sizing: border-box;
text-transform: uppercase;
line-height: 20px;
margin-bottom: 20px;
margin-left: 10px;
font-weight: 600;
color: #b9bbbe;
}
`;

const Profile = props => {
  const checkUploadResult = async (error, resultEvent) => {
    if (resultEvent.event === "success") {
      await setImageurl(resultEvent.info.secure_url);
      await props.uploadPic(imageurl);
    }
  };

  const [imageurl, setImageurl] = useState("");
  const [dropdown, setDropdown] = useState(false);
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
        <ProfileH2>My Account</ProfileH2>
        <ProfileBox>
          <PropfileCard>
            <ProfileH3>Nickname: {props.nickname}</ProfileH3>
            <ProfileH3>Email: {props.email}</ProfileH3>
          </PropfileCard>
          <WidgetButton onClick={() => widget.open()}>Cloudinary</WidgetButton>
          <button onClick={() => setDropdown( !dropdown )}>
            Edit
          </button>
          {dropdown === true ? (
            <div>
              User info
              <input />
              <button>Edit</button>
            </div>
          ) : null}
        </ProfileBox>
      </ChatBox>

      {/* <MessageDiv>MessageDiv</MessageDiv> */}
    </ProfileWrapper>
  );
};

function mapStateToProps(state) {
  return {
    email: state.authReducer.email,
    nickname: state.authReducer.nickname
  };
}

export default connect(
  mapStateToProps,
  { uploadPic }
)(Profile);
