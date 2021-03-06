const updatePic = (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const { body } = req;

  db.update_pic([id, body.profile_img])
    .then(picture => {
      res.status(200).json(picture);
    })
    .catch(err => {
      res.status(500).send({ error: "Can't update picture." });
      console.log(err);
    });
};

const getAllUsers = async (req, res) => {
  const db = req.app.get("db");

  const results = await db.get_all_users();
  res.status(200).send(results);
};

const searchUsers = async (req, res) => {
  const db = req.app.get("db");
  const { email } = req.query;

  db.search_users(`%${email}%`)
    .then(users => {
      // console.log(users);
      res.json(users);
    })
    .catch(err => console.log(err));
};

const updateNickname = (req, res) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const { nickname } = req.body;
  db.update_nickname([id, nickname])
    .then(() => {
      req.session.user.nickname = nickname;
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
};

module.exports = {
  updatePic,
  getAllUsers,
  searchUsers,
  updateNickname
};
