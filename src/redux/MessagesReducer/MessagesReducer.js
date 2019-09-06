import axios from "axios";

const initialState = {
  groupMessages: [],
  directMessages: [],
  loading: false
};

const GET_GROUP_MESSAGES = "GET_GROUP_MESSAGES";
const GET_DIRECT_MESSAGES = "GET_DIRECT_MESSAGES";
const ADD_DIRECT_MESSAGE = "ADD_DIRECT_MESSAGE";

export const getGroupMessages = () => {
  return {
    type: GET_GROUP_MESSAGES,
    payload: axios.get()
  };
};

export const getDirectMessages = chat_id => {
  return {
    type: GET_DIRECT_MESSAGES,
    payload: axios.get(`/api/directMessages/${chat_id}`)
  };
};

export const addDirectMessage = message => {
  return {
    type: ADD_DIRECT_MESSAGE,
    payload: message
  };
};

export function messagesReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${GET_GROUP_MESSAGES}_PENDING`:
      return { ...state, loading: true };
    case `${GET_GROUP_MESSAGES}_FULFILLED`:
      return { ...state, loading: false, groupMessages: payload.data };
    case `${GET_DIRECT_MESSAGES}_PENDING`:
      return { ...state, loading: true };
    case `${GET_DIRECT_MESSAGES}_FULFILLED`:
      return { ...state, loading: false, directMessages: payload.data };
    case ADD_DIRECT_MESSAGE:
      return {
        ...state,
        directMessages: [...state.directMessages, payload]
      };
    default:
      return state;
  }
}
