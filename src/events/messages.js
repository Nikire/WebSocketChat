module.exports = (io) => {
  io.on('message', (newMessage) => {
    io.emit('message-fe', newMessage);
    console.log('emitiendo msg');
  });
};
