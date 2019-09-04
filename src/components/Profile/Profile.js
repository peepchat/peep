import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { uploadPic, getFriendsData } from "../../redux/UserReducer/userReducer";
import { getUserInfo } from "../../redux/AuthReducer/AuthReducer";
import {
  getFriends,
  makeFriendRequest,
  getRequests,
  getPending,
  addFriend,
  deleteFriend
} from "../../redux/FriendsReducer/friendsReducer";
import { connect } from "react-redux";

const Profile = props => {
  const checkUploadResult = async (error, resultEvent) => {
    if (resultEvent.event === "success") {
      await setImageurl(resultEvent.info.secure_url);
      await props.uploadPic(imageurl);
    }
  };

  const [imageurl, setImageurl] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [editStatus, setEditstatus] = useState(false);
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

  const { getUserInfo, getFriendsData, getRequests } = props;
  const { email } = props.match.params;

  useEffect(() => {
    getUserInfo();
    getFriendsData(email);
    getRequests();
  }, [getUserInfo, getFriendsData, getRequests, email]);

  const filterFriendsArray = props.friends.filter(
    user => user.email === props.match.params.email
  );
  let filterUser;
  if (filterFriendsArray.length > 0) {
    filterUser = filterFriendsArray[0];
  }

  const filterPending = props.pending.filter(
    user => user.email === props.match.params.email
  );
  let filterPendingUser;
  if (filterPending.length > 0) {
    filterPendingUser = filterPending[0];
  }

  return (
    <ProfileWrapper>
      <ChatBox>
        {props.email === props.match.params.email ? (
          <ProfileH2>My Account</ProfileH2>
        ) : null}
        <ProfileBox>
          <PropfileCard>
            {!props.userPic ? (
              <ProfilePic
                src="https://res.cloudinary.com/john-personal-proj/image/upload/v1566234111/mello/dyx1e5pal1vn5nmqmzjs.png"
                alt="default"
              ></ProfilePic>
            ) : (
              <div className="profileUpload">
                <ProfilePic src={props.userPic} alt=""></ProfilePic>
                {editStatus === true ? (
                  <>
                    <WidgetButton onClick={() => widget.open()}>
                      Cloudinary
                    </WidgetButton>
                    <WidgetButton onClick={submitPicture}>Submit</WidgetButton>
                  </>
                ) : null}
              </div>
            )}

            <ProfileH3>
              Nickname: {props.userNickname}
              {editStatus === true ? (
                <>
                  <input placeholder="Nickname"></input>
                </>
              ) : null}
            </ProfileH3>
            <ProfileH3>
              Email: {props.userEmail}
              {editStatus === true ? (
                <>
                  <input placeholder="Email"></input>
                </>
              ) : null}
            </ProfileH3>
            {props.email !== props.match.params.email ? (
              <PendingDiv>
                {filterPendingUser ? (
                  <div>Pending</div>
                ) : filterUser ? (
                  <button>Remove Friend</button>
                ) : !filterUser ? (
                  <button
                    onClick={() => {
                      props.makeFriendRequest(props.userID);
                      props.getPending();
                    }}
                  >
                    Add Friend
                  </button>
                ) : null}
              </PendingDiv>
            ) : null}

            {props.email === props.match.params.email ? (
              <EditDiv>
                <button
                  className="editButton"
                  onClick={() => setEditstatus(!editStatus)}
                >
                  Edit
                </button>
                {editStatus === true ? (
                  <div className="editUpload">
                    
                    <button>Save</button>
                  </div>
                ) : null}
              </EditDiv>
            ) : null}
          </PropfileCard>

          <div>
            <p>Pending Requests </p>
            {props.requests.map((request, i) => {
              console.log(request);
              return (
                <div key={i}>
                  <p>{request.email}</p>
                  <p>{request.nickname}</p>

                  {!request.profile_img ? (
                    <ProfilePic
                      src="https://res.cloudinary.com/john-personal-proj/image/upload/v1566234111/mello/dyx1e5pal1vn5nmqmzjs.png"
                      alt="default"
                    ></ProfilePic>
                  ) : (
                    <ProfilePic src={request.profile_img} alt=""></ProfilePic>
                  )}
                  <button
                    onClick={() => {
                      props.addFriend(request.user_id, request.request_id);
                      props.getRequests();
                    }}
                  >
                    Accept Request
                  </button>
                </div>
              );
            })}
          </div>
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
    user_id: state.authReducer.user_id,
    userID: state.userReducer.user_id,
    userEmail: state.userReducer.email,
    userNickname: state.userReducer.nickname,
    userPic: state.userReducer.profilePic,
    userBio: state.userReducer.bio,
    friends: state.friendsReducer.friends,
    pending: state.friendsReducer.pending,
    requests: state.friendsReducer.requests
  };
}

export default connect(
  mapStateToProps,
  {
    uploadPic,
    getUserInfo,
    getFriendsData,
    getFriends,
    makeFriendRequest,
    getRequests,
    getPending,
    addFriend,
    deleteFriend
  }
)(Profile);

//------ styles
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
  height: 100vh;
  width: 60vw;
  border-radius: 10px;
  box-sizing: border-box;
  background: #f5f5f5;
  border-color: #202225;
  padding: 20px;
  position: relative;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
`;
const PropfileCard = styled.div`
  background: #ccc;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  .profileUpload{
    display:flex;
    flex-direction: column;
    justify-content: center;
    margin-

  }
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

const PendingDiv = styled.div`
  height: 10rem;
  width: 10rem;
  background: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const EditDiv = styled.div`
  height: 5rem;
  width: 5rem;
  position: absolute;
  right: 5%;
  top: 5%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .editButton {
  }
  .editUpload {
  }
`;
