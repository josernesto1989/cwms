import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  name: string;
  email: string;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export const UserModel = mongoose.model<User>('User', userSchema);