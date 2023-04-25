module.exports = (socket, io) => {
  socket.on('message', (message) => {
    io.emit('message-fe', message);
    console.log(message);
    console.log(message.text);
  });
};
