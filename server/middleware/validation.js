import { validateInput } from '../services/yup';

export const validate = schema => {
  return async (req, res, next) => {
    try {
      const body = await validateInput(schema, req.body);
      req.body = body;
      next();
    } catch (err) {
      console.error(err);
      res.status(400).send(err.message);
    }
  };
};
