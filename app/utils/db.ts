import mongoose from 'mongoose';

const { DB_URI = '' } = process.env;

export default () => {
  mongoose.connect(DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('error', console.error.bind(console, '> DB connection error:'));
  mongoose.connection.once('open', () => {
    console.log('> DB connection successful');
  });
};
