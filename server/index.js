require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const app = express();
const AC = require("./controllers/auth_controller");
const FC = require("./controllers/friend_controller");

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

app.post("/auth/register", AC.registerUser);
app.post("/auth/login", AC.loginUser);
app.get("/auth/logout", AC.logoutUser);
app.get("/auth/user", AC.getUser);

app.post("/api/friend/requests/:friendID", FC.friendRequest);
app.get("/api/friend/requests", FC.getFriendRequests);
app.get("/api/friend/requests/pending", FC.getPendingRequests);
app.post("/api/friends/:friendID", FC.addToFriendsList);
app.delete("/api/friends/:friendID", FC.removeFromFriendsList);
app.get("/api/friends", FC.getFriendsList);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on Port ${SERVER_PORT}`);
});
