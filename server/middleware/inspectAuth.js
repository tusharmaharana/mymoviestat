module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else res.status(401).redirect("/login");
  },

  forbidAuth: (req, res, next) => {
    if (!req.isAuthenticated()) {
      next();
    } else res.status(405).send({ message: "You are already logged in" });
  },
};
