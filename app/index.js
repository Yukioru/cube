import express from 'express';
import path from 'path';
import http from 'http';
import socket from 'socket.io';
import isEqual from 'lodash.isequal';

import router from './router';
import getMeta from './services/getMeta';

const port = parseInt(String(process.env.PORT), 10) || 3000;
const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(path.resolve(__dirname, 'public')))

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
  socket.emit('meta', res);
});

router(app);

server.listen(port, () => {
  console.log(`> App started at http://localhost:${port}`);
});