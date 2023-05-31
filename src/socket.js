import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined: 'http://localhost:4000';

// In development mode, the io server will be listening on port 8080 with the client
export const socket = io.connect('http://localhost:3000/api/sockets');