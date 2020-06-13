import React from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';

import App from './App';

const clientRender = () => {
  const user = JSON.parse(decodeURIComponent(document.querySelector('#__app').dataset.user));
  return (
    <BrowserRouter>
      <App user={user} />
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
