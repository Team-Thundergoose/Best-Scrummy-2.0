const { v4: uuidv4 } = require('uuid');
const Board = require('./models/boardModel.js')

// temp storage to store tasks
let storage = [[], [], [], []];

// names storage object
const namesObj = {};
// names storage array for frontend
let namesArr = [];

// SocketIO listeners
// socket refers to the client
// io refers this server
const handleSockets = (socketPath) => {
  socketPath.on('connection', (socket) => {
    // Create anonName upon client connection and store anonName in namesObj
    let room;
    let user;

    //TESTING ROOMS
    // const arrRooms = ['hello', 'world'];
    // const randomRoom = Math.floor(Math.random()*2);
    // socket.join(arrRooms[randomRoom]);
    // socket.leave()

    // emit current online users to frontend
    socketPath.to(arrRooms[randomRoom]).emit('user-connected', namesObj);

    socket.on('logged-in', (username) => {
      user = username;
      
      namesObj[socket.id] = user;
      namesArr.push(user);

      //somehow get user?
      //then get boards from user
      //then load boards into profile/landing page
      //rather than load tasks, we would want to unload user.activeBoards
    });

    // when a user chooses a board, the front end emits a board name
    // sets room variable for future use, and joins room
    // use board name to fetch board data and pass to front end
    socket.on('choose-board', (boardName) => {
      room = boardName;
      socket.join(room);

      const board = Board.findOne({name: boardName});
      socket.emit('user-connected-to-board', namesObj);
      socket.emit('load-tasks', board.state);
    });

    // client disconnection
    socket.on('disconnect', () => {
      namesArr = namesArr.filter((e) => e !== namesObj[socket.id]);

      const disconnectedUser = namesObj[socket.id];
      delete namesObj[socket.id];
      // emit current online users to frontend
      socketPath.emit('user-disconnected', socket.id);
      // console.log(
      //   `A client has disconnected ${socket.id} with UPDATED anonNamesList`,
      //   namesObj
      // );
    });

    // Listener for the 'greeting-from-client'
    socket.on('add-task', (content) => {
      // Assign a unique id for the task
      const uuid = uuidv4();

      //store it to the first index of storage (TO DO column)
      const obj = {
        author: anonName,
        content,
        uuid: uuid,
      };

      storage[0].push(obj); // ADD TO DB findbyid update?

      socketPath.to(arrRooms[randomRoom]).emit('add-task', obj);
    });

    //Listener for 'delete-message'
    socket.on('delete-task', (uuid) => {
      // update the storage when delete is fired
      // const board = board.findbyid(boardID)
      // use same to delete task from the appropriate array
      // update database
      storage = storage.map((column) =>
        column.filter((task) => task.uuid !== uuid)
      );
      socketPath.emit('delete-task', uuid);
    });

    //move left move right, keep same functionality, add updated board to db
    //Listener for 'next'
    socket.on('move-task-right', (uuid) => {
      let foundTask = null;
      let foundColumnIndex;
      // find the task with the matching UUID and its current column index
      for (let i = 0; i < storage.length; i++) {
        // store current column
        const column = storage[i];
        // store index if uuid is found
        const taskIndex = column.findIndex((task) => task.uuid === uuid);

        // if match was found and in the 2nd to last column (COMPLETE)...
        if (taskIndex !== -1 && i === storage.length - 2) {
          // remove the task at the specified index from the column array
          foundTask = column.splice(taskIndex, 1)[0];
          // create a current reviewer in storage
          foundTask.reviewedBy = namesObj[socket.id];
          foundColumnIndex = i;
          break;
        }
        // if match was found and not in the last column...
        else if (taskIndex !== -1 && i !== storage.length - 1) {
          // remove the task at the specified index from the column array
          foundTask = column.splice(taskIndex, 1)[0];
          foundColumnIndex = i;
          break;
        }
      }
      if (foundTask !== null) {
        // push foundTask into next column in storage
        storage[foundColumnIndex + 1].push(foundTask);
      }
      socketPath.emit('move-task-right', { uuid, reviewerId: socket.id });
    });

    //Listener for 'previous'
    socket.on('move-task-left', (uuid) => {
      let foundTask = null;
      let foundColumnIndex;
      // find the task with the matching UUID and its current column index
      for (let i = 0; i < storage.length; i++) {
        // store current column
        const column = storage[i];
        // store index if uuid is found
        const taskIndex = column.findIndex((task) => task.uuid === uuid);

        // if match was found and in the last column (REVIEWED)...
        if (taskIndex !== -1 && i == storage.length - 1) {
          // remove the task at the specified index from the column array
          foundTask = column.splice(taskIndex, 1)[0];
          // delete the reviewer
          delete foundTask.reviewedBy;
          foundColumnIndex = i;
          break;
        }
        // if match was found and not in the first column...store result and column index
        else if (taskIndex !== -1 && i !== 0) {
          // remove the task at the specified index from the column array
          foundTask = column.splice(taskIndex, 1)[0];
          foundColumnIndex = i;
          break;
        }
      }
      if (foundTask !== null) {
        // push foundTask into previous column in storage
        storage[foundColumnIndex - 1].push(foundTask);
      }
      socketPath.emit('move-task-left', uuid);
    });
  });
};
//refactor notes: on connection, do nothing. once logged in, get username to push into names array

module.exports = handleSockets;
