const jwt = require('jsonwebtoken');
const {
  models: { User },
} = require('../sequelize.js');
const { Sequelize } = require('sequelize');

module.exports = {
  errorHandler: () => (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error('ERROR ', err);
    res.status(status).json({ error: true, message });
  },
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
      return res
        .status(401)
        .json({ error: true, message: 'No token provided' });

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, { user }) => {
      if (err) return res.status(403).json(err);
      req.user = user;
      next();
    });
  },
  validateUser:
    (type = '') =>
    async (req, res, next) => {
      let { username, name, email, password } = req.body;
      try {
        // Type Validation
        if (!type || type === '') {
          return res
            .status(400)
            .json({ error: true, message: 'Type is required.' });
        }
        if (!['update', 'create'].includes(type)) {
          return res
            .status(400)
            .json({ error: true, message: 'Invalid type.' });
        }
        switch (type) {
          case 'create': {
            if (!username || username === '') {
              return res
                .status(400)
                .json({ error: true, message: 'Username is required.' });
            }
            if (!name || name === '') {
              return res
                .status(400)
                .json({ error: true, message: 'Name is required.' });
            }
            if (!email || email === '') {
              return res
                .status(400)
                .json({ error: true, message: 'Email is required.' });
            }
            if (!password || password === '') {
              return res
                .status(400)
                .json({ error: true, message: 'Password is required.' });
            }
            break;
          }
        }
        // Type check
        if (typeof username !== 'string') {
          return res
            .status(400)
            .json({ error: true, message: 'Username type is not valid.' });
        }
        if (typeof name !== 'string') {
          return res
            .status(400)
            .json({ error: true, message: 'Name type is not valid.' });
        }
        if (typeof email !== 'string') {
          return res
            .status(400)
            .json({ error: true, message: 'Email type is not valid.' });
        }
        if (typeof password !== 'string') {
          return res
            .status(400)
            .json({ error: true, message: 'Password type is not valid.' });
        }
        // RegEx Validators
        let usernameRegEx = /^[a-zA-Z0-9]{3,25}$/;
        let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,30}$/;
        let emailRegEx =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let nameRegEx = /^[a-zA-Z ]{3,25}$/;

        if (req.body.username && !usernameRegEx.test(req.body.username)) {
          return res.status(400).json({
            error: true,
            message:
              'Invalid username, please enter a valid username (must be valid characters and be 3-25 characters long)',
          });
        }
        if (req.body.password && !passwordRegEx.test(req.body.password)) {
          return res.status(400).json({
            error: true,
            message:
              'Invalid password, it must have at least one number and one letter it also must be valid characters and be 5-30 characters long',
          });
        }
        if (req.body.email && !emailRegEx.test(req.body.email)) {
          return res.status(400).json({
            error: true,
            message: 'Invalid email, please enter a valid email',
          });
        }
        if (req.body.name && !nameRegEx.test(req.body.name)) {
          return res.status(400).json({
            error: true,
            message:
              'Invalid name, please enter a valid name (must be just letters and 3-25 characters long)',
          });
        }
        const userExist = await User.findOne({
          where: {
            [Sequelize.Op.or]: [{ username }, { email }],
          },
        });
        if (userExist) {
          return res
            .status(400)
            .json({ error: true, message: 'Username/email already exists' });
        }
        next();
      } catch (error) {
        return res.status(500).json({ error: true, message: error.message });
      }
    },
};
