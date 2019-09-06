import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { socket } from "../Navbar/Navbar";
import {
  getDirectMessages,
  addDirectMessage
} from "../../redux/MessagesReducer/MessagesReducer";
import moment from "moment";

const ChatBox = props => {
  const [msgInput, setMsgInput] = useState("");

  const { user_id, getDirectMessages, directMessages } = props;

  const { chat_id } = props.match.params;

  // const messagesEndRef = useRef(null)
  
  // const scrollToBottom = () => {
  //   messagesEndRef.current.scrollIntoView({behavior: "smooth"})
  // }
  // useEffect(scrollToBottom, [directMessages])

  socket.emit("dm-join", { chat_id });

  const handleChange = event => {
    setMsgInput(event.target.value);
  };

  // console.log(socket);

  useEffect(() => {
    socket.on("refresh-chat-message", () => {
      setTimeout(() => {
        getDirectMessages(chat_id);
      }, 65);
    });
    getDirectMessages(chat_id);
  }, [getDirectMessages, chat_id]);

  console.log(directMessages);

  return (
    <ChatBoxWrapper>
      <ChatMessagesCont>
        {directMessages.map((dm, index) => {
          return (
            <div className="keyContainer" key={index}>
              <img src={dm.profile_img} alt="profile" />
              {dm.nickname} {dm.message} {moment(dm.date).calendar()}
              {/* <div ref={this.messagesEndRef}/> */}
            </div>
           
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
        <button className="mediaButton">M</button>
        <ChatInput
          onChange={handleChange}
          value={msgInput}
          placeholder="bitch"
        />
        <button className="gifButton">G</button>
        {/* <ChatSubmit type="submit">Send</ChatSubmit> */}
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
    directMessages: state.messagesReducer.directMessages
  };
}

export default connect(
  mapStateToProps,
  { getDirectMessages, addDirectMessage }
)(ChatBox);

const ChatBoxWrapper = styled.div`
  height: 100%;
  width: 100%;
  margin-left: 26rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  overflow-y: scroll;
  flex: 1 1 auto;
  outline: 0;
`;

const ChatMessagesCont = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ChatInputCont = styled.form`
  width: 72%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: hsl(0, 0%, 93%);
  .mediaButton {
    color: #fff;
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
    cursor: pointer;
  }
  .gifButton {
    color: #fff;
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
    cursor: pointer;
  }
`;

const ChatInput = styled.input`
  width: 80%;
  height: 20%;
  padding: 20px;
  border-radius: 20px;
  border-color: teal;
  outline: none;
`;

const ChatSubmit = styled.button`
  color: #fff;
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
  cursor: pointer;
`;

const MapDiv = styled.div``;
