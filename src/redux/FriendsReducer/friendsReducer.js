import axios from "axios";

const initialState = {
  loading: false,
  loadingFriends: false,
  loadingPending: false,
  loadingRequests: false,
  friends: [],
  requests: [],
  pending: []
};

const GET_FRIENDS = "GET_FRIENDS";
const MAKE_FRIEND_REQUEST = "MAKE_FRIEND_REQUEST";
const GET_FRIEND_REQUESTS = "GET_FRIEND_REQUESTS";
const GET_PENDING_REQUESTS = "GET_PENDING_REQUESTS";
const ADD_FRIEND = "ADD_FRIEND";
const DELETE_FRIEND = "DELETE_FRIEND";

export const getFriends = () => {
  return {
    type: GET_FRIENDS,
    payload: axios.get("/api/friends")
  };
};

export const makeFriendRequest = friendID => {
  axios.post(`/api/friend/requests/${friendID}`);
  return {
    type: MAKE_FRIEND_REQUEST
  };
};

export const getRequests = () => {
  return {
    type: GET_FRIEND_REQUESTS,
    payload: axios.get("/api/friend/requests")
  };
};

export const getPending = () => {
  return {
    type: GET_PENDING_REQUESTS,
    payload: axios.get("/api/friend/requests/pending")
  };
};

export const addFriend = (friendID, request_id) => {
  axios.post(`/api/friends/${friendID}`, { request_id });
  return {
    type: ADD_FRIEND
  };
};

export const deleteFriend = (friendID, requestID) => {
  axios.delete(`/api/friends/${friendID}`, { requestID });
  return {
    type: DELETE_FRIEND
  };
};

export function friendsReducer(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case `${GET_FRIENDS}_PENDING`:
      return { ...state, loadingFriends: true };
    case `${GET_FRIENDS}_FULFILLED`:
      return { ...state, loadingFriends: false, friends: payload.data };
    case `${GET_FRIEND_REQUESTS}_PENDING`:
      return { ...state, loadingRequests: true };
    case `${GET_FRIEND_REQUESTS}_FULFILLED`:
      return { ...state, loadingRequests: false, requests: payload.data };
    case `${GET_PENDING_REQUESTS}_PENDING`:
      return { ...state, loadingPending: true };
    case `${GET_PENDING_REQUESTS}_FULFILLED`:
      return { ...state, loadingPending: false, pending: payload.data };
    case `${MAKE_FRIEND_REQUEST}_PENDING`:
      return { ...state, loading: true };
    case `${MAKE_FRIEND_REQUEST}_FULFILLED`:
      return { ...state, loading: false };
    case `${ADD_FRIEND}_PENDING`:
      return { ...state, loading: true };
    case `${ADD_FRIEND}_FULFILLED`:
      return { ...state, loading: false };
    case `${DELETE_FRIEND}_PENDING`:
      return { ...state, loading: true };
    case `${DELETE_FRIEND}_FULFILLED`:
      return { ...state, loading: false };
    default:
      return state;
  }
}
