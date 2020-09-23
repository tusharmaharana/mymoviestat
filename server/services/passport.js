const passport = require("passport");
const User = require("../models/User");
const GoogleStratergy = require("passport-google-oauth20").Strategy;
const FacebookStratergy = require("passport-facebook").Strategy;
const keys = require("../config/keys");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, user));
});

passport.use(
  new GoogleStratergy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let existingUser = await User.findOne({
        email: profile.emails[0].value,
      });
      if (existingUser) {
        if (!existingUser.googleId)
          existingUser = await existingUser
            .set({ googleId: profile.id })
            .save();
        done(null, existingUser);
      } else {
        const user = await new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        }).save();
        done(null, user);
      }
    }
  )
);

passport.use(
  new FacebookStratergy(
    {
      clientID: keys.facebookAppId,
      clientSecret: keys.facebookAppSecret,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "emails"],
    },
    async (accessToken, refreshToken, profile, done) => {
      let existingUser = await User.findOne({
        $or: [{ email: profile.emails[0].value }, { facebookId: profile.id }],
      });
      if (existingUser) {
        if (!existingUser.facebookId)
          existingUser = await existingUser
            .set({ facebookId: profile.id })
            .save();
        done(null, existingUser);
      } else {
        const user = await new User({
          facebookId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        }).save();
        done(null, user);
      }
    }
  )
);
