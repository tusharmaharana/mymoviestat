export const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else res.status(401).redirect('/login');
};

export const forbidAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else res.status(400).send({ message: 'You are already logged in' });
};
