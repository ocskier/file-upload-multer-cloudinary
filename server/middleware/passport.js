import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

// import db from '../models/index.js';

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  console.log(_id);
  // const matchingUser = await db.User.findById(_id).populate('messages');
  done(null, _id);
});

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      // const user = await User.findOne({ username: username });
      // if (!user) {
      //   return done(null, false);
      // }
      // if (!user.verifyPassword(password)) {
      //   return done(null, false);
      // }
      // test user
      const user = { id: 1, username: 'newuser', password: 'newpassword' };
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

export default passport;
