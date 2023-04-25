module.exports = (socket, io) => {
  socket.on('message', (text, type) => {
    io.emit('message-fe', text, type);
    console.log(text);
  });
};
