const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const socketIO = require('socket.io');
const handleSockets = require('./socketIO.js');
const path = require('path');
//require('dotenv').config();
const { default: mongoose } = require('mongoose');

//delete later
const User = require('../models/userModel');

//database access for sockets


app.post('/test/user', async (req, res, next) => {
  const username = 'pat';
  const password = 'pat';

  const user = await User.create({username, password});
  res.send(200).json(user);
});

app.get('/test/board', async (req, res, next) => {
  const uid = '64781a318c3d168e9e410674';

  const user = await User.findById(uid);
  console.log(user.activeBoards);
  res.send(200).json(user.activeBoards);
});
// Serve static files in the /dist folder
app.use('/', express.static(path.join(__dirname, '../dist')));
app.get('/', (req, res) => res.sendFile(__dirname, '../dist/index.html'));

const io = socketIO(server, {
  pingTimeout: 1000, // how many ms without a pong packet to consider the connection closed
  pingInterval: 3000, // how many ms before sending a new ping packet
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
  },
});
const socketPath = io.of('/api/sockets');





const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'Best-Scrummy-2',
};


const start = async () => {
  try{
    await mongoose.connect('mongodb+srv://pat:pat@cluster0.3aacadl.mongodb.net/?retryWrites=true&w=majority', mongoOptions)
    handleSockets(socketPath);
    server.listen(3000, () => console.log('The server is running at port 3000'));
  } catch (err) {
    console.log(err);
  }
};
start();