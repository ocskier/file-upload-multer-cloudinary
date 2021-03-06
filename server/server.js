import chalk from 'chalk';
import express from 'express';
import session from 'express-session';
import mongoSession from 'connect-mongodb-session';
import morgan from 'morgan';
import path from 'path';

import { connectToDB } from './db/connection.js';
import passport from './middleware/passport.js';
import router from './routes/index.js';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(
  morgan((tokens, req, res) => {
    return (
      '--> ' +
      [
        chalk.white.bgGray.bold(tokens.method(req, res)),
        tokens.status(req, res) >= 400
          ? chalk.rgb(248, 8, 8).bold.bgGray(tokens.status(req, res))
          : tokens.status(req, res) >= 300 && tokens.status(req, res) < 400
          ? chalk.rgb(253, 216, 4).bold.bgGray(tokens.status(req, res))
          : chalk.bold.rgb(31, 230, 38).bgGray(tokens.status(req, res)),
        chalk.white.bgGray(tokens.url(req, res)),
      ].join(' ')
    );
  })
);

const MongoDBStore = mongoSession(session);
const store = new MongoDBStore({
  uri:
    process.env.MONGODB_URL || 'mongodb://localhost:27017/cloudinary-storage',
  collection: 'mongo-sessions',
});
// Catch errors
store.on('error', function (error) {
  console.log(error);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: 'storage secret',
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
    },
    store: store,
    resave: true,
    saveUninitialized: true,
    connectionOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  })
);
app.use(
  express.static(
    path.join(
      path.resolve(),
      process.env.NODE_ENV === 'production' ? './public' : '../public'
    )
  )
);
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

connectToDB(() =>
  app.listen(PORT, () => {
    if (process.env.NODE_ENV === 'production') {
      console.log('Production server started!');
    } else {
      console.log(`Now browse to http://localhost:${PORT}`);
    }
  })
);
