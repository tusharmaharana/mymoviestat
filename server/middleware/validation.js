import * as yup from 'yup';

export const validate = (schema, property) => {
  return async (req, res, next) => {
    try {
      await yup.object().shape(schema).strict(true).validate(req[property], { abortEarly: false, stripUnknown: false });
      next();
    } catch (err) {
      console.error(err);
      res.status(400).send(err.message);
    }
  };
};
