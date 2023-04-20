module.exports = (socket) => {
  socket.on('message', (newMessage) => {
    socket.emit('message-fe', newMessage);
    console.log(newMessage);
  });
};
