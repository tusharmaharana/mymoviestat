import * as yup from 'yup';

export const validate = (schema, validationObj) => {
  return async (req, res, next) => {
    try {
      await yup.object().shape(schema).strict(true).noUnknown().validate(validationObj, { abortEarly: false });
      next();
    } catch (err) {
      console.error(err);
      res.status(400).send(err.message);
    }
  };
};
