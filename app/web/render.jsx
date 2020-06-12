import React from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';

import App from './App';

const clientRender = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

const serverRender = ({ location, context, user }) => {
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
