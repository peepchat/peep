import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import promise from "redux-promise-middleware";
import { authReducer } from "./AuthReducer/AuthReducer";
import { userReducer } from "./UserReducer/userReducer";
import { friendsReducer } from "./FriendsReducer/friendsReducer";

const root = combineReducers({
  authReducer,
  userReducer,
  friendsReducer
});

export default createStore(root, applyMiddleware(promise));
