import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet';
import io from 'socket.io-client';
import theme from './styles/theme';
import Router from './Router';
import Header from './components/Header';
import Footer from './components/Footer';
import Context from './App.context';

let socket;
if (typeof window !== 'undefined') {
  socket = io({
    transports: ['websocket']
  });
}

const App = ({ user }) => {
  const appName = 'Cube Radio';
  return (
    <ThemeProvider theme={theme}>
      <Context.Provider value={{ socket, user }}>
        {/* <div
          style={{
            position: 'fixed',
            top: 0,
            left: '50%',
            width: 1,
            height: '100%',
            background: 'red',
          }}
        /> */}
        <Helmet titleTemplate={`%s \\ ${appName}`} defaultTitle={appName} />
        <Header />
        <Router />
        <Footer />
      </Context.Provider>
    </ThemeProvider>
  );
};

export default App;
