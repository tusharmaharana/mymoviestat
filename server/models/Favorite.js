import { model, Schema } from 'mongoose';

export const Favorite = model(
  'favorites',
  new Schema({
    movieId: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  })
);
