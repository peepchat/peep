import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { socket } from "../Navbar/Navbar";
import {
  getDirectMessages,
  addDirectMessage,
  populateMessage,
  handleMessageChange,
  deleteDirectMessage,
  editDirectMessage
} from "../../redux/MessagesReducer/MessagesReducer";
import moment from "moment";
import { FaPlusCircle, FaRegSmile } from "react-icons/fa";
import DMPosts from "./Messages";
import { MdGif, MdMovie, MdImage } from "react-icons/md";

const ChatBox = props => {
  const [msgInput, setMsgInput] = useState("");

  const { user_id, getDirectMessages, directMessages } = props;

  const { chat_id } = props.match.params;

  socket.emit("dm-join", { chat_id });

  const handleChange = event => {
    setMsgInput(event.target.value);
  };

  let messageContainerBottomRef = document.getElementById(
    "messagesContainerBottom"
  );
  let messageContainerRef = document.getElementById("messagesContainer");
  // console.log(socket);

  useEffect(() => {
    socket.on("refresh-chat-message", () => {
      setTimeout(() => {
        getDirectMessages(chat_id);
      }, 65);
    });
    getDirectMessages(chat_id);
    if (messageContainerBottomRef && messageContainerRef) {
      if (getDirectMessages) {
        messageContainerRef.scroll(0, 60);
      } else {
        messageContainerBottomRef.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [
    getDirectMessages,
    chat_id,
    messageContainerRef,
    messageContainerBottomRef
  ]);

  // console.log(directMessages);

  return (
    <ChatBoxWrapper>
      <ChatMessagesCont>
        {directMessages.map((dm, index) => {
          return (
            <DMPosts
              dm={dm}
              index={index}
              email={props.email}
              userPic={props.userPic}
            />
          );
        })}
      </ChatMessagesCont>

      <ChatInputCont
        onSubmit={async event => {
          event.preventDefault();
          if (msgInput === "") {
            alert("Empty Message");
          } else {
            await socket.emit("chat-message", {
              message: msgInput,
              chat_id,
              user_id
            });
            await setMsgInput("");
            await setTimeout(() => {
              getDirectMessages(chat_id);
            }, 75);
          }
        }}
      >
        <ChatInput
          onChange={handleChange}
          value={msgInput}
          placeholder="Message..."
        />
        <button className="gifButton">
          <MdGif />
        </button>
        <button className="imageButton">
          <MdImage />
        </button>
        <button className="videoButton">
          <MdMovie />
        </button>
      </ChatInputCont>
    </ChatBoxWrapper>
  );
};

function mapStateToProps(state) {
  return {
    user_id: state.authReducer.user_id,
    email: state.authReducer.email,
    nickname: state.authReducer.nickname,
    profilePic: state.authReducer.profilePic,
    directMessages: state.messagesReducer.directMessages,
    userPic: state.userReducer.profilePic
  };
}

export default connect(
  mapStateToProps,
  {
    getDirectMessages,
    addDirectMessage,
    editDirectMessage,
    populateMessage,
    handleMessageChange,
    deleteDirectMessage
  }
)(ChatBox);

export const ChatBoxWrapper = styled.div`
  height: 100%;
  width: 100%;
  margin-left: 26rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  outline: 0;
`;

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
          &:hover {
            transition: 300ms;
            background-color: ${props => props.theme.teal1};
            transform: scale(0.97);
          }
        }
        .hiddenEdit {
          color: ${props => props.theme.teal1};
          background: transparent;
          outline: none;
          border: none;
          &:hover {
            transition: 300ms;
            background-color: ${props => props.theme.teal3};
            transform: scale(0.97);
          }
        }
        .hiddenDelete {
          color: red;
          background: transparent;
          outline: none;
          border: none;
          &:hover {
            transition: 300ms;
            transform: scale(0.97);
          }
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
          &:hover {
            transition: 400ms;
            background-color: ${props => props.theme.teal3};
            transform: scale(0.97);
          }
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

export const ChatInputCont = styled.form`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsl(0, 0%, 96%);
  border-radius: 5px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  .imageButton {
    background-color: ${props => props.theme.teal1};
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
    padding: 2px 10px;
    position: relative;
    font-family: "Signika", sans-serif;
    outline: none;
    cursor: pointer;
    &:hover {
      transition: 400ms;
      background-color: ${props => props.theme.teal3};
      transform: scale(0.97);
    }
  }
  .videoButton {
    background-color: ${props => props.theme.teal1};
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
    padding: 2px 10px;
    position: relative;
    font-family: "Signika", sans-serif;
    outline: none;
    cursor: pointer;
    &:hover {
      transition: 400ms;
      background-color: ${props => props.theme.teal3};
      transform: scale(0.97);
    }
  }
  .gifButton {
    background-color: ${props => props.theme.teal1};
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
    padding: 2px 10px;
    position: relative;
    font-family: "Signika", sans-serif;
    outline: none;
    cursor: pointer;
    &:hover {
      transition: 400ms;
      background-color: ${props => props.theme.teal3};
      transform: scale(0.97);
    }
  }
`;

export const ChatInput = styled.input`
  width: 80%;
  height: 20%;
  padding: 21px;
  border-radius: 20px;
  border-color: ${props => props.theme.teal3};
  outline: none;
`;

// const ChatSubmit = styled.button`
//   color: #fff;
//   width: 3rem;
//   height: 2rem;
//   transition: background-color 0.17s ease, color 0.17s ease;
//   box-sizing: border-box;
//   background: transparent;
//   border: none;
//   border-radius: 3px;
//   font-size: 25px;
//   font-weight: 500;
//   line-height: 16px;
//   padding: 2px 10px;
//   position: relative;
//   font-family: "Signika", sans-serif;
//   cursor: pointer;
// `;
