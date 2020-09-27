import * as yup from 'yup';

const getSchema = body => yup.object().shape(body).strict(true).noUnknown();

export const signupSchema = getSchema({
  name: yup.string().min(3).max(50).trim().required(),
  email: yup.string().min(5).max(255).email().required(),
  password: yup.string().min(8).max(255).required()
});

export const signinSchema = getSchema({
  email: yup.string().min(5).max(255).email().required(),
  password: yup.string().min(8).max(255).required()
});
