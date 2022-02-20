import { model, Schema } from 'mongoose';
import { StatusEnum } from '../constants';

export const Status = model(
  'status',
  new Schema({
    status: {
      type: String,
      enum: [StatusEnum.watching, StatusEnum['want-to-see'], StatusEnum.seen, StatusEnum['on-hold']]
    },
    movieId: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  })
);
