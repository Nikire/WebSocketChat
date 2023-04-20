const { Router } = require('express');

//import routes
const messagesRouter = require('./messages.routes.js');

const router = Router();

//set up the routes

router.use('/messages', messagesRouter);

module.exports = router;
