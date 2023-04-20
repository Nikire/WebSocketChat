// Helpers
const { errorHandler } = require('./helpers/express');

require('dotenv').config();
const { sequelize } = require('./src/sequelize.js');

const { PORT, ORIGIN } = process.env;
const cors = require('cors');

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const routes = require('./src/routes');

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/', routes);

// Error handler
app.use(errorHandler());

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
