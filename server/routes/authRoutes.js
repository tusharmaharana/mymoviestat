const { Router } = require("express");
const passport = require("passport");
const validate = require("../middleware/validation");
const { signinSchema, signupSchema } = require("../config/yup");

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.post(
  "/signUp",
  validate(signupSchema),
  passport.authenticate("signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
  })
);

router.post(
  "/signIn",
  validate(signinSchema),
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
  })
);

router.get("/signOut", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
