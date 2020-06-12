import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', function (next) {
  if(!this.isModified('password')) {
      return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function comparePassword(plaintext) {
  const isEqual = await bcrypt.compare(plaintext, this.password);
  return isEqual;
};

export default model('user', UserSchema);
