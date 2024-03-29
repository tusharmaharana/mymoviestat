import cookieSession from 'cookie-session';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import keys from './config/keys';
import { ensureAuth } from './middleware';
import { authRouter, favoriteRouter, movieRouter, statusRouter } from './routes';
import './services/passport';

const app = express();

app.use(
  cors({
    origin: keys.clientUri,
    credentials: true
  })
);
app.enable('trust proxy');
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// Mongoose Initialization
mongoose
  .connect(keys.dbHost, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error while connecting to MongoDB', err));

app.set('trust proxy', 1);

//Cookies Session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
    httpOnly: false
  })
);

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

//Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/current-user', (req, res) => {
  if (req.user) {
    const { name = {}, email = {} } = req.user;
    res.send({ name, email });
  } else res.send(req.user);
});
app.use('/api/auth', authRouter);
app.use('/api/movies', movieRouter);
app.use('/api/status/movies', ensureAuth, statusRouter);
app.use('/api/favorite/movies', ensureAuth, favoriteRouter);

//PRODUCTION ROUTE
// if (process.env.NODE_ENV === 'production') {
//   const root = path.join(__dirname, '..', 'client', 'build');

//   app.use(express.static(root));
//   app.get('*', (req, res) => {
//     res.sendFile('index.html', { root });
//   });
// }
// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm i --prefix client && npm run build --prefix client"

app.listen(keys.port, () => console.log(`Listening on PORT ${keys.port}`));
