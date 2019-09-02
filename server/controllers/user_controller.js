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

module.exports = {
  updatePic
};
