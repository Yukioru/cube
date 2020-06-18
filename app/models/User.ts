import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUserSchema extends Document {
  email: string;
  password: string;
  username: string;
  displayName: string;
}

const UserSchema: Schema = new Schema({
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

UserSchema.pre<IUserSchema>('save', function (next) {
  if(!this.isModified('password')) {
      return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function comparePassword(plaintext: string): Promise<boolean> {
  const isEqual = await bcrypt.compare(plaintext, this.password);
  return isEqual;
};

export default model<IUserSchema>('user', UserSchema);
