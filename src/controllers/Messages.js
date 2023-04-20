//Controller for messages
const {
  models: { Message },
} = require('../sequelize.js');

const getAllMessages = async (req, res) => {
  try {
    let messages = await Message.findAll();
    res.status(201).send(messages);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { getAllMessages };
