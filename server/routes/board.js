const express = require('express');
const app = express();
const boardController = require('../controllers/boardController');

const router = express.Router();

//handle data submitted through HTML forms
app.use(express.urlencoded({ extended: true }));

//parses the JSON data and attaches it to the req.body property,
app.use(express.json());

//POST functionality
router.post('/createBoard', boardController.createBoard, (req, res) =>
  res.status(200).json(res.locals.newBoard)
);

//GET
router.get('/getBoard/:boardName', boardController.getBoard, (req, res) =>
  res.status(200).json(res.locals.board)
);

//UPDATE
// router.patch('/updateBoard/:boardName', studentController.updateBoard, (req, res) =>
//   res.status(200).json(res.locals.board)
// );

//DELETE
router.delete(
  '/deleteBoard/:boardName',
  boardController.deleteBoard,
  (req, res) => res.status(200).json(res.locals.board)
);

// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = router;
