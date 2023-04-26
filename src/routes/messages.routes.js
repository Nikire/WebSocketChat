const { Router } = require('express');
const router = Router();
const {
  getAllMessages,
  createMessage,
} = require('../controllers/messages.controller.js');

router.get('/', getAllMessages);
router.post('/', createMessage);

module.exports = router;
