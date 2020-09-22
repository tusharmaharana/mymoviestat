const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/auth/google/callback", passport.authenticate("google"));

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

router.get("/api/logout", (req, res) => {
  req.logOut();
});

module.exports = router;
