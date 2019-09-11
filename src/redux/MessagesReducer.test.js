import {
  editDirectMessage,
  populateMessage,
  handleMessageChange,
  deleteDirectMessage,
  addDirectMessage
} from "./MessagesReducer/MessagesReducer";

describe("MessagesReducer functions will return the corresponding action type", () => {
  test("editDirectMessage returns the correct type", () => {
    expect(editDirectMessage().type).toEqual("EDIT_DIRECT_MESSAGE");
  });
  test("populateMessage returns the correct type", () => {
    expect(populateMessage().type).toEqual("POPULATE_MESSAGE");
  });
  test("handleMessageChange returns the correct type", () => {
    expect(handleMessageChange().type).toEqual("HANDLE_MESSAGE");
  });
  test("deleteDirectMessage returns the correct type", () => {
    expect(deleteDirectMessage().type).toEqual("DELETE_DIRECT_MESSAGE");
  });
  test("addDirectMessage returns the correct type", () => {
    expect(addDirectMessage().type).toEqual("ADD_DIRECT_MESSAGE");
  });
});
