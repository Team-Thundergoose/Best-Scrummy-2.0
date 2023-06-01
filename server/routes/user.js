const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const User = require('../models/userModel');

router.post('/login', userController.login, (req, res, next) => {
  res.json(res.locals.isValid);
});

router.post('/signup', userController.signup);

router.get('/getuser', isLoggedIn, async (req, res, next) => {
  const user = await User.findOne({ username: req.user.username });
  const populateUser = await user.populate('activeBoards');
  const userBoards = populateUser.activeBoards;
  res.json({ username: user.username, userBoards });
});

module.exports = router;
