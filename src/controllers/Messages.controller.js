//Controller for messages
const {
  models: { Message },
} = require('../sequelize.js');

const getAllMessages = async (req, res, next) => {
  try {
    let messages = await Message.findAll();
    res.status(201).json(messages);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllMessages };
