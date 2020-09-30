import cookieSession from 'cookie-session';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import keys from './config/keys';
import authRoutes from './routes/authRoutes';
import listRoutes from './routes/listRoutes';
import './services/passport';

const app = express();

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

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.get('/api/me', (req, res) => {
  res.send(req.user);
});
app.use('/api/list', listRoutes);

app.listen(keys.port, () => console.log(`Listening on PORT ${keys.port}`));
