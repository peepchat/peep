import axios from "axios";

const initialState = {
  imgArr: [],
  profile_img: ""
};

const UPLOAD_PIC = "UPLOAD_PIC";

export const uploadPic = profile_img => {
  return {
    type: UPLOAD_PIC,
    payload: axios.put("/api/user/", { profile_img })
  };
};

export function pictureReducer(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case UPLOAD_PIC:
      return { ...state, profile_img: payload };

    default:
      return state;
  }
}
