import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import {
  FaEllipsisV,
  FaRegWindowClose,
  FaEllipsisH,
  FaCheck,
  FaRegEdit
} from "react-icons/fa";
import {
  editDirectMessage,
  populateMessage,
  handleMessageChange,
  deleteDirectMessage,
  getDirectMessages,
  getGroupMessages
} from "../../redux/MessagesReducer/MessagesReducer";

const Messages = props => {
  const [messageToggle, setMessageToggle] = useState(false);
  const [editStatus, setEditstatus] = useState(false);

  const openMessageToggle = () => {
    setMessageToggle(true);
  };
  const closeMessageToggle = () => {
    setMessageToggle(false);
  };

  const onClickEdit = message => {
    setEditstatus(true);
    props.populateMessage(props.dm.message);
  };
  const onClickSave = () => {
    setEditstatus(false);
    setMessageToggle(false)
    props.editDirectMessage(props.dm.message_id, props.edit_Message);
    setTimeout(() => {
      getDirectMessages(props.dm.chat_id);
    }, 75)
  };
  const handleMessageChange = event => {
    props.handleMessageChange(event.target.value);
  };
  return (
    <div className="keyContainer" key={props.index}>
      <div className="imgCont">
        {!props.dm.profile_img ? (
          <img
            className="defaultPic"
            src="https://res.cloudinary.com/john-personal-proj/image/upload/v1566234111/mello/dyx1e5pal1vn5nmqmzjs.png"
            alt="noprofile"
          />
        ) : (
          <img className="avatar" src={props.dm.profile_img} alt="profile" />
        )}
      </div>
      <div className="messageCont">
        <span className="messageHeader">
          <div className="nicknameCont">
            {props.dm.nickname}
            <div className="dateCont">{moment(props.dm.date).calendar()}</div>
          </div>
        </span>
        {editStatus === true ? (
          <div className="messageEdit">
            <input
              className="messageInput"
              onChange={handleMessageChange}
              value={props.edit_Message}
              type="text"
            ></input>
            <button onClick={onClickSave} className="saveEdit">
              <FaCheck />
            </button>
          </div>
        ) : (
          <p className="messageText">{props.dm.message} </p>
        )}
      </div>
      {props.email === props.dm.email ? (
        <div className="editHover">
          <button className="editIcon" onClick={openMessageToggle}>
            <FaEllipsisV />
          </button>
          {messageToggle === true ? (
            <div className="hiddenDiv">
              <button onClick={closeMessageToggle} className="escButton">
                <FaEllipsisH />
              </button>

              <button
                onClick={() => onClickEdit(props.dm.message)}
                className="hiddenEdit"
              >
                <FaRegEdit />
              </button>

              <button onClick={() => {
                      props.deleteDirectMessage(props.dm.index);
                      
                    }} className="hiddenDelete">
                <FaRegWindowClose />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
function mapStateToProps(state) {
  return {
   edit_Message:state.messagesReducer.edit_Message,
  };
}

export default connect(
 mapStateToProps,
  {
    editDirectMessage,
    populateMessage,
    handleMessageChange,
    deleteDirectMessage
  }
)(Messages);

export const ChatMessagesCont = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  position: absolute;
  overflow-y: auto;
  overflow-x: none;
  top: 0;
  .keyContainer {
    opacity: 1;
    transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: 100%;
    display: flex;
    position: relative;
    box-sizing: border-box;
    text-align: left;
    align-items: center;
    justify-content: flex-start;
    text-decoration: none;
    padding: 1em !important;
    color: black;
    white-space: pre-line;
    overflow-wrap: break-word;
    .editHover {
      display: flex;
      justify-content: flex-end;

      width: 50%;
      height: 100%;
      color: transparent;
      font-size: 11px;
      background: transparent;

      .hiddenDiv {
        color: black;
        background: transparent;
        display: flex;
        flex-direction: column;
        .escButton {
          color: ${props => props.theme.teal2};
          background: transparent;
          outline: none;
          border: none;
        }
        .hiddenEdit {
          color: ${props => props.theme.teal1};
          background: transparent;
          outline: none;
          border: none;
        }
        .hiddenDelete {
          color: red;
          background: transparent;
          outline: none;
          border: none;
        }
      }
      .editIcon {
        display: flex;
        justify-content: flex-end;
        height: 100%;
        width: 50%;
        color: transparent;
        font-size: 11px;
        background: transparent;
        outline: none;
        border: none;
        &:hover {
          transition: 200ms;
          color: ${props => props.theme.teal3};
          transform: scale(1.01);
        }
      }
    }
    .imgCont {
      width: 40px;
      height: 40px;
      display: flex;
      overflow: hidden;
      position: relative;
      font-size: 1.25rem;
      align-items: center;
      flex-shrink: 0;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      user-select: none;
      border-radius: 50%;
      justify-content: center;
      margin-right: 0.7rem;
      .defaultPic {
        height: 48px;
        font-size: 1.25rem;
        user-select: none;
      }
      .avatar {
        height: 48px;
        font-size: 1.25rem;
        user-select: none;
      }
    }
    .messageCont {
      margin-top: 6px;
      margin-bottom: 6px;
      flex: 1 1 auto;
      min-width: 0;
      color: black !important;
      .messageEdit {
        .messageInput {
        }
        .saveEdit {
          color: ${props => props.theme.teal1};
          background: transparent;
          outline: none;
          border: none;
        }
      }

      .messageText {
        font-size: 0.875rem;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        font-weight: 500;
        line-height: 1.43;
        letter-spacing: 0.01071em;
        color: black;
      }
      .messageHeader {
        font-size: 1rem;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        font-weight: 500;
        line-height: 1.5;
        letter-spacing: 0.00938em;
        margin: 0;

        .nicknameCont {
          font-size: 1rem;
          font-family: "Roboto", "Helvetica", "Arial", sans-serif;
          font-weight: 500;
          line-height: 1.5;
          letter-spacing: 0.00938em;
          display: inline;
          .dateCont {
            display: inline;
            color: grey;
            font-size: 13px;
            padding-left: 4px;
          }
        }
      }
    }
  }
`;
