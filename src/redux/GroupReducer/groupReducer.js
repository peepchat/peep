import axios from "axios";

const initialState = {};

const CREATE_GROUP = "CREATE_GROUP";

export const createGroup = (group_name, group_img) => {
  axios.post("/api/group", { group_name, group_img });
  return {
    type: CREATE_GROUP
  };
};

export function groupReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
}
