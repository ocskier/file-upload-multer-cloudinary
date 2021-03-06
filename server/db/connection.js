import chalk from 'chalk';
import mongoose from 'mongoose';

mongoose.connect(
  process.env.MONGODB_URL || 'mongodb://localhost:27017/cloudinary-storage',
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set('debug', (collectionName, methodName, ...methodArgs) =>
  console.info(
    chalk.bold.black.bgWhite(
      `Mongoose: ${collectionName} - ${methodName}(${JSON.stringify(
        methodArgs
      )})`
    )
  )
);

const db = mongoose.connection;

export function connectToDB(cb) {
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log(
      chalk.bold.green.bgGrey(
        `Successful connection to ${
          process.env.MONGODB_URL ||
          'mongodb://localhost:27017/cloudinary-storage'
        }`
      )
    );
    cb();
  });
}
