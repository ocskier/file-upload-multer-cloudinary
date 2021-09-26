import { unlink } from 'fs/promises';
import { Router } from 'express';

import cloudinary from '../../config/cloudinary.js';
import uploader from '../../middleware/multer.js';

const upload = Router();

upload.post('/', uploader.single('image-file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      `./temp/${req.file.filename}`
    );
    await unlink(`./temp/${req.file.filename}`);
    console.log(`Successfully deleted ${req.file.filename}`);
    return res.json({ msg: 'Completed file upload!' });
  } catch (error) {
    console.error('There was an error:', error);
    return res.status(422).json({ msg: `There was an error: ${error}` });
  }
});

export default upload;
