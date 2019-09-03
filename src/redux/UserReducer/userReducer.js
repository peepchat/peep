import axios from "axios";

const initialState = {
  imgArr: [],
  profile_img: "",
  users: [],
  user_id: null,
  email: "",
  nickname: "",
  bio: "",
  profilePic: ""
};

const UPLOAD_PIC = "UPLOAD_PIC";
const SEARCH_USER = "SEARCH_USER";
const GET_FRIENDS_DATA = "GET_FRIENDS_DATA";

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

export const getFriendsData = email => {
  return {
    type: GET_FRIENDS_DATA,
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
    case `${GET_FRIENDS_DATA}_PENDING`:
      return { ...state, loading: true };
    case `${GET_FRIENDS_DATA}_FULFILLED`:
      // console.log(payload.data);
      const { user_id, email, nickname, bio, profile_img } = payload.data[0];
      return {
        ...state,
        loading: false,
        user_id,
        email,
        nickname,
        bio,
        profilePic: profile_img
      };

    default:
      return state;
  }
}
