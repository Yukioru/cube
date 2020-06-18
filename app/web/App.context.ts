import { createContext } from 'react';
import { Socket } from 'socket.io-client';

export interface IUser {
  _id: string;
  displayName: string;
  username: string;
}

export interface IAppContext {
  socket?: typeof Socket;
  user?: IUser;
  setUser?: Function;
};

export default createContext({} as IAppContext);
