const friendRequest = async (req, res) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const { friendID } = req.params;

  const result = await db.check_friend_requests([id, friendID]);
  const existingRequest = result[0];
  if (!existingRequest) {
    db.make_friend_request([id, friendID]);
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
};

const getFriendRequests = async (req, res) => {
  const db = req.app.get("db");
  const { id } = req.session.user;

  const result = await db.get_friend_requests([id]);
  res.status(200).send(result);
};

const getPendingRequests = async (req, res) => {
  const db = req.app.get("db");
  const { id } = req.session.user;

  const result = await db.get_pending_friend_requests([id]);
  res.status(200).send(result);
};

const addToFriendsList = async (req, res) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const { friendID } = req.params;
  const { request_id } = req.body;

  db.remove_friend_request([request_id]);
  db.remove_other_friend_request([id, friendID]);

  const results = await db.check_direct_chat_id();
  const chat_id = Number(results[0].chat_id) + 1;
  db.add_direct_chat_id([chat_id]);
  db.add_friends([id, friendID, chat_id]);
  setTimeout(() => {
    db.add_friends_two([friendID, id, chat_id]);
  }, 100);
  res.sendStatus(200);
};

const removeFromFriendsList = (req, res) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const { friendID } = req.params;
  const { chat_id } = req.body;

  db.remove_friend([id, friendID]);
  db.delete_direct_chat_history([chat_id]);
  db.delete_direct_chat([chat_id]);

  res.sendStatus(200);
};

const getFriendsList = async (req, res) => {
  const db = req.app.get("db");
  const { id } = req.session.user;

  const results = await db.get_friends_list([id]);

  res.status(200).send(results);
};

module.exports = {
  friendRequest,
  getFriendRequests,
  getPendingRequests,
  addToFriendsList,
  removeFromFriendsList,
  getFriendsList
};
