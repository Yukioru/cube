import express from 'express';
import path from 'path';
import http from 'http';
import socket from 'socket.io';
import isEqual from 'lodash.isequal';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectMongoDBSession from'connect-mongodb-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import router from './router';
import getMeta from './services/getMeta';
import db from './utils/db';
import controllers from './controllers';

const { NODE_ENV, PORT, SECRET_SESSION, DB_URI } = process.env;

const port = parseInt(String(PORT), 10) || 3000;
const app = express();
const server = http.createServer(app);
const io = socket(server);
const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
  uri: DB_URI,
  collection: 'sessions'
});

store.on('error', (error) => {
  console.log(error);
});

app.use(cookieParser());
app.use(session({
  store,
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, controllers.auth.loginMiddleware));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

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

router(app);

server.listen(port, () => {
  console.log(`> App started at http://localhost:${port}`);
});