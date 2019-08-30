import axios from "axios";

const initialState = {
  email: "",
  password: "",
  nickname: ""
};

const UPDATE_STATE = "UPDATE_STATE";
const RESET_FIELD = "RESET_FIELDS";
const LOGIN_USER = "LOGIN_USER";
const CHECK_USER_LOGGED_IN = "CHECK_USER_LOGGED_IN";
const LOGOUT_USER = "LOGOUT_USER";
