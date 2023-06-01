const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { isLoggedIn } = require('../middleware');

router.post('/login', userController.login, (req, res, next) => {
  res.json(res.locals.isValid);
});

router.post('/signup', userController.signup);

router.get('/getuser', isLoggedIn, (req, res, next) => {
  const { username, activeBoards } = req.user;
  res.json({ username, activeBoards });
});

module.exports = router;
