require('dotenv').config();

const { PORT,ORIGIN } = process.env;
const cors = require('cors');

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer,{
  cors: {
    origin: ORIGIN
  }
});
io.on("connection", (socket) => {
	console.log("CONNECTED " + socket.id);
	socket.on("test", () => console.log(socket.id + " APRETÓ BOTON"));
});

httpServer.listen(PORT);


// Require Express and Sequelize
/* const server = require('./src/server');
const { sequelize, models } = require('./src/sequelize');

// Test Sequelize connection
testConnection(sequelize);
// Start Express server
const { PORT } = process.env;
sequelize.sync({ force: true }).then(() => {
	server.listen(PORT, () => {
		console.log(`Server started on port ${PORT}`);
	});
});
 */
