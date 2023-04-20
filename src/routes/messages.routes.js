const { Router } = require('express');
const router = Router();
const { getAllMessages } = require('../controllers/Messages.controller.js');

router.get('/', getAllMessages);

module.exports = router;
