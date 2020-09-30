import { model, Schema } from 'mongoose';

const List = model(
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
      enum: ['WANT_TO_SEE', 'WATCHING', 'SEEN', 'ON_HOLD']
    },
    type: {
      type: String,
      required: true,
      enum: ['MOVIE', 'SERIES', 'EPISODE']
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

export default List;
