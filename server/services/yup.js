import * as yup from 'yup';
import { StatusEnum, TypeEnum } from '../constants';

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
    .matches(new RegExp(StatusEnum['want-to-see'] | StatusEnum.watching | StatusEnum.seen | StatusEnum['on-hold']))
    .notRequired(),
  type: yup
    .string()
    .matches(new RegExp(TypeEnum.movie | TypeEnum.series | TypeEnum.episode))
    .required(),
  year: yup.string(),
  imdbRating: yup.mixed().test('is-decimal', 'not a decimal number', val => !isNaN(val)),
  poster: yup.string()
};
