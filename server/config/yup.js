const yup = require("yup");

const signup = {
  name: yup.string().min(3).max(50).trim().required(),
  email: yup.string().min(5).max(255).email().required(),
  password: yup.string().min(8).max(255).required(),
};

const signin = {
  email: yup.string().min(5).max(255).email().required(),
  password: yup.string().min(8).max(255).required(),
};

const record = {
  title: yup.string().min(1).max(50).required(),
  imdbID: yup.number().required(),
  favourite: yup.boolean().default(false),
  status: yup
    .string()
    .matches(/(want to see|watching|seen|on hold)/)
    .defined(),
  type: yup
    .string()
    .matches(/(movie|series|episode)/)
    .required(),
};

const getSchema = (body) => yup.object().shape(body).strict(true).noUnknown();

exports.signupSchema = getSchema(signup);
exports.signinSchema = getSchema(signin);
exports.recordSchema = getSchema(record);
