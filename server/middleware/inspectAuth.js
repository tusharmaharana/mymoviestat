import HttpStatusCode from '../utils/HTTPStatusCode';

export const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else res.status(HttpStatusCode.UNAUTHORIZED).send({ error: 'not authorized' });
};

export const forbidAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else res.status(400).send({ message: 'You are already logged in' });
};
