import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import db from '../models/index.js';

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  console.log(_id);
  const matchingUser = await db.User.findById(_id).select('-password -__v');
  done(null, matchingUser);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await db.User.findOne({ email }).exec();
        if (!user) {
          return done(null, false, {
            message: 'Incorrect email.',
          });
        }
        const validPwd = await user.verifyPassword(password);
        if (!validPwd) {
          return done(null, false, {
            message: 'Incorrect password.',
          });
        }
        return done(null, user);
      } catch (err) {
        console.log(`There was an error in passport: ${err}`);
        return done(err);
      }
    }
  )
);

export default passport;
