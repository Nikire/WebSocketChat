const { Router } = require('express');

//import routes
const msgs = require('./messages.js');

const router = Router();

//set up the routes

router.use('/messages', msgs);

module.exports = router;
