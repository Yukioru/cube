import { renderToNodeStream } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components'
import omit from 'lodash.omit';
import { Helmet } from 'react-helmet';

import { before, after } from '../utils/ssr-template';
import { serverRender } from '../web/render';

export default (req, res) => {
  const context = {};
  const helmet = Helmet.renderStatic();
  const sheet = new ServerStyleSheet();
  let user;
  console.log('req.session', req.session);
  if (req.user) {
    user = omit(req.user, ['password']);
  }

  res.write(before({ helmet, user }));
  
  const jsx = sheet.collectStyles(serverRender({
    context,
    location: req.url,
    user,
  }));

  const stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx));

  stream.pipe(res, { end: false });
  stream.on('end', () => {
    res.write(after());
    res.end();
  });
};
