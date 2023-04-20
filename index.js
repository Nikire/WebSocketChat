require('dotenv').config();
const { sequelize } = require('./src/sequelize.js');

const { PORT, ORIGIN } = process.env;
const cors = require('cors');

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();

app.use(cors());

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

sequelize.sync({ force: true }).then(() => {
  console.log('sequelize conected');
  httpServer.listen(PORT);
});
