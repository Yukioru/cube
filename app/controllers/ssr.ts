import { renderToNodeStream } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components'
import { get } from 'lodash';
import { Helmet } from 'react-helmet';
import { RequestHandler } from 'express';

import { before, after } from '../utils/ssr-template';
import { serverRender } from '../web/render';

const ssr: RequestHandler = (req, res) => {
  const context = {};
  const helmet = Helmet.renderStatic();
  const sheet = new ServerStyleSheet();
  const user = get(req, 'session.passport.user', {});

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

export default ssr;
