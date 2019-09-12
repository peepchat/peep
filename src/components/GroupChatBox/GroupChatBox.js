import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { socket } from "../Navbar/Navbar";
import { getGroupMessages } from "../../redux/GroupReducer/groupReducer";
import Message from "./Messages";
import { MdGif, MdMovie, MdImage } from "react-icons/md";
import Modal from "react-awesome-modal";
import axios from "axios";
import firebase from "firebase";
require("dotenv").config();

const storage = firebase.storage();
const imagesRef = storage.ref("images");
const videosRef = storage.ref("videos");

const giphyKey = process.env.REACT_APP_GIPHY_KEY;

const GroupChatBox = props => {
  const [msgInput, setMsgInput] = useState("");
  const [gifStatus, setGifStatus] = useState(false);
  const [gifInput, setGifInput] = useState("");
  const [gifs, setGifs] = useState([]);

  const { user_id, getGroupMessages, groupMessages } = props;

  const { group_id } = props.match.params;

  const messageEndRef = useRef(null);

  socket.emit("group-join", { group_id });

  const handleChange = event => {
    setMsgInput(event.target.value);
  };

  const handleGifSearch = event => {
    setGifInput(event.target.value);
  };

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  const handleImage = event => {
    const file = event.target.files[0];
    const uploadTask = imagesRef.child(file.name).put(file);
    console.log(uploadTask);
    uploadTask.then(() => {
      imagesRef
        .child(file.name)
        .getDownloadURL()
        .then(url => {
          console.log(url);
          socket.emit("group-message", { group_id, user_id, img_url: url });
          setTimeout(async () => {
            await getGroupMessages(group_id);
            await scrollToBottom();
          }, 100);
        });
    });
  };

  const handleVideo = event => {
    const file = event.target.files[0];
    const uploadTask = videosRef.child(file.name).put(file);
    uploadTask.then(() => {
      videosRef
        .child(file.name)
        .getDownloadURL()
        .then(url => {
          socket.emit("group-message", { group_id, user_id, video_url: url });
          setTimeout(async () => {
            await getGroupMessages(group_id);
            await scrollToBottom();
          }, 100);
        });
    });
  };

  const getMessages = () => {
    getGroupMessages(group_id);
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  useEffect(() => {
    socket.on("refresh-chat-message", () => {
      setTimeout(async () => {
        await setTimeout(() => {
          getGroupMessages(group_id);
        }, 75);
        await setTimeout(() => {
          scrollToBottom();
        }, 50);
      }, 25);
    });
    getGroupMessages(group_id);
    setTimeout(() => {
      scrollToBottom();
    }, 75);
  }, [getGroupMessages, group_id]);

  return (
    <ChatBoxWrapper>
      <Modal
        visible={gifStatus}
        width="750"
        height="300"
        effect="fadeInDown"
        onClickAway={() => setGifStatus(false)}
      >
        {gifs.length > 0 ? (
          <GIFSArray>
            {gifs.map(gif => {
              return (
                <img
                  src={gif.images.fixed_height.url}
                  alt={gif.title}
                  key={gif.id}
                  onClick={() => {
                    socket.emit("group-message", {
                      gif_url: gif.images.fixed_height.url,
                      group_id,
                      user_id
                    });
                    setGifStatus(false);
                    setGifs([]);
                    setGifInput("");
                    setTimeout(() => {
                      getMessages();
                    }, 50);
                  }}
                />
              );
            })}
          </GIFSArray>
        ) : null}
        <GIFForm
          onSubmit={event => {
            event.preventDefault();
            axios
              .get(
                `https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&q=${gifInput}&limit=20&offset=0&rating=PG-13&lang=en`
              )
              .then(res => {
                setGifs(res.data.data);
                console.log(res.data.data);
              })
              .catch(error => console.log(error));
          }}
        >
          <input
            type="text"
            value={gifInput}
            placeholder="Search GIPHY"
            onChange={handleGifSearch}
          />
          <button type="submit">Search</button>
        </GIFForm>
      </Modal>
      <ChatMessagesCont>
        {groupMessages.map((msg, index) => {
          return (
            <Message
              dm={msg}
              email={props.email}
              userPic={props.userPic}
              key={index}
              getMessages={getMessages}
            />
          );
        })}
        <div ref={messageEndRef}></div>
      </ChatMessagesCont>
      <ChatInputCont
        onSubmit={async event => {
          event.preventDefault();
          if (msgInput === "") {
            alert("Empty Message");
          } else {
            await socket.emit("group-message", {
              message: msgInput,
              group_id,
              user_id
            });
            await setMsgInput("");
            await setTimeout(() => {
              getMessages();
            }, 50);
          }
        }}
      >
        <ChatInput
          onChange={handleChange}
          value={msgInput}
          placeholder="Message..."
        />
        <button
          className="gifButton"
          type="button"
          onClick={() => {
            setGifStatus(true);
          }}
        >
          <MdGif />
        </button>
        <label className="imageButton">
          <MdImage />
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="fileInput"
          />
        </label>
        <label className="videoButton">
          <MdMovie />
          <input
            type="file"
            accept="video/*"
            onChange={handleVideo}
            className="fileInput"
          />
        </label>
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
    groupMessages: state.groupReducer.groupMessages,
    userPic: state.userReducer.profilePic
  };
}

export default connect(
  mapStateToProps,
  {
    getGroupMessages
  }
)(GroupChatBox);

export const GIFForm = styled.form`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 15px;

  input {
    width: 85%;
    padding: 1rem;
    border: none;
    border-bottom: solid 2px ${props => props.theme.teal2};
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
      0 2px 4px 0 rgba(14, 30, 37, 0.12);
    outline: none;
  }

  button {
    width: 15%;
    padding: 1rem;
    border: none;
    border-bottom: solid 2px ${props => props.theme.teal1};
    background-color: ${props => props.theme.teal1};
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
      0 2px 4px 0 rgba(14, 30, 37, 0.12);
  }
`;

export const GIFSArray = styled.div`
  width: 100%;
  height: auto;
  margin-top: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;

  img {
    cursor: pointer;
  }
`;

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

    .editIcon {
      display: flex;
      justify-content: flex-end;
      height: 100%;
      width: 50px;
      color: transparent;
      font-size: 1.3rem;
      background: transparent;
      outline: none;
      border: none;
    }
    &:hover .editIcon {
      border-radius: 10px;
      transition: 200ms;
      color: ${props => props.theme.teal3};
      transform: scale(1.01);
    }

    .editHover {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      margin-left: auto;
      height: 100%;
      color: transparent;
      font-size: 11px;
      background: transparent;

      .hiddenDiv {
        background: transparent;
        display: flex;
        flex-direction: row-reverse;

        width: 50%;
        height: 80%;
        .escButton {
          color: ${props => props.theme.teal2};
          background: transparent;
          outline: none;
          border: none;
          font-size: 1.3rem;
          &:hover {
            border-radius: 10px;
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
          font-size: 1.3rem;
          &:hover {
            border-radius: 10px;
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
          font-size: 1.3rem;
          &:hover {
            border-radius: 10px;
            background-color: hsl(0, 0%, 96%);
            transition: 300ms;
            transform: scale(0.97);
          }
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
      display: flex;
      flex-direction: column;
      min-width: 14rem;
      color: black !important;
      .messageEdit {
        .messageInput {
          border-radius: 4px;
          position: relative;
          background-color: rgba(255, 255, 255, 0.3);
          transition: 0.3s all;
          outline: none;
          &:hover {
            background-color: rgba(255, 255, 255, 0.45);
            box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
          }
        }
        .saveEdit {
          color: ${props => props.theme.teal1};
          background: transparent;
          outline: none;
          border: none;
          font-size: 1.3rem;
          &:hover {
            border-radius: 10px;
            transition: 300ms;
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

  .fileInput {
    display: none;
    visibility: hidden;
  }

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
