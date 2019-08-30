import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import promise from "redux-promise-middleware";
import { authReducer } from "./AuthReducer/AuthReducer";

const root = combineReducers({
  authReducer
});

export default createStore(root, compose(applyMiddleware(promise)));
