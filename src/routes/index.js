const { Router } = require('express');

// Import routes
const messagesRouter = require('./messages.routes.js');
const authRouter = require('./auth.routes.js');
const userRouter = require('./user.routes.js');
// Middlewares
const { authenticateToken } = require('../helpers/express.js');

const router = Router();

//set up the routes

router.use('/messages', authenticateToken, messagesRouter);
router.use('/auth', authRouter);
router.use('/user', authenticateToken, userRouter);

module.exports = router;
