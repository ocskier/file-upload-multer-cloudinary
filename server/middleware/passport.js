import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

// import db from '../models/index.js';

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  console.log(_id);
  const matchingUser = await db.User.findById(_id).select('-password -__v');
  done(null, matchingUser);
});

passport.use(
  new LocalStrategy(async function (email, password, done) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

export default passport;
