import passport from 'passport';
import pick from 'lodash.pick';
import omit from 'lodash.omit';
import UserModel from '../models/User';

export const loginMiddleware = async (email, password, done) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'Incorrect email' });
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return done(null, false, { message: 'Incorrect password' });
    }
    return done(null, user);
  } catch (error) {
    if (error) {
      return done(error);
    }
  }
};

export const login = async (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.status(404).json({
        code: 404,
        data: {
          message: 'User not found',
        },
      });
    }
    const preparedUser = omit(user.toObject(), ['password']);
    req.logIn(preparedUser, (err) => {
      if (err) return next(err);
      return res.json({
        code: 200,
        data: {
          user: preparedUser,
        },
      });
    });
  })(req, res, next);
};

export const register = async (req, res) => {
  const data = pick(req.body, ['displayName', 'password', 'email']);
  data.username = data.displayName.toLowerCase().trim();
  try {
    const user = await new UserModel(data);
    const result = await user.save();
    res.json({
      code: 200,
      data: {
        user: omit(result, ['password']),
      },
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      data: {
        message: error,
      },
    });
  }
};

export const logout = async (req, res) => {
  req.logout();
  res.json({
    code: 200,
    data: {
      message: 'ok',
    },
  });
};

export const check = async (req, res) => {
  const { email } = req.body;
  if (req.body && Object.keys(req.body).length === 0) return res.json({
    code: 500,
    data: {
      message: 'Body not provided',
    },
  });
  
  const users = await UserModel.find(req.body);
  if (Array.isArray(users) && users.length === 0) {
    return res.json({
      code: 200,
      data: {
        message: 'Доступно для регистрации',
      },
    });
  }
  return res.json({
    code: 400,
    data: {
      message: 'Уже зарегистрирован',
    },
  });
};
