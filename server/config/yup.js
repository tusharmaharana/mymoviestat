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

const getSchema = (body) => yup.object().shape(body).strict(true).noUnknown();

exports.signupSchema = getSchema(signup);
exports.signinSchema = getSchema(signin);
