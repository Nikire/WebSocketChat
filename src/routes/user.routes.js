const { Router } = require('express');
const router = Router();
const { getUserInfo } = require('../controllers/user.controller.js');

router.get('/', getUserInfo);

module.exports = router;
