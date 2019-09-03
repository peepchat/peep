import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { uploadPic } from "../../redux/UserReducer/userReducer";
import { getUserInfo } from "../../redux/AuthReducer/AuthReducer";
import { getFriendsInfo } from "../../redux/FriendsReducer/friendsReducer";
import { connect } from "react-redux";

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 26rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  border: 1px solid lightgrey;
  z-index: 1;
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
  background: #202225;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
`;

const ProfilePic = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  margin: 1rem;
`;

const ProfileH2 = styled.h2`
  box-sizing: border-box;
  text-transform: uppercase;
  line-height: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
  font-weight: 600;
`;
const ProfileH3 = styled.h3`
  box-sizing: border-box;
  text-transform: uppercase;
  line-height: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
  font-weight: 600;
  color: #b9bbbe;
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

  const submitPicture = () => {
    props.uploadPic(imageurl);
    setImageurl("");
  };

  useEffect(() => {
    props.getUserInfo();
    console.log(props);
  });

  return (
    <ProfileWrapper>
      <ChatBox>
        <ProfileH2>My Account</ProfileH2>
        <ProfileBox>
          <PropfileCard>
            <ProfilePic src={props.profilePic} alt=""></ProfilePic>
            <ProfileH3>Nickname: {props.nickname}</ProfileH3>
            <ProfileH3>Email: {props.email}</ProfileH3>
          </PropfileCard>
          <WidgetButton onClick={() => widget.open()}>Cloudinary</WidgetButton>
          <WidgetButton onClick={submitPicture}>Submit</WidgetButton>
          <button onClick={() => setDropdown(!dropdown)}>Edit</button>
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
    nickname: state.authReducer.nickname,
    profilePic: state.authReducer.profilePic,
    bio: state.authReducer.bio,
    user_id: state.authReducer.user_id
  };
}

export default connect(
  mapStateToProps,
  { uploadPic, getUserInfo, getFriendsInfo }
)(Profile);
