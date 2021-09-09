import { Router } from 'express';
import passport from 'passport';
import { forbidAuth, validate } from '../middleware';
import { signinSchema, signupSchema } from '../services/yup';
import HttpStatusCode from '../utils/HTTPStatusCode';

const router = Router();

router.get('/signOut', (req, res) => {
  req.logOut();
  res.status(200).send({ message: 'Logged Out!' });
});

router.use(forbidAuth);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email']
  })
);

router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/' }));

// router.post('/signUp', validate(signupSchema), passport.authenticate('signup'));

router.post('/signUp', validate(signupSchema), async (req, res, next) => {
  return passport.authenticate('signup', (error, user) => {
    if (error) return res.status(HttpStatusCode.BAD_REQUEST).send(error);
    return res.status(200).send(user);
  })(req, res, next);
});

router.post('/signIn', validate(signinSchema), async (req, res, next) => {
  return passport.authenticate('local', (error, user) => {
    if (error || !user) return res.status(400).send({ email: ' ', password: 'Wrong email or password!' });
    return req.login(user, err => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(user);
    });
  })(req, res, next);
});

export default router;
