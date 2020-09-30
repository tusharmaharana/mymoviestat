import * as yup from 'yup';

export const validate = schema => {
  return async (req, res, next) => {
    try {
      const body = await yup.object().shape(schema).strict(true).noUnknown().validate(req.body, { abortEarly: false });
      req.body = body;
      next();
    } catch (err) {
      console.error(err);
      res.status(400).send(err.message);
    }
  };
};
