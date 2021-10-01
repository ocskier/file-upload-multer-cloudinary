import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
import findConfig from 'find-config';
config({ path: findConfig('.env') });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default cloudinary;
