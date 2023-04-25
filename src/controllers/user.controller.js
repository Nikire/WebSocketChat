//Controller for messages
const {
  models: { User },
} = require('../sequelize.js');

const getUserInfo = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserInfo };
