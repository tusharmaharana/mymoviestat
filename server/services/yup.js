import * as yup from 'yup';

export const signupSchema = {
  name: yup.string().min(3).max(50).trim().required(),
  email: yup.string().min(5).max(255).email().required(),
  password: yup.string().min(8).max(255).required()
};

export const signinSchema = {
  email: yup.string().min(5).max(255).email().required(),
  password: yup.string().min(8).max(255).required()
};

export const recordSchema = {
  title: yup.string().min(1).max(50).required(),
  imdbID: yup.string().required(),
  favourite: yup.boolean().default(false),
  status: yup
    .string()
    .matches(/(WANT_TO_SEE|WATCHING|SEEN|ON_HOLD)/)
    .notRequired(),
  type: yup
    .string()
    .matches(/(MOVIE|SERIES|EPISODE)/)
    .required(),
  year: yup.string(),
  imdbRating: yup.mixed().test('is-decimal', 'not a decimal number', val => !isNaN(val)),
  poster: yup.string()
};
