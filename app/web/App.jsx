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

  const setUser = async (values) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then(e => e.json());
    if (res.code === 200) {
      document.querySelector('#__app').dataset.user = encodeURIComponent(JSON.stringify(res.data.user));
      user = res.data.user;
      window.location.pathname = '/';
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Context.Provider value={{ socket, user, setUser }}>
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
