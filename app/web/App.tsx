import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet';
import io, { Socket } from 'socket.io-client';
import theme from './styles/theme';
import Router from './Router';
import Header from './components/Header';
import Footer from './components/Footer';
import Context from './App.context';

let socket: typeof Socket | undefined;
if (typeof window !== 'undefined') {
  socket = io({
    transports: ['websocket']
  });
}

interface AppProps {
  user: object;
};

const App: React.FC<AppProps> = ({ user }) => {
  const appName = 'Cube Radio';

  const setUser = async (values: object): Promise<void> => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then(e => e.json());
    if (res.code === 200) {
      const rootElement = document.getElementById('__app');
      if (rootElement) {
        rootElement.dataset.user = encodeURIComponent(JSON.stringify(res.data.user));
      }
      user = res.data.user;
      window.location.pathname = '/';
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Context.Provider value={{ socket, user, setUser }}>
        <Helmet titleTemplate={`%s \\ ${appName}`} defaultTitle={appName} />
        <Header />
        <Router />
        <Footer />
      </Context.Provider>
    </ThemeProvider>
  );
};

export default App;
