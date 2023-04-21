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
  require('./src/events')(socket);
});

sequelize.sync({ force: true }).then(() => {
  console.log('sequelize conected');
  httpServer.listen(PORT);
});
