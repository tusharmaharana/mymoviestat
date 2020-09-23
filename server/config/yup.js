const yup = require("yup");

const signupSchema = yup.object().shape({
  name: yup.string().min(3).max(50).trim().required(),
  email: yup.string().min(5).max(255).email().required(),
  password: yup.string().min(8).max(255).required(),
});

const signinSchema = yup.object().shape({
  email: yup.string().min(5).max(255).email().required(),
  password: yup.string().min(8).max(255).required(),
});

exports.signupSchema = signupSchema;
exports.signinSchema = signinSchema;
