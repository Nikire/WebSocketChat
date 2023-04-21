module.exports = (socket, io) => {
  require('./messages')(socket, io);
};
