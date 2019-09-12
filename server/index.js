require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const path = require("path"); // Usually moved to the start of file

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(`${__dirname}/../build`));

const AC = require("./controllers/auth_controller");
const FC = require("./controllers/friend_controller");
const UC = require("./controllers/user_controller");
const DC = require("./controllers/direct_chat_controller");
const GC = require("./controllers/group_chat_controller");

const AM = require("./middleware/auth.middleware");

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(express.json());

let database;

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    database = db;
    console.log("DB is certainly connected :)");
  })
  .catch(err => console.log(err));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

//auth
app.post("/auth/register", AC.registerUser);
app.post("/auth/login", AC.loginUser);
app.get("/auth/logout", AC.logoutUser);
app.get("/auth/user", AC.getUser);

//user
app.put("/api/user", UC.updatePic);
app.get("/api/users", UC.getAllUsers);
app.get("/api/users/search", UC.searchUsers);
app.put("/api/user/nickname", UC.updateNickname);
app.put("/api/user/online");

//friends
app.post("/api/friend/requests/:friendID", FC.friendRequest);
app.get("/api/friend/requests", FC.getFriendRequests);
app.get("/api/friend/requests/pending", FC.getPendingRequests);
app.post("/api/friends/:friendID", FC.addToFriendsList);
app.delete("/api/friends/:friendID", FC.removeFromFriendsList);
app.get("/api/friends", FC.getFriendsList);

//direct messages
app.get("/api/directMessages/:chat_id", DC.getDirectMessages);
app.put("/api/directMessages/:message_id", DC.updateMessage);
app.delete("/api/directMessage/:message_id", DC.deleteMessage);

//group messages
app.post("/api/group", GC.createGroup);
app.put("/api/group/:group_id", GC.editGroup);
app.get("/api/group/search", GC.searchGroup);
app.get("/api/user/groups", GC.getUserGroups);
app.get("/api/group/members/:group_id", GC.getGroupMembers);
app.post("/api/group/member/:group_id", GC.addUser);
app.post("/api/group/request/:group_id", GC.makeRequest);
app.get("/api/group/requests/pending", GC.getPendingGroupRequests);
app.get("/api/group/requests", GC.getGroupRequests);
app.post("/api/group/accept", GC.acceptRequest);
app.delete("/api/group/decline/:request_id", GC.declineRequest);
app.post("/api/group/remove", GC.removeMember);
app.get("/api/group/messages/:group_id", GC.getGroupMessages);
app.put("/api/group/message/:message_id", GC.editGroupMessage);
app.delete("/api/group/message/:message_id", GC.deleteGroupMessage);
app.delete("/api/group/:group_id", GC.deleteGroup);
app.get("/api/groupname/:group_id", GC.getGroupName);

io.on("connection", socket => {
  console.log("User connected");

  let user_id;
  let room;

  socket.on("login", data => {
    console.log(data.msg);
    user_id = data.user_id;
    if (user_id !== null || user_id !== undefined) {
      database.edit_online_status([user_id, true]);
    }
    setTimeout(() => {
      io.emit("refresh-friends");
    }, 250);
  });

  socket.on("dm-join", data => {
    const { chat_id } = data;
    //leave previous room
    socket.leave(room);
    room = `dm-${chat_id}`;
    socket.join(room);
  });

  socket.on("group-join", data => {
    const { group_id } = data;
    //leave previous room
    socket.leave(room);
    room = `gp-${group_id}`;
    socket.join(room);
  });

  socket.on("chat-message", async data => {
    const { message, chat_id, user_id, gif_url, img_url, video_url } = data;
    await database.add_direct_message([
      user_id,
      chat_id,
      message,
      gif_url,
      img_url,
      video_url
    ]);
    await io.to(room).emit("refresh-chat-message");
  });

  socket.on("refresh", () => {
    io.to(room).emit("refresh-chat-message");
  });

  socket.on("group-message", async data => {
    const { message, group_id, user_id, gif_url, img_url, video_url } = data;
    await database.add_group_message([
      user_id,
      group_id,
      message,
      gif_url,
      img_url,
      video_url
    ]);
    await io.to(room).emit("refresh-chat-message");
  });

  socket.on("logout", data => {
    console.log(data.msg);
    user_id = data.user_id;
    database.edit_online_status([user_id, false]);
    setTimeout(() => {
      io.emit("refresh-friends");
    }, 150);
  });

  socket.on("disconnect", () => {
    // console.log("User disconnected");
    if (user_id !== null || user_id !== undefined) {
      database.edit_online_status([user_id, false]);
    }
    setTimeout(() => {
      io.emit("refresh-friends");
    }, 150);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

http.listen(SERVER_PORT, () => {
  console.log(`Listening on Port ${SERVER_PORT}`);
});
