const models = require('../models/boardModel.js');

const boardController = {};

//create a new board middleware
boardController.createBoard = async (req, res, next) => {
  const { boardName, userName } = req.body;
  if (!boardName || !userName) {
    return next(
      createError(
        'createBoard',
        401,
        'Error: Missing boardName and/or userName'
      )
    );
  }

  try {
    res.locals.board = await Board.create({
      state: [[], [], [], []],
      name: boardName,
      participants: userName,
    });
    return next();
  } catch (err) {
    return next({ log: 'Error: boardController.createBoard middleware' });
  }
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
