import { Schema, model } from 'mongoose';

export type UserType = {
  id: string;
  username: string;
  saltWithHash: string;
};

export type UserSchema = {
  username: string;
  saltWithHash: string;
};

const userSchema = new Schema<UserSchema>(
  {
    username: { type: String, required: true },
    saltWithHash: { type: String, required: true },
  },
  {
    toObject: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
      },
      virtuals: true,
    },
  },
);

const User = model<UserSchema>('User', userSchema);

export default User;
