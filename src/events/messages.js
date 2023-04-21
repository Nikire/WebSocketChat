module.exports = (socket, io) => {
  socket.on('message', (newMessage) => {
    io.emit('message-fe', newMessage);
    console.log(newMessage);
  });
};
