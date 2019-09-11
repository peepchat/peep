import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-awesome-modal";
import { connect } from "react-redux";
import {
  getGroupMembers,
  addUser,
  removeMember,
  editGroup,
  getGroupName,
  handleGroupNameChange,
  populateGroupName
} from "../../redux/GroupReducer/groupReducer";
import { searchUser } from "../../redux/UserReducer/userReducer";
import EditGroupModal from "../EditGroupModal/EditGroupModal";

const GroupBar = props => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  const {
    getGroupMembers,
    addUser,
    groupMembers,
    removeMember,
    getGroupName,
    editGroup
  } = props;

  const id = props.match.params.group_id;

  const membersEmail = groupMembers.map(member => member.email);

  const updateState = event => {
    setSearch(event.target.value);
    props.searchUser(event.target.value);
  };

  const onClickEdit = groupname => {
    setEditStatus(true);
    console.log(groupname);
    props.populateGroupName(groupname);
  };

  const onClickSave = () => {
    setEditStatus(false);
    editGroup(props.editGroupName);
    getGroupName(id);
  };

  const handleGroupNameChange = event => {
    console.log(event);
    props.handleGroupNameChange(event.target.value);
  };

  useEffect(() => {
    getGroupMembers(id);
    getGroupName(id);
  }, [getGroupMembers, getGroupName, id]);

  // console.log(groupMembers);
  // console.log(props.match.params);
  // console.log(id);

  const getMember = groupMembers.filter(
    member => member.user_id === props.user_id
  );

  let checkAdmin;

  if (getMember.length > 0) {
    checkAdmin = getMember[0].permission;
  }

  console.log(props.groupName);

  return (
    <>
      <Modal
        visible={editStatus}
        width="750"
        height="400"
        effect="fadeInDown"
        onClickAway={() => setEditStatus(false)}
      >
        <EditGroupModal
          onClickEdit={onClickEdit}
          onClickSave={onClickSave}
          setEditStatus={setEditStatus}
          handleGroupNameChange={handleGroupNameChange}
          groupName={props.groupName}
          editGroupName={props.editGroupName}
          getGroupName={getGroupName}
          groupPic={props.groupPic}
          id={id}
        />
      </Modal>
      <Modal
        visible={visible}
        width="750"
        height="550"
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
            <i className="material-icons">search</i>
          </SearchInputModalIcon>
        </SearchInputModalWrap>
        <UserList>
          {search &&
            props.users
              .filter(user => !membersEmail.includes(user.email))
              .map(user => {
                return (
                  <>
                    <UserName
                      onClick={() => {
                        addUser(id, user.user_id);
                        setTimeout(() => {
                          getGroupMembers(id);
                        }, 100);
                        setVisible(false);
                      }}
                    >
                      <UserItem>
                        {user.profile_img ? (
                          <SearchPic src={user.profile_img}></SearchPic>
                        ) : (
                          <i className="material-icons">person</i>
                        )}

                        {user.email}
                        <i className="material-icons add-icon">person_add</i>
                      </UserItem>
                    </UserName>
                  </>
                );
              })}
        </UserList>
      </Modal>
      <DMBarCont>
        <DMBarWrapper>
          <GroupLabel>
            {props.groupName}{" "}
            {checkAdmin ? (
              <button onClick={() => onClickEdit(props.groupName)}>
                <i class="material-icons">edit</i>
              </button>
            ) : null}
          </GroupLabel>

          <Label>Members</Label>
          {groupMembers.map((member, index) => {
            return (
              <PicNameCont key={index}>
                <PicNameOnlineCont
                  onClick={() => {
                    props.history.push(`/peep/dm/profile/${member.email}`);
                  }}
                >
                  {!member.profile_img ? (
                    <UserPic
                      src="https://res.cloudinary.com/john-personal-proj/image/upload/v1566234111/mello/dyx1e5pal1vn5nmqmzjs.png"
                      alt="default"
                    />
                  ) : (
                    <UserPic src={member.profile_img} alt="" />
                  )}
                  {member.online ? <Online /> : <Offline />}
                  <UserNickname>{member.nickname}</UserNickname>
                </PicNameOnlineCont>
                {checkAdmin && member.user_id !== props.user_id ? (
                  <UserEditRemove>
                    <button
                      onClick={() => {
                        removeMember(id, member.user_id);
                        setTimeout(() => {
                          getGroupMembers(id);
                        }, 75);
                      }}
                    >
                      <i class="material-icons">remove_circle</i>
                    </button>
                  </UserEditRemove>
                ) : null}
              </PicNameCont>
            );
          })}
        </DMBarWrapper>
        <AddUserCont>
          {checkAdmin ? (
            <AddUser onClick={() => setVisible(true)}>
              <i class="material-icons">person_add</i>
            </AddUser>
          ) : null}
        </AddUserCont>
        <UserBar>
          {props.profilePic ? (
            <UserPic src={props.profilePic} />
          ) : (
            <UserPic
              src="https://res.cloudinary.com/john-personal-proj/image/upload/v1566234111/mello/dyx1e5pal1vn5nmqmzjs.png"
              alt="default"
            />
          )}
          <UserNickname>{props.nickname}</UserNickname>
        </UserBar>
      </DMBarCont>
    </>
  );
};

function mapStateToProps(state) {
  return {
    groupMembers: state.groupReducer.groupMembers,
    nickname: state.authReducer.nickname,
    profilePic: state.authReducer.profilePic,
    users: state.userReducer.users,
    user_id: state.authReducer.user_id,
    groupName: state.groupReducer.groupName,
    editGroupName: state.groupReducer.editGroupName,
    groupPic: state.groupReducer.groupPic
  };
}

export default connect(
  mapStateToProps,
  {
    getGroupMembers,
    addUser,
    searchUser,
    editGroup,
    removeMember,
    getGroupName,
    populateGroupName,
    handleGroupNameChange
  }
)(GroupBar);

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
  border-bottom: none;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  left: 6rem;
  width: 100%;
  height: 80%;
  background-color: #f5f5f5;

  /* henry why */
  div + div > div > div {
    border-radius: 0 !important;
  }
`;

const GroupLabel = styled.div`
  font-size: 1.5rem;
  text-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  margin: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

const LabelInput = styled.input`
  padding: 1rem;
  border: none;
  background-color: white;
  font-size: 1rem;
  width: 80%;
`;

const Online = styled.div`
  width: 12px;
  height: 12px;
  border: solid 1px lightgray;
  background-color: #68d391;
  border-radius: 50% !important;
  margin-right: 0.5rem;
`;

const Offline = styled.div`
  width: 12px;
  height: 12px;
  border: solid 1px lightgray;
  background-color: gray;
  border-radius: 50% !important;
  margin-right: 0.5rem;
`;

const PicNameCont = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 8%;

  &:hover {
    transition: 200ms;
    background-color: lightgray;
  }

  button {
    display: hidden;
    border-radius: 50%;
    background-color: transparent;
    color: transparent;
    border: none;
    outline: none;
    text-align: center;
  }
  &:hover button {
    display: block;
    transition: 400ms;
    color: red;
    font-size: 1.3rem;
  }
`;

const PicNameOnlineCont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 75%;
  height: 100%;
`;

const UserEditRemove = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
`;

const UserPic = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  margin: 1rem;
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

const AddUserCont = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
`;

const AddUser = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.teal2};
  padding: 0.2rem;
  width: 5rem;
  border: none;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  border-radius: 5px;
  font-size: 2rem;

  &:hover {
    transition: 400ms;
    transform: scale(0.96);
    background-color: ${props => props.theme.teal1};
    color: white;
  }
`;
