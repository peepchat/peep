const friendRequest = async (req, res) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const { friendID } = req.params;

  const result = await db.check_friend_requests([id, friendID]);
  const existingRequest = result[0];
  if (existingRequest) {
    db.make_friend_request([id, friendID])
      .then(() => {
        res.sendStatus(200);
      })
      .catch(res.sendStatus(500));
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
};

module.exports = {};
