import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import promise from "redux-promise-middleware";
import { authReducer } from "./AuthReducer/AuthReducer";
import { userReducer } from "./UserReducer/userReducer";
import { friendsReducer } from "./FriendsReducer/friendsReducer";
import { messagesReducer } from "./MessagesReducer/MessagesReducer";

const root = combineReducers({
  authReducer,
  userReducer,
  friendsReducer,
  messagesReducer
});

export default createStore(root, applyMiddleware(promise));
