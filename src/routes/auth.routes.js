const { Router } = require('express');
const router = Router();
const { register, login } = require('../controllers/auth.controller.js');
const { validateUser } = require('../helpers/express.js');

router.post('/register', validateUser('create'), register);
router.post('/login', login);

module.exports = router;
