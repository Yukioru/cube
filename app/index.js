import express from 'express';
import path from 'path';
import http from 'http';
import socket from 'socket.io';
import isEqual from 'lodash.isequal';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import router from './router';
import getMeta from './services/getMeta';
import db from './utils/db';
import initPassport from './utils/passport';

const port = parseInt(String(process.env.PORT), 10) || 3000;
const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' },
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')))

db();

let cache = {};
let res = {};

const metaSocket = async () => {
  res = await getMeta();
  if (!isEqual(cache, res)) {
    cache = res;
    io.sockets.emit('meta', res);
  }
};

const listenerMeta = async () => {
  await metaSocket();
  setTimeout(listenerMeta, 1000);
};

listenerMeta();

io.on('connection', (socket) => {
  socket.on('meta', () => socket.emit('meta', res));
});

initPassport(app);
router(app);

server.listen(port, () => {
  console.log(`> App started at http://localhost:${port}`);
});