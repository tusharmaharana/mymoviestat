const keys = {
  dbHost: process.env.MONGODB_URI,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  facebookAppId: process.env.FACEBOOK_APP_ID,
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
  cookieKey: process.env.COOKIE_KEY,
  clientUri: process.env.CLIENT_URI,
  port: process.env.PORT || 8080
};

export default keys;
