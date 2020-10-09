import { model, Schema } from 'mongoose';

export const Favorite = model(
  'favorites',
  new Schema({
    movieId: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  })
);
