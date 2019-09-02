const getDirectMessages = async (req, res) => {
  const db = req.app.get("db");
  const { chat_id } = req.params;
  const results = await db.get_direct_messages([chat_id]);
  res.status(200).send(results);
};

const updateMessage = (req, res) => {
  const db = req.app.get("db");
  const { message_id } = req.params;
  const { message } = req.body;
  db.edit_direct_message([message_id, message])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
};

const deleteMessage = (req, res) => {
  const db = req.app.get("db");
  const { message_id } = req.params;

  db.delete_direct_message([message_id])
    .then(() => {
      res.sendStatus(500);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
};

module.exports = {
  getDirectMessages,
  updateMessage,
  deleteMessage
};
