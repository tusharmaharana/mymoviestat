const { Router } = require("express");
const passport = require("passport");
const validate = require("../middleware/validation");
const { signinSchema, signupSchema } = require("../config/yup");

const router = Router();

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.post(
  "/user/signup",
  validate(signupSchema),
  passport.authenticate("signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
  })
);

router.post(
  "/user/signin",
  validate(signinSchema),
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
  })
);

router.get("/api/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

router.get("/api/detail", (req, res) => {
  res.send(req.user);
});

module.exports = router;
