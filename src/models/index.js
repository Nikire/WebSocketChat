module.exports = (sequelize) => {
  const User = require('./User')(sequelize);
  const Message = require('./Message')(sequelize);

  return { User, Message };
};
