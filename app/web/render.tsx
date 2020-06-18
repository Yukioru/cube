import React from 'react';
import { StaticRouterContext } from 'react-router';
import { BrowserRouter, StaticRouter } from 'react-router-dom';

import App from './App';

const clientRender = () => {
  const rootElement = document.getElementById('__app');
  const user = JSON.parse(decodeURIComponent(String(rootElement ? rootElement.dataset.user : '')));
  return (
    <BrowserRouter>
      <App user={user} />
    </BrowserRouter>
  );
};

interface ServerRenderProps {
  location: string;
  context: StaticRouterContext,
  user: object;
};

const serverRender = ({ location, context, user }: ServerRenderProps) => {
  return (
    <StaticRouter location={location} context={context}>
      <App user={user} />
    </StaticRouter>
  );
};

export {
  clientRender,
  serverRender,
};
