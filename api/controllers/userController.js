const User = require('../models/userModel');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.create({ username, password });
  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
};
