import axios from "axios";

const initialState = {
  user_id: null,
  email: "",
  password: "",
  nickname: "",
  profilePic: "",
  bio: "",
  loading: false,
  user: {},
  editNickname: "",
  editBio: ""
};

const UPDATE_STATE = "UPDATE_STATE";
const RESET_FIELDS = "RESET_FIELDS";
const LOGIN_USER = "LOGIN_USER";
const CHECK_USER_LOGGED_IN = "CHECK_USER_LOGGED_IN";
const LOGOUT_USER = "LOGOUT_USER";
const GET_USER_DATA = "GET_USER_DATA";
const POPULATE_NICKNAME = "POPULATE_NICKNAME";
const EDIT_NICKNAME = "EDIT_NICKNAME";
const HANDLE_NICKNAME = "HANDLE_NICKNAME";

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

export const getUserInfo = () => {
  return {
    type: GET_USER_DATA,
    payload: axios.get(`/auth/user/`)
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

export const editNickname = nickname => {
  return {
    type: EDIT_NICKNAME,
    payload: axios.put(`/api/user/nickname`, { nickname })
  };
};

export const populateNickname = nickname => {
  return {
    type: POPULATE_NICKNAME,
    payload: nickname
  };
};

export const handleNicknameChange = nickname => {
  return {
    type: HANDLE_NICKNAME,
    payload: nickname
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
      // console.log(payload.data);
      return { ...state, loading: false, user: payload.data };
    case `${CHECK_USER_LOGGED_IN}_PENDING`:
      return { ...state, loading: true };
    case `${CHECK_USER_LOGGED_IN}_FULFILLED`:
      return { ...state, loading: false, user: payload.data };
    case `${LOGOUT_USER}_PENDING`:
      return { ...state, loading: true };
    case `${LOGOUT_USER}_FULFILLED`:
      return { ...state, loading: false, user: {} };
    case `${GET_USER_DATA}_PENDING`:
      return { ...state, loading: true };
    case `${GET_USER_DATA}_FULFILLED`:
      // console.log(payload.data);
      const { user_id, email, nickname, profilePic, bio } = payload.data;
      return {
        ...state,
        loading: false,
        user_id,
        email,
        nickname,
        profilePic,
        bio
      };
    case `${EDIT_NICKNAME}_PENDING`:
      return { ...state, loading: true };
    case `${EDIT_NICKNAME}_FULFILLED`:
      return { ...state, loading: false };
    case POPULATE_NICKNAME:
      return { ...state, editNickname: payload };
    case HANDLE_NICKNAME:
      return { ...state, handleNicknameChange: payload };
    default:
      return state;
  }
}
