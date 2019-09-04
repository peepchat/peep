import React, { useState, useEffect } from "react";
import { socket } from "../Navbar/Navbar";

const ChatBox = props => {
  const [test, setTest] = useState("Chat Box");

  socket.on("testEvent", data => {
    setTest(data.msg);
  });

  return <div>{test}</div>;
};

export default ChatBox;
