const { Router } = require('express');
const router = Router();
const { getAllMessages } = require('../controllers/Messages.js');

router.get('/', getAllMessages);

module.exports = router;
