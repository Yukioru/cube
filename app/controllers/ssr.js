import { renderToNodeStream } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components'
import { Helmet } from 'react-helmet';

import { before, after } from '../utils/ssr-template';
import { serverRender } from '../web/render';

export default (req, res) => {
  const context = {};
  const helmet = Helmet.renderStatic();
  const sheet = new ServerStyleSheet();

  res.write(before({ helmet }));
  
  const jsx = sheet.collectStyles(serverRender({
    context,
    location: req.url,
  }));

  const stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx));

  stream.pipe(res, { end: false });
  stream.on('end', () => {
    res.write(after());
    res.end();
  });
};
