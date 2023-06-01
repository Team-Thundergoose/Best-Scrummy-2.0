const userController = {};
const User = require('../models/userModel');
const passport = require('passport');

userController.login = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      throw err;
    }
    if (!user) res.json('no user exists');
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.json(req.user);
      });
    }
  })(req, res, next);
};

userController.signup = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.create({ username, password });
  req.logIn(user, (err) => {
    if (err) throw err;
    res.json(user);
  });
};

module.exports = userController;
