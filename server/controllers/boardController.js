const Board = require('../models/boardModel.js');
const User = require('../models/userModel.js');

const boardController = {};

//create a new board middleware
boardController.createBoard = async (req, res, next) => {
  const { name } = req.body;
  const user = await User.findOne({ username: req.user.username });
  console.log(user);
  try {
    const newBoard = await Board.create({
      state: [[], [], [], []],
      name,
      participants: [user._id],
    });

    user.activeBoards.push(newBoard._id);
    await user.save();
    const populateUser = await user.populate('activeBoards');
    res.locals.boards = populateUser.activeBoards;
    return next();
  } catch (err) {
    return next({ log: 'Error: boardController.createBoard middleware' });
  }

  next();
};

//get board middleware
boardController.getBoard = async (req, res, next) => {
  const { boardName } = req.params;

  if (!boardName) {
    return next({ log: 'Error: boardName is required' });
  }

  try {
    res.locals.board = await Board.findOne({ firstName: boardName });
    return next();
  } catch (err) {
    return next({ log: 'error: boardController.getBoard middleware' });
  }
};

//update board middleware
boardController.updateBoard = async (req, res, next) => {
  const { boardName } = req.params;
  const { state, name, userName } = req.body;
  if (!boardName || !firstName) {
    return next('Error: boardName is required');
  }
  try {
    res.locals.board = await Board.findOneAndUpdate(
      { name: boardName },
      {
        state,
        name,
        participants: userName,
      },
      { new: true }
    );

    return next();
  } catch (err) {
    return next({ log: 'error: boardController.updateBoard' });
  }
};

//delete a board middleware
boardController.deleteBoard = async (req, res, next) => {
  const { boardName } = req.params;
  if (!boardName) {
    return next('Error: boardName is required');
  }

  try {
    res.locals.student = await Student.findOneAndDelete({
      firstName: boardName,
    });
    return next();
  } catch (err) {
    return next({ log: 'error: boardController.deleteBoard' });
  }
};

module.exports = boardController;
