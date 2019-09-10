const createGroup = async (req, res) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const { group_name, group_img } = req.body;

  const group = await db.create_group([group_name, group_img]);
  const group_id = group[0].group_id;

  db.add_group_member([id, group_id, true]);

  res.sendStatus(200);
};

const editGroup = async (req, res) => {
  const db = req.app.get("db");
  const { group_id } = req.params;
  const { group_name, group_img } = req.body;

  if (group_name) {
    db.update_group_name([group_id, group_name]);
  }

  if (group_img) {
    db.update_group_pic([group_id, group_img]);
  }

  res.sendStatus(200);
};

const searchGroup = (req, res) => {
  const db = req.app.get("db");
  const { group } = req.query;

  db.search_group([`%${group}%`])
    .then(groups => {
      res.status(200).send(groups);
    })
    .catch(error => {
      console.log(error);
    });
};

const getUserGroups = async (req, res) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const results = await db.get_user_groups([id]);
  res.status(200).send(results);
};

const getGroupMembers = async (req, res) => {
  const db = req.app.get("db");
  const { group_id } = req.params;
  const results = await db.get_group_members([group_id]);
  res.status(200).send(results);
};

const addUser = (req, res) => {
  const db = req.app.get("db");
  const { group_id } = req.params;
  const { user_id } = req.body;

  db.add_group_member([user_id, group_id, false])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
};

const makeRequest = async (req, res) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const { group_id } = req.params;
  const result = await db.check_group_request([id, group_id]);
  const existingRequest = result[0];
  if (!existingRequest) {
    db.make_group_request([id, group_id]);
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
};

const getPendingGroupRequests = async (req, res) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const results = await db.get_pending_group_requests([id]);
  res.status(200).send(results);
};

const getGroupRequests = async (req, res) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const results = await db.get_group_requests([id]);
  res.status(200).send(results);
};

const acceptRequest = async (req, res) => {
  const db = req.app.get("db");
  const { request_id, user_id, group_id } = req.body;
  db.remove_group_request([request_id]);
  db.add_group_member([user_id, group_id, false]);
  res.sendStatus(200);
};

const declineRequest = async (req, res) => {
  const db = req.app.get("db");
  const { request_id } = req.params;
  db.remove_group_request([request_id]);
  res.sendStatus(200);
};

const removeMember = async (req, res) => {
  const db = req.app.get("db");
  const { user_id, group_id } = req.body;
  db.remove_group_member([user_id, group_id]);
  res.sendStatus(200);
};

const getGroupMessages = async (req, res) => {
  const db = req.app.get("db");
  const { group_id } = req.params;
  const results = await db.get_group_messages([group_id]);
  res.status(200).send(results);
};

const editGroupMessage = (req, res) => {
  const db = req.app.get("db");
  const { message_id } = req.params;
  const { message } = req.body;
  db.edit_group_message([message_id, message])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
};

const deleteGroupMessage = (req, res) => {
  const db = req.app.get("db");
  const { message_id } = req.params;
  db.delete_group_message([message_id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
};

const deleteGroup = (req, res) => {
  const db = req.app.get("db");
  const { group_id } = req.params;

  db.remove_all_group_requests([group_id]);
  db.remove_group_chat_history([group_id]);
  db.remove_all_group_members([group_id]);
  db.delete_group([group_id]);

  res.sendStatus(200);
};

const getGroupName = async (req, res) => {
  const db = req.app.get("db");
  const { group_id } = req.params;

  const results = await db.get_group_name([group_id]);
  res.status(200).send(results);
};

module.exports = {
  createGroup,
  editGroup,
  searchGroup,
  getUserGroups,
  getGroupMembers,
  addUser,
  makeRequest,
  getGroupRequests,
  getPendingGroupRequests,
  acceptRequest,
  declineRequest,
  removeMember,
  getGroupMessages,
  deleteGroupMessage,
  deleteGroup,
  editGroupMessage,
  getGroupName
};
