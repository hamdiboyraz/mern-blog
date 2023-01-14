const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide username and password',
    });
  }

  const user = await User.findOne({
    username,
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect username or password',
    });
  }

  const token = signToken(user._id);

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect username or password',
    });
  }
  res.cookie('token', token);
  res.status(200).json({
    status: 'success',
    token,
  });
};
