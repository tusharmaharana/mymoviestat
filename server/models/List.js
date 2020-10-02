import { model, Schema } from 'mongoose';
import { StatusEnum, TypeEnum } from '../constants';

export const List = model(
  'lists',
  new Schema({
    title: {
      type: String,
      trim: true,
      required: true
    },
    imdbID: {
      type: String,
      unique: true,
      required: true
    },
    favourite: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: [StatusEnum.watching, StatusEnum['want-to-see'], StatusEnum.seen, StatusEnum['on-hold']]
    },
    type: {
      type: String,
      required: true,
      enum: [TypeEnum.movie, TypeEnum.series, TypeEnum.episode]
    },
    year: String,
    imdbRating: {
      type: Number,
      min: 1,
      max: 10
    },
    poster: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  })
);
