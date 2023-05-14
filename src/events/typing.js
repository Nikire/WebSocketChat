module.exports = (socket, io) => {
  socket.on('typing', (data) => {
    socket.broadcast.emit('userTyping', { username: data.username });
  });
};
