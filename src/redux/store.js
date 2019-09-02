import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import promise from "redux-promise-middleware";
import { authReducer } from "./AuthReducer/AuthReducer";
import { userReducer } from "./UserReducer/userReducer";

const root = combineReducers({
  authReducer,
  userReducer
});

export default createStore(root, compose(applyMiddleware(promise)));
