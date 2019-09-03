import axios from "axios";

const initialState = {
  imgArr: [],
  profile_img: "",
  users: []
};

const UPLOAD_PIC = "UPLOAD_PIC";
const SEARCH_USER = "SEARCH_USER";
const GET_USER_INFO = "GET_USER_INFO";

export const uploadPic = profile_img => {
  return {
    type: UPLOAD_PIC,
    payload: axios.put("/api/user/", { profile_img })
  };
};

export const searchUser = email => {
  return {
    type: SEARCH_USER,
    payload: axios.get(`/api/users/search?email=${email}`)
  };
};

export function userReducer(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case UPLOAD_PIC:
      return { ...state, profile_img: payload };
    case `${SEARCH_USER}_PENDING`:
      return { ...state, loading: true };
    case `${SEARCH_USER}_FULFILLED`:
      return { ...state, loading: false, users: payload.data };

    default:
      return state;
  }
}
