import axios from "axios";

const initialState = {
  email: "",
  password: "",
  nickname: "",
  loading: false,
  user: {}
};

const UPDATE_STATE = "UPDATE_STATE";
const RESET_FIELDS = "RESET_FIELDS";
const LOGIN_USER = "LOGIN_USER";
const CHECK_USER_LOGGED_IN = "CHECK_USER_LOGGED_IN";
const LOGOUT_USER = "LOGOUT_USER";

export const updateState = event => {
  return {
    type: UPDATE_STATE,
    payload: event
  };
};

export const checkUserLoggedIn = () => {
  return {
    type: CHECK_USER_LOGGED_IN,
    payload: axios.get("/auth/user")
  };
};

export const loginUser = (email, password) => {
  return {
    type: LOGIN_USER,
    payload: axios.post("/auth/login", {
      email: email,
      password: password
    })
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
    payload: axios.get("/auth/logout")
  };
};

export const resetFields = () => {
  return {
    type: RESET_FIELDS
  };
};

export function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_STATE:
      return { ...state, ...payload };
    case RESET_FIELDS:
      return { ...state, ...payload };
    case `${LOGIN_USER}_PENDING`:
      return { ...state, loading: true };
    case `${LOGIN_USER}_FULFILLED`:
      return { ...state, loading: false, user: payload.data };
    case `${CHECK_USER_LOGGED_IN}_PENDING`:
      return { ...state, loading: true };
    case `${CHECK_USER_LOGGED_IN}_FULFILLED`:
      return { ...state, loading: false, user: payload.data };
    case `${LOGOUT_USER}_PENDING`:
      return { ...state, loading: true };
    case `${LOGIN_USER}_FULFILLED`:
      return { ...state, loading: false, user: {} };
    default:
      return state;
  }
}
