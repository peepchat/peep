import axios from "axios";

const initialState = {
  groupMessages: [],
  directMessages: [],
  loading: false,
  edit_Message: ""
};

const GET_GROUP_MESSAGES = "GET_GROUP_MESSAGES";
const GET_DIRECT_MESSAGES = "GET_DIRECT_MESSAGES";
const ADD_DIRECT_MESSAGE = "ADD_DIRECT_MESSAGE";
const EDIT_DIRECT_MESSAGE = "EDIT_DIRECT_MESSAGE";
const POPULATE_MESSAGE = "POPULATE_MESSAGE";
const HANDLE_MESSAGE = "HANDLE_MESSAGE";
const DELETE_DIRECT_MESSAGE = "DELETE_DIRECT_MESSAGE";

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
export const editDirectMessage = (message_id, message) => {
  axios.put(`/api/directMessages/${message_id}`, { message });
  return {
    type: EDIT_DIRECT_MESSAGE
  };
};
export const populateMessage = message => {
  return {
    type: POPULATE_MESSAGE,
    payload: message
  };
};
export const handleMessageChange = message => {
  return {
    type: POPULATE_MESSAGE,
    payload: message
  };
};
export const deleteDirectMessage = message_id => {
  axios.delete(`/api/directMessage/${message_id}`);
  return {
    type: DELETE_DIRECT_MESSAGE
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
    case `${EDIT_DIRECT_MESSAGE}_PENDING`:
      return { ...state, loading: true };
    case `${EDIT_DIRECT_MESSAGE}_FULFILLED`:
      return { ...state, loading: false };
    case POPULATE_MESSAGE:
      return { ...state, edit_Message: payload };
    case HANDLE_MESSAGE:
      return { ...state, edit_Message: payload };
    default:
      return state;
  }
}
