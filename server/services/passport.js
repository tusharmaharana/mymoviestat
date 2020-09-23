const passport = require("passport");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
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
  new GoogleStrategy(
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
  new FacebookStrategy(
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

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return done(null, false, { message: "This email-id is already taken" });
      else {
        const { name } = req.body;
        const user = await new User({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        done(null, user);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user)
          return done(null, false, { message: "Invalid Email or Password" });

        const validPassword = bcrypt.compare(password, user.password);
        if (!validPassword)
          return done(null, false, { message: "Invalid Email or Password" });

        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);
