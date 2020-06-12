import controllers from './controllers';

export default (app) => {
  app.get('/api/meta', controllers.meta);
  app.post('/api/auth/check', controllers.auth.check);
  app.post('/api/auth/login', controllers.auth.login);
  app.post('/api/auth/register', controllers.auth.register);
  app.get('/api/auth/logout', controllers.auth.logout);

  app.get('*', controllers.ssr);
};
