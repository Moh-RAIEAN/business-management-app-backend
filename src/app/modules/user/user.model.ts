import { CallbackError, Schema, Types, model } from 'mongoose';
import { IUser, IUserModel } from './user.interface';
import applyDefaultSchema from '../../../helpers/applyDefaultSchema';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser>(
  {
    userId: {
      type: String,
      requried: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'seller', 'stuff'],
    },
    password: {
      type: String,
      required: true,
    },
    admin: { type: Types.ObjectId, ref: 'Admin' },
    seller: { type: Types.ObjectId, ref: 'Seller' },
    stuff: { type: Types.ObjectId, ref: 'Stuff' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.pre('save', async function (next) {
  try {
    const password = this.password;
    const hashedPassword = await bcrypt.hash(password, 12);
    this.password = hashedPassword;
  } catch (error) {
    next(error as CallbackError);
  }
  next();
});

userSchema.statics.comparePassword = async function (
  givenpassword: string,
  savedPassword: string,
) {
  const isPasswordMatched: boolean = await bcrypt.compare(
    givenpassword,
    savedPassword,
  );
  return isPasswordMatched;
};
applyDefaultSchema(userSchema);

const User = model<IUser, IUserModel>('User', userSchema);

export default User;
