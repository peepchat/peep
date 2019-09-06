import React, { useState, useEffect } from "react";
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
      {directMessages.map((dm, index) => {
        return (
          <div key={index}>
            <img src={dm.profile_img} alt="profile" />
            {dm.nickname} {dm.message} {moment(dm.date).calendar()}
          </div>
        );
      })}
      <ChatMessagesCont>
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
            placeholder="bitch"
          />
          <ChatSubmit type="submit">Send</ChatSubmit>
        </ChatInputCont>
      </ChatMessagesCont>
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
`;

const ChatMessagesCont = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatInputCont = styled.form`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatInput = styled.input`
  width: 80%;
  height: 100%;
  padding: 1rem;
`;

const ChatSubmit = styled.button`
  width: 20%;
  height: 100%;
  padding: 1rem;
`;
