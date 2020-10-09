import { model, Schema } from 'mongoose';
import { TypeEnum } from '../constants';

export const List = model(
  'movie',
  new Schema({
    title: {
      type: String,
      trim: true,
      required: true
    },
    year: {
      type: String,
      trim: true,
      required: true
    },
    rated: {
      type: String,
      trim: true,
      required: true
    },
    released: {
      type: String,
      trim: true,
      required: true
    },
    runtime: {
      type: String,
      trim: true,
      required: true
    },
    genre: {
      type: String,
      trim: true,
      required: true
    },
    director: String,
    writer: {
      type: String,
      trim: true,
      required: true
    },
    actors: {
      type: String,
      trim: true,
      required: true
    },
    plot: {
      type: String,
      trim: true,
      required: true
    },
    language: {
      type: String,
      trim: true,
      required: true
    },
    country: String,
    awards: String,
    poster: {
      type: String,
      trim: true,
      required: true
    },
    imdbRating: {
      type: Number,
      min: 1,
      max: 10
    },
    imdbID: {
      type: String,
      unique: true,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: [TypeEnum.movie, TypeEnum.series, TypeEnum.episode]
    },
    production: String,
    favourite: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: [StatusEnum.watching, StatusEnum['want-to-see'], StatusEnum.seen, StatusEnum['on-hold']]
    }
  })
);
