// Controller for Users
const {
  models: { User },
} = require('../sequelize.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_ACCESS_TOKEN } = process.env;

const register = async (req, res, next) => {
  const { email, name, username } = req.body;
  let { password } = req.body;
  try {
    bcrypt.genSalt(10, async (error, salt) => {
      if (error) return res.status(400).json(error);
      bcrypt.hash(password, salt, async (error, hash) => {
        if (error) return res.status(400).json(error);
        password = hash;
        const user = await User.create({
          name,
          username,
          email,
          password,
        });
        const accessToken = jwt.sign({ user }, process.env.JWT_ACCESS_TOKEN, {
          expiresIn: '1m',
        });
        res
          .status(200)
          .header('authorization', accessToken)
          .json({ accessToken, message: 'User created successfully!' });
      });
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { username } = req.body;
  let { password } = req.body;
  try {
    const user = await User.findOne({
      where: { username },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'The username is incorrect or does not exist' });
    }
    bcrypt.genSalt(10, async (error, salt) => {
      if (error) return res.status(400).json(error);
      bcrypt.hash(password, salt, async (error, hash) => {
        if (error) return res.status(400).json(error);
        password = hash;
      });
    });
    const hash = user.password;
    bcrypt.compare(password, hash, function (error, result) {
      if (error) {
        return res.status(500).json({ error: true, message: error });
      }
      if (!result) {
        return res.status(401).json({
          error: true,
          message: 'Unauthorized, password is incorrect',
        });
      }
      // Verify that user exists
      const accessToken = jwt.sign({ user }, JWT_ACCESS_TOKEN, {
        expiresIn: '1m',
      });
      res
        .status(200)
        .header('authorization', accessToken)
        .json({ accessToken, message: 'User authenticated.' });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
