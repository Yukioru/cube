import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import controllers from '../controllers';

export default (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, controllers.auth.loginMiddleware));

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  return passport;
};
