import axios from "axios";

const initialState = {
  user_id: null,
  email: "",
  nickname: "",
  profilePic: "",
  bio: "",
  loading: false
};

const GET_FRIENDS_INFO = "GET_FRIENDS_INFO";

export const getFriendsInfo = email => {
  return {
    type: GET_FRIENDS_INFO,
    payload: axios.get(`/api/users/search?email=${email}`)
  };
};

export function friendsReducer(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case `${GET_FRIENDS_INFO}_PENDING`:
      return { ...state, loading: true };
    case `${GET_FRIENDS_INFO}_FULFILLED`:
      const { user_id, email, nickname, profile_img, bio } = payload.data;
      return {
        ...state,
        loading: false,
        user_id: user_id,
        email: email,
        nickname: nickname,
        profilePic: profile_img,
        bio: bio
      };

    default:
      return state;
  }
}
