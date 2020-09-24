const { Router } = require("express");
const passport = require("passport");
const validate = require("../middleware/validation");
const { signinSchema, signupSchema } = require("../config/yup");
const { forbidAuth, ensureAuth } = require("../middleware/inspectAuth");

const router = Router();

router.get("/signOut", ensureAuth, (req, res) => {
  req.logOut();
  res.redirect("/");
});

router.use(forbidAuth);

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
    failureRedirect: "/",
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
    failureRedirect: "/",
  })
);

router.post(
  "/signUp",
  validate(signupSchema),
  passport.authenticate("signup", {
    successRedirect: "/",
    failureRedirect: "/signUp",
  })
);

router.post(
  "/signIn",
  validate(signinSchema),
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signIn",
  })
);

module.exports = router;
