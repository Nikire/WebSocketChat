require('dotenv').config();
const { sequelize } = require('./src/sequelize.js');
const app = require('./src/express.js');

const { PORT, ORIGIN } = process.env;

const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ORIGIN,
  },
});

io.on('connection', (socket) => {
  console.log('CONNECTED ' + socket.id);
  socket.on('test', () => console.log(socket.id + ' APRETÓ BOTON'));
});

require('./src/events')(io);

sequelize.sync({ force: true }).then(() => {
  console.log('sequelize conected');
  httpServer.listen(PORT);
  setTimeout(function () {
    // Your code to be executed after 1000ms (1 second)
    io.emit('message', 'test');
  }, 1000);
});
