import { Router } from 'express';

import db from '../../models/index.js';
import passport from '../../middleware/passport.js';

const users = Router();

users.get('/', (req, res) => {
  if (req.user) {
    console.log(`User is already logged in: ${req.user.first}!`);
    const userProfile = {
      full: req.user.full,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt,
      email: req.user.email,
      image: req.user.image,
    };
    return res.json(userProfile);
  } else {
    console.error('There was an error!');
    return res.status(422).json({ msg: 'No user logged in!' });
  }
});

users.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req.user);
  if (req.user) {
    console.log(`User ${req.user.first} is now logged in!`);
    return res.json({ msg: `Successful login of user!` });
  } else {
    console.error('Couldnt login user!');
    return res.status(422).json({ msg: 'Couldnt authenticate user!' });
  }
});

users.post('/register', async ({ body }, res) => {
  try {
    const user = await db.User.create(body);
    console.log(`User ${user.first} is now registered!`);
    return res.json({ msg: `Successful register of user!` });
  } catch (error) {
    console.error(`Couldnt register user: ${error}`);
    return res.status(422).json({ msg: `Couldnt register user: ${error}` });
  }
});

export default users;
