require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const socketIO = require('socket.io');
const handleSockets = require('./socketIO.js');
const path = require('path');
require('dotenv').config();
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

//require router file for additional CRUD functionality
const boardRouter = require('./routes/board.js');
const userRouter = require('./routes/user.js');

//const mongoURI = 'mongodb://127.0.0.1/scrummy';
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'Best-Scrummy-2',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http//localhost:3000',
    credentials: true,
  })
);
app.use(
  session({
    secret: 'THISISASECRET',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser('THISISASECRET'));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);
//mount router middleware under /api prefix
app.use('/api/board', boardRouter);
app.use('/api/user', userRouter);

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
handleSockets(socketPath);

app.use(({ code, error }, req, res, next) => {
  console.log(code, error);
  res.status(code).json({ error: error.message });
});

server.listen(3000, () => console.log('The server is running at port 3000'));
