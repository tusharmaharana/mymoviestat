const validate = (schema) => {
  return async (req, res, next) => {
    try {
      const body = await schema.validate(req.body);
      req.body = body;
      next();
    } catch (err) {
      res.status(400).send(err.message);
    }
  };
};

module.exports = validate;
