require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const app = express();
const AC = require("./controllers/auth_controller");
const FC = require("./controllers/friend_controller");
const UC = require("./controllers/user_controller");
const DC = require("./controllers/direct_chat_controller");

const AM = require("./middleware/auth.middleware");

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(express.json());

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
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

app.listen(SERVER_PORT, () => {
  console.log(`Listening on Port ${SERVER_PORT}`);
});
