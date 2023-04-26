//Controller for messages
const {
  models: { Message, User },
} = require('../sequelize.js');

const getAllMessages = async (req, res, next) => {
  try {
    let messages = await Message.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    messages = messages.map((msg) => ({
      username: msg.dataValues.user.username,
      hour: new Date(msg.dataValues.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      text: msg.dataValues.text,
    }));
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

const createMessage = async (req, res, next) => {
  const { text } = req.body;
  const userId = req.user.id;
  try {
    await Message.create({
      text,
      userId,
    });
    res
      .status(200)
      .json({ success: 1, message: 'Message created successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllMessages, createMessage };
