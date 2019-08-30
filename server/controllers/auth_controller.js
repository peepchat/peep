const bcrypt = require("bcryptjs");

const registerUser = async (req, res, next) => {
  const { email, nickname, password } = req.body;
  const db = req.app.get("db");

  const checkedUser = await db.get_user([email]);
  if (checkedUser.length === 0) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await db.create_user([email, nickname, hashedPassword]);
    // console.log(user[0].user_id);
    req.session.user = {
      id: user[0].user_id,
      email,
      nickname
    };
    res.json(user);
  } else {
    res.status(409).json({ error: "Username taken, please try another." });
  }
};

const getUser = async (req, res, next) => {
  if (req.session.user && req.session.user.username) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ error: "You need to be logged in." });
  }
};

const loginUser = async (req, res, next) => {
  const db = req.app.get("db");
  const { email, password } = req.body;

  const checkedUser = await db.get_user([email]);
  if (checkedUser.length === 0) {
    res.status(401).json({ error: "Wrong username and password." });
  }

  const isMatching = await bcrypt.compare(password, checkedUser[0].password);
  if (isMatching) {
    req.session.user = {
      id: checkedUser[0].user_id,
      email: checkedUser[0].email,
      nickname: checkedUser[0].nickname
    };
    // console.log(req.session.user);
    return res.json(req.session.user);
  } else {
    return res.status(403).json({ error: "Wrong username and password." });
  }
};

const logoutUser = async (req, res) => {
  req.session.destroy();
  // console.log(req.session);
  return res.sendStatus(200);
};

module.exports = {
  registerUser,
  getUser,
  loginUser,
  logoutUser
};
