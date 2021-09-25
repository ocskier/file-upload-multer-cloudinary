import { Router } from 'express';

import passport from '../../middleware/passport.js';

const users = Router();

users.get('/', async (req, res) => {
  if (req.user) {
    console.log(`User is already logged in: ${req.user.first}!`);
    res.json(req.user);
  } else {
    console.error('There was an error!');
    res.status(422).json({ msg: 'No user logged in!' });
  }
});

users.post('/login', passport.authenticate, async (req, res) => {
  if (req.user) {
    console.log(`User ${req.user.first} is now logged in!`);
    res.json({ msg: `Successful login of user!` });
  } else {
    console.error('Couldnt login user!');
    res.status(422).json({ msg: 'Couldnt authenticate user!' });
  }
});

users.post('/register', async ({ body }, res) => {
  try {
    const user = await db.User.create(body);
    console.log(`User ${user.first} is now registered!`);
    res.json({ msg: `Successful register of user!` });
  } catch (error) {
    console.error('Couldnt register user!');
    res.status(422).json({ msg: 'Couldnt register user!' });
  }
});

export default users;
