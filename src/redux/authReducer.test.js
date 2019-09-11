import {
  updateState,
  resetFields,
  loginUser,
  checkUserLoggedIn,
  logoutUser,
  getUserInfo,
  editNickname,
  populateNickname,
  handleNicknameChange
} from "./AuthReducer/AuthReducer";

import { getFriends } from "./FriendsReducer/friendsReducer";

describe("authReducer functions return corresponding action type", () => {
  test("updateState returns the right Type", () => {
    expect(updateState().type).toEqual("UPDATE_STATE");
  });
  test("resetFields returns the right Type", () => {
    expect(resetFields().type).toEqual("RESET_FIELDS");
  });
  test("loginUser returns the right Type", () => {
    expect(loginUser().type).toEqual("LOGIN_USER");
  });
  test("checkUserLoggedIn returns the right Type", () => {
    expect(checkUserLoggedIn().type).toEqual("CHECK_USER_LOGGED_IN");
  });
  test("logoutUser returns the right Type", () => {
    expect(logoutUser().type).toEqual("LOGOUT_USER");
  });
  test("getUserInfo returns the right Type", () => {
    expect(getUserInfo().type).toEqual("GET_USER_DATA");
  });
  test("editNickname returns the right Type", () => {
    expect(editNickname().type).toEqual("EDIT_NICKNAME");
  });
  test("populateNickname returns the right Type", () => {
    expect(populateNickname().type).toEqual("POPULATE_NICKNAME");
  });
  test("handleNicknameChange returns the right Type", () => {
    expect(handleNicknameChange().type).toEqual("HANDLE_NICKNAME");
  });
});

describe("friendsReducer functions return corresponding action type", () => {
  test("getFriends returns the right Type", () => {
    expect(getFriends().type).toEqual("GET_FRIENDS");
  });
});
