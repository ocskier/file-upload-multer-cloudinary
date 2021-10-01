import { unlink } from 'fs/promises';
import { Router } from 'express';

import db from '../../models/index.js';
import cloudinary from '../../config/cloudinary.js';
import uploader from '../../middleware/multer.js';

const upload = Router();

upload.post('/', uploader.single('image-file'), async (req, res) => {
  if (req.user) {
    try {
      if (req.user.image) {
        const { result: ok } = await cloudinary.uploader.destroy(
          req.user.image_public_id
        );
      }
      const result = await cloudinary.uploader.upload(
        process.env.NODE_ENV === 'production'
          ? `./server/temp/${req.file.filename}`
          : `./temp/${req.file.filename}`
      );
      await unlink(
        process.env.NODE_ENV === 'production'
          ? `./server/temp/${req.file.filename}`
          : `./temp/${req.file.filename}`
      );
      console.log(`Successfully deleted ${req.file.filename}`);
      const user = await db.User.findByIdAndUpdate(req.user.id, {
        image: result.secure_url,
        image_public_id: result.public_id,
      }).select('-password -__v');
      req.login(user, function (err) {
        if (err) {
          console.error('There was an error:', err);
          return res.status(422).json({ msg: `There was an error: ${err}` });
        }
        return res.json({ msg: 'Completed file upload!' });
      });
    } catch (error) {
      console.error('There was an error:', error);
      return res.status(422).json({ msg: `There was an error: ${error}` });
    }
  } else {
    console.error('There was an error: User not logged in!');
    return res
      .status(422)
      .json({ msg: `There was an error: User not logged in!` });
  }
});

export default upload;
