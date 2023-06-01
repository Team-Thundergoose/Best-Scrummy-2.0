const { v4: uuidv4 } = require('uuid');
const Board = require('./models/boardModel.js')

// temp storage to store tasks
let storage = [[], [], [], []];

// list of names
let anonNames = [
  'alligator',
  'anteater',
  'armadillo',
  'auroch',
  'axolotl',
  'badger',
  'bat',
  'bear',
  'beaver',
  'blobfish',
  'buffalo',
  'camel',
  'chameleon',
  'cheetah',
  'chipmunk',
  'chinchilla',
  'chupacabra',
  'cormorant',
  'coyote',
  'crow',
  'dingo',
  'dinosaur',
  'dog',
  'dolphin',
  'dragon',
  'duck',
  'octopus',
  'elephant',
  'ferret',
  'fox',
  'frog',
  'giraffe',
  'goose',
  'gopher',
  'grizzly',
  'hamster',
  'hedgehog',
  'hippo',
  'hyena',
  'jackal',
  'jackalope',
  'ibex',
  'ifrit',
  'iguana',
  'kangaroo',
  'kiwi',
  'koala',
  'kraken',
  'lemur',
  'leopard',
  'liger',
  'lion',
  'llama',
  'manatee',
  'mink',
  'monkey',
  'moose',
  'narwhal',
  'nyan cat',
  'orangutan',
  'otter',
  'panda',
  'penguin',
  'platypus',
  'python',
  'pumpkin',
  'quagga',
  'quokka',
  'rabbit',
  'raccoon',
  'rhino',
  'sheep',
  'shrew',
  'skunk',
  'squirrel',
  'tiger',
  'turtle',
  'unicorn',
  'walrus',
  'wolf',
  'wolverine',
  'wombat',
];

// anon names storage object
const anonNamesObj = {};
// anon names storage array for frontend
let anonNamesArr = [];

// generate unique anon name from anonNames
const generateUniqueAnonName = () => {
  let isUnique = false;
  let anonName;

  while (!isUnique) {
    // generate a random anonName
    anonName = anonNames[Math.floor(Math.random() * anonNames.length)];

    // check if the generated anonName is already assigned
    let isNameAssigned = false;
    for (const assignedAnonName of Object.values(anonNamesObj)) {
      if (assignedAnonName === anonName) {
        isNameAssigned = true;
        break;
      }
    }

    // exit loop if name has not already been assigned
    if (!isNameAssigned) {
      isUnique = true;
    }
  }

  return anonName;
};

// SocketIO listeners
// socket refers to the client
// io refers this server
const handleSockets = (socketPath) => {
  socketPath.on('connection', (socket) => {
    // Create anonName upon client connection and store anonName in anonNamesObj
    let user;
    let board;
    let anonName;

    //TESTING ROOMS
    const arrRooms = ['hello', 'world'];
    const randomRoom = Math.floor(Math.random()*2);
    socket.join(arrRooms[randomRoom]);
    // socket.leave()
    
    // Check if anonName is already assigned for the current socket.id
    if (anonNamesObj.hasOwnProperty(socket.id)) {
      anonName = anonNamesObj[socket.id];
    } else {
      // Generate a random anon name for the current socket.id
      anonName = generateUniqueAnonName();
      // Store anonName in anonNameObj
      anonNamesObj[socket.id] = anonName;
      // Store anonName in anonNameArr
      anonNamesArr.push(anonName);
    }

    // send the tasks saved on this server to the client
    socket.emit('load-tasks', storage); //FROM DATABASE, DELETE LINE AFTER LOG IN FUNCTIONALITY?, might be another step based on front end architecture

    // emit current online users to frontend
    socketPath.to(arrRooms[randomRoom]).emit('user-connected', anonNamesObj);

    socket.on('logged-in', (/*username or id?*/) => {
      //somehow get user?
      //then get boards from user
      //then load boards into profile/landing page
      //rather than load tasks, we would want to unload user.activeBoards
    });

    socket.on('choose-board', (boardName) => {
      socket.join(boardName);

      const board = Board.findOne({name: boardName});

      socket.emit('load-tasks', board.state); //rather than storage, we'd want to access the specific board that is chosen
    });

    // client disconnection
    socket.on('disconnect', () => {
      anonNamesArr = anonNamesArr.filter((e) => e !== anonNamesObj[socket.id]);

      const disconnectedUser = anonNamesObj[socket.id];
      delete anonNamesObj[socket.id];
      // emit current online users to frontend
      socketPath.emit('user-disconnected', socket.id);
      // console.log(
      //   `A client has disconnected ${socket.id} with UPDATED anonNamesList`,
      //   anonNamesObj
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
          foundTask.reviewedBy = anonNamesObj[socket.id];
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
