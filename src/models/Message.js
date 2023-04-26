const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Message = sequelize.define(
    'message',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        foreingKey: true,
      },
    },
    {
      timestamps: true,
    }
  );
  Message.associate = function (models) {
    Message.belongsTo(models.User, { foreingKey: 'userId' });
  };
  return Message;
};
