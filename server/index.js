import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import keys from './config/keys';
import passport from 'passport';
import authRoutes from './routes/authRoutes';

const app = express();

mongoose
  .connect(keys.dbHost, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
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

app.listen(keys.port, () => console.log(`Listening on PORT ${keys.port}`));
