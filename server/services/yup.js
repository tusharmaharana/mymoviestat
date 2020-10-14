import * as yup from 'yup';
import { StatusEnum, TypeEnum } from '../constants';
import { IsValidMongoId } from '../utils';

export const signupSchema = {
  name: yup.string().min(3).max(50).trim().required(),
  email: yup.string().min(5).max(255).email().required(),
  password: yup.string().min(8).max(255).required()
};

export const signinSchema = {
  email: yup.string().min(5).max(255).email().required(),
  password: yup.string().min(8).max(255).required()
};

export const movieSchema = {
  title: yup.string().min(1).max(50).required(),
  year: yup.string().required(),
  rated: yup.string().required(),
  released: yup.string().required(),
  runtime: yup.string().required(),
  genre: yup.string().required(),
  director: yup.string(),
  writer: yup.string().required(),
  actors: yup.string().required(),
  plot: yup.string().required(),
  language: yup.string().required(),
  country: yup.string(),
  awards: yup.string(),
  poster: yup.string().required(),
  imdbRating: yup.mixed().test('is-decimal', 'not a decimal number', val => !isNaN(val)),
  imdbID: yup.string().required(),
  type: yup
    .string()
    .matches(new RegExp(`${TypeEnum.movie}|${TypeEnum.series}|${TypeEnum.episode}`))
    .required(),
  production: yup.string()
};

export const listSchema = {
  status: yup
    .string()
    .matches(
      new RegExp(`${StatusEnum['want-to-see']}|${StatusEnum.watching}|${StatusEnum.seen}|${StatusEnum['on-hold']}`)
    )
    .required(),
  movieId: yup.string().test('validateMongoId', 'Invalid MongoId', IsValidMongoId).required()
};

export const querySchema = {
  sortBy: yup.string().matches(new RegExp('want-to-see|watching}|seen|on-hold')),
  type: yup.string().matches(new RegExp('movie|series|episode')).notRequired()
};

export const idSchema = {
  id: yup.string().test('validateMongoId', 'Invalid MongoId', IsValidMongoId).required()
};
