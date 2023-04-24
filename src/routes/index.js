const { Router } = require('express');

// Import routes
const messagesRouter = require('./messages.routes.js');
const authRoutes = require('./auth.routes.js');

// Middlewares
const { authenticateToken } = require('../helpers/express.js');

const router = Router();

//set up the routes

router.use('/messages', authenticateToken, messagesRouter);
router.use('/auth', authRoutes);

module.exports = router;
