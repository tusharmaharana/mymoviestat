const keys = {
  dbHost: process.env.DB_HOST,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  facebookAppId: process.env.FACEBOOK_APP_ID,
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
  cookieKey: process.env.COOKIE_KEY,
  port: process.env.PORT || 5000
};

export default keys;
