import axios from "axios";

const initialState = {
  loading: false,
  searchGroups: [],
  groups: [],
  groupMembers: [],
  groupPending: [],
  groupRequests: [],
  groupMessages: []
};

const CREATE_GROUP = "CREATE_GROUP";
const EDIT_GROUP = "EDIT_GROUP";
const SEARCH_GROUPS = "SEARCH_GROUPS";
const GET_GROUPS = "GET_GROUPS";
const GET_GROUP_MEMBERS = "GET_GROUP_MEMBERS";
const ADD_USER = "ADD_USER";
const MAKE_REQUEST = "MAKE_REQUEST";
const GET_PENDING_REQUESTS = "GET_PENDING_REQUESTS";
const GET_GROUP_REQUESTS = "GET_GROUP_REQUESTS";
const ACCEPT_REQUEST = "ACCEPT_REQUEST";
const DECLINE_REQUEST = "DECLINE_REQUEST";
const REMOVE_MEMBER = "REMOVE_MEMBER";
const GET_GROUP_MESSAGES = "GET_GROUP_MESSAGES";
const EDIT_GROUP_MESSAGE = "EDIT_GROUP_MESSAGE";
const DELETE_GROUP_MESSAGE = "DELETE_GROUP_MESSAGE";
const DELETE_GROUP = "DELETE_GROUP";

export const createGroup = (group_name, group_img) => {
  axios.post("/api/group", { group_name, group_img });
  return {
    type: CREATE_GROUP
  };
};

export const editGroup = (group_id, group_name, group_img) => {
  axios.post(`/api/group/${group_id}`, { group_name, group_img });
  return {
    type: EDIT_GROUP
  };
};

export const searchGroup = group_name => {
  return {
    type: SEARCH_GROUPS,
    payload: axios.get(`/api/group/search?group=${group_name}`)
  };
};

export const getGroups = () => {
  return {
    type: GET_GROUPS,
    payload: axios.get("/api/user/groups")
  };
};

export const getGroupMembers = group_id => {
  return {
    type: GET_GROUP_MEMBERS,
    payload: axios.get(`/api/group/members/${group_id}`)
  };
};

export const addUser = (group_id, user_id) => {
  axios.post(`/api/group/member/${group_id}`, { user_id });
  return {
    type: ADD_USER
  };
};

export const makeRequest = group_id => {
  axios.post(`/api/group/request/${group_id}`);
  return {
    type: MAKE_REQUEST
  };
};

export const getGroupPending = () => {
  return {
    type: GET_PENDING_REQUESTS,
    payload: axios.get("/api/group/requests/pending")
  };
};

export const getGroupRequests = () => {
  return {
    type: GET_GROUP_REQUESTS,
    payload: axios.get(`/api/group/requests`)
  };
};

export const acceptRequest = (request_id, user_id, group_id) => {
  axios.post("/api/group/accept/", { request_id, user_id, group_id });
  return {
    type: ACCEPT_REQUEST
  };
};

export const declineRequest = request_id => {
  axios.delete(`/api/group/decline/${request_id}`);
  return {
    type: DECLINE_REQUEST
  };
};

export const removeMember = (group_id, user_id) => {
  axios.post(`/api/group/remove`, { user_id, group_id });
  return {
    type: REMOVE_MEMBER
  };
};

export const getGroupMessages = group_id => {
  return {
    type: GET_GROUP_MESSAGES,
    payload: axios.get(`/api/group/messages/${group_id}`)
  };
};

export const editGroupMessage = (message_id, message) => {
  axios.put(`/api/group/message/${message_id}`, { message });
  return {
    type: EDIT_GROUP_MESSAGE
  };
};

export const deleteGroupMessage = message_id => {
  axios.delete(`/api/group/message/${message_id}`);
  return {
    type: DELETE_GROUP_MESSAGE
  };
};

export const deleteGroup = group_id => {
  axios.delete(`/api/group/${group_id}`);
  return {
    type: DELETE_GROUP
  };
};

export function groupReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_GROUPS:
      return { ...state, searchGroups: payload.data };
    case `${GET_GROUPS}_PENDING`:
      return { ...state, loading: true };
    case `${GET_GROUPS}_FULFILLED`:
      return { ...state, loading: false, groups: payload.data };
    case `${GET_GROUP_MEMBERS}_FULFILLED`:
      return { ...state, loading: false, groupMembers: payload.data };
    case `${GET_PENDING_REQUESTS}_FULFILLED`:
      return { ...state, loading: false, groupPending: payload.data };
    case `${GET_GROUP_REQUESTS}_FULFILLED`:
      return { ...state, loading: false, groupRequests: payload.data };
    case `${GET_GROUP_MESSAGES}_PENDING`:
      return { ...state, loading: true };
    case `${GET_GROUP_MESSAGES}_FULFILLED`:
      return { ...state, loading: false, groupMessages: payload.data };
    case `${SEARCH_GROUPS}_FULFILLED`:
      return { ...state, loading: false, searchGroups: payload.data };
    default:
      return state;
  }
}
