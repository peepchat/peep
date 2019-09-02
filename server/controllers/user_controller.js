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

module.exports = {
  updatePic,
  getAllUsers
};
