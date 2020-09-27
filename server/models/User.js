import { model, Schema } from 'mongoose';

const User = model(
  'users',
  new Schema({
    googleId: String,
    facebookId: String,
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
      trim: true
    },
    email: { type: String, minlength: 5 },
    password: { type: String, minlength: 8, maxlength: 255 }
  })
);

export default User;
