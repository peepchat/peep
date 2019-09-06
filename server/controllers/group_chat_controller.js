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

const makeRequest = (req, res) => {};

module.exports = {
  createGroup,
  editGroup,
  searchGroup,
  getUserGroups,
  getGroupMembers,
  addUser
};
