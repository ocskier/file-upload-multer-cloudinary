import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import validator from 'validator';
const { Schema, model } = mongoose;
const { isEmail } = validator;

const saltRounds = 10;
const emptyStr = 'You must supply a valid string';

const UserSchema = new Schema(
  {
    first: {
      type: String,
      required: [true, emptyStr],
      trim: true,
      minLength: 1,
    },
    last: {
      type: String,
      required: [true, emptyStr],
      trim: true,
      minLength: 1,
    },
    email: {
      type: String,
      required: [true, emptyStr],
      trim: true,
      validate: {
        validator: function (v) {
          return isEmail(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      minLength: 7,
      unique: true,
    },
    password: {
      type: String,
      required: [true, emptyStr],
      trim: true,
      minLength: 8,
    },
  },
  { timestamps: true }
);

UserSchema.virtual('full').get(function () {
  return this.first + ' ' + this.last;
});

UserSchema.pre('save', function (next, done) {
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    // Store hash in your password DB.
    if (err) {
      next(new Error(err));
    } else {
      this.password = hash;
      next();
    }
  });
});

UserSchema.method('verifyPassword', async function (rawPassword) {
  const result = await bcrypt.compare(rawPassword, this.password);
  return result;
});

const User = model('User', UserSchema);
export default User;
