import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { uploadPic, getFriendsData } from "../../redux/UserReducer/userReducer";
import {
  getUserInfo,
  populateNickname,
  editNickname,
  handleNicknameChange
} from "../../redux/AuthReducer/AuthReducer";
import {
  getFriends,
  makeFriendRequest,
  getRequests,
  getPending,
  addFriend,
  deleteFriend
} from "../../redux/FriendsReducer/friendsReducer";
import { connect } from "react-redux";
import {
  FaEdit,
  FaCloudUploadAlt,
  FaRegCheckCircle,
  FaUserCheck
} from "react-icons/fa";

const Profile = props => {
  const checkUploadResult = async (error, resultEvent) => {
    if (resultEvent.event === "success") {
      await setImageurl(resultEvent.info.secure_url);
      await props.uploadPic(imageurl);
    }
  };

  const [imageurl, setImageurl] = useState("");
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

  const { getUserInfo, getFriendsData, getRequests, editNickname } = props;
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
  const onClickEdit = nickname => {
    console.log(nickname);
    setEditstatus(true);
    props.populateNickname(nickname);
  };

  const onClickSave = () => {
    setEditstatus(false);
    props.editNickname(props.edit_Nickname);
    getFriendsData(email);
    getUserInfo();
  };

  const handleNicknameChange = event => {
    props.handleNicknameChange(event.target.value);
  };
  return (
    <ProfileWrapper>
      <ChatBox>
        {props.email === props.match.params.email ? (
          <ProfileH2>My Account</ProfileH2>
        ) : null}
        <ProfileBox>
          <ProfileCard>
            {!props.userPic ? (
              <ProfilePic
                src="https://res.cloudinary.com/john-personal-proj/image/upload/v1566234111/mello/dyx1e5pal1vn5nmqmzjs.png"
                alt="default"
              ></ProfilePic>
            ) : (
              <div className="profileUpload">
                <ProfilePic src={props.userPic} alt=""></ProfilePic>
                {editStatus === true ? (
                  <div className='uploadBtns'>
                  <>
                    <WidgetButton onClick={() => widget.open()}>
                      <FaCloudUploadAlt />
                    </WidgetButton>
                    <WidgetButton onClick={submitPicture}>
                      <FaRegCheckCircle />
                    </WidgetButton>
                  </></div>
                ) : null}
              </div>
            )}

            <ProfileH3>
              <span className="inputSpan" />
              {editStatus === true ? (
                <>
                  Nickname:
                  <div className="nickDiv">
                    <input
                      className="nickInput"
                      onChange={handleNicknameChange}
                      value={props.edit_Nickname}
                      type="text"
                    ></input>
                  </div>
                </>
              ) : (
                <>Nickname: {props.userNickname}</>
              )}
            </ProfileH3>
            <ProfileH3>Email: {props.userEmail}</ProfileH3>
            {props.email !== props.match.params.email ? (
              <PendingDiv>
                {filterPendingUser ? (
                  <div>Pending</div>
                ) : filterUser ? (
                  <button>Remove Friend</button>
                ) : !filterUser ? (
                  <button
                    className="addFriendBtn"
                    onClick={() => {
                      props.makeFriendRequest(props.userID);
                      props.getPending();
                    }}
                  >
                    Add Friend <FaUserCheck />
                  </button>
                ) : null}
              </PendingDiv>
            ) : null}

            {props.email === props.match.params.email ? (
              <EditDiv>
                {editStatus === false ? (
                  <button
                    className="editButton"
                    onClick={() => onClickEdit(props.userNickname)}
                  >
                    <FaEdit /> Edit
                  </button>
                ) : (
                  <button className="saveBtn" onClick={onClickSave}>
                    <FaRegCheckCircle /> Save
                  </button>
                )}
              </EditDiv>
            ) : null}
          </ProfileCard>
          <br />
          <RequestsWrapper>
            <RequestDiv>
              <ProfileH2>Pending Requests </ProfileH2>
              {props.requests.map((request, i) => {
                console.log(request);
                return (
                  <div className="pendingMapDiv" key={i}>
                    {!request.profile_img ? (
                      <ProfilePic
                        src="https://res.cloudinary.com/john-personal-proj/image/upload/v1566234111/mello/dyx1e5pal1vn5nmqmzjs.png"
                        alt="default"
                      ></ProfilePic>
                    ) : (
                      <ProfilePic src={request.profile_img} alt=""></ProfilePic>
                    )}
                    <p>{request.email}</p>
                    <p>{request.nickname}</p>
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
            </RequestDiv>
            <RequestDiv> Group Invites</RequestDiv>
          </RequestsWrapper>
        </ProfileBox>
      </ChatBox>
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
    requests: state.friendsReducer.requests,
    edit_Nickname: state.authReducer.edit_Nickname
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
    deleteFriend,
    editNickname,
    populateNickname,
    handleNicknameChange
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

const WidgetButton = styled.button`
  color: #fff;
  background-color: #43b581;
  width: 3rem;
  height: 2rem;
  transition: background-color 0.17s ease, color 0.17s ease;
  box-sizing: border-box;
  background: transparent;
  border: none;
  border-radius: 3px;
  font-size: 25px;
  font-weight: 500;
  line-height: 16px;
  padding: 2px 16px;
  position: relative;
  font-family: "Signika", sans-serif;
`;

const ProfileBox = styled.div`
  height: 100vh;
  width: 60vw;
  border-radius: 10px;
  box-sizing: border-box;
  background: #f5f5f5;
  background-color: #f5f5f5;
  border-color: #202225;
  padding: 20px;
  position: relative;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  border: 1px solid lightgrey;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px 0 rgba(14,30,37,0.12);
`;
const ProfileCard = styled.div`
  background: #ccc;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  .profileUpload {
    width: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .uploadBtns{
      display: flex;
      justify-content: space-evenly;
      
    }
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
  border-bottom: 1px solid grey;
`;
const ProfileH3 = styled.h3`
  box-sizing: border-box;
  text-transform: uppercase;
  line-height: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
  font-weight: 600;
  color: #b9bbbe;
  display:flex;
  .nickDiv{
    margin-left: 1%
   width: 14rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    transition: opacity .16s linear,transform .16s cubic-bezier(.36,.19,.29,1);
    box-shadow: 0 0 0 1px var(--saf-0),0 18px 48px 0 rgba(0,0,0,.35);
    font-size: 15px;
    line-height: 1.46666667;
    font-weight: 700;
    .nickInput {
      padding: 10px;
      height: 32px;
      padding-top: 9px;
      padding-bottom: 10px;
      font-size: 15px;
      line-height: 1.33333333;
      margin-bottom: 0;
      border-bottom-left-radius: 4px!important;
      border-bottom-right-radius: 4px!important;
      border-radius: 4px;
      border: 1px solid var(--saf-0);
      transition: border 80ms ease-out,box-shadow 80ms ease-out;
      box-sizing: border-box;
      margin: 0 0 20px;
    }
  }
`;

const PendingDiv = styled.div`
  height: 5rem;
  width: 7.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .addFriendBtn {
    color: #fff;
    background-color: #43b581;
    min-height: 32px;
    width: auto;
    height: 32px;
    min-width: 60px;
    transition: background-color 0.17s ease, color 0.17s ease;
    box-sizing: border-box;
    background: #43b581;
    border: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    padding: 2px 16px;
    position: relative;
    font-family: "Signika", sans-serif;
  }
`;
const EditDiv = styled.div`
  height: 5rem;
  width: 5rem;
  position: absolute;
  right: 5%;
  top: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .editButton {
    color: #fff;
    background-color: #43b581;
    min-height: 32px;
    width: auto;
    height: 32px;
    min-width: 60px;
    transition: background-color 0.9s ease, color 0.9s ease;
    box-sizing: border-box;
    background: #81e6d9;
    border: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    padding: 2px 16px;
    position: relative;
    font-family: "Signika", sans-serif;
  }
  .saveBtn {
    color: #fff;
    background-color: #43b581;
    min-height: 32px;
    width: auto;
    height: 32px;
    min-width: 60px;
    transition: background-color 0.17s ease, color 0.17s ease;
    box-sizing: border-box;
    background: #43b581;
    border: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    padding: 2px 16px;
    position: relative;
    font-family: "Signika", sans-serif;
  }
`;

const RequestDiv = styled.div`
  background: #ccc;
  width: 49%;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;

const RequestsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
