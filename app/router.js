import controllers from './controllers';

export default (app) => {
  app.get('/api/meta', controllers.meta);
  app.get('*', controllers.ssr);
};
