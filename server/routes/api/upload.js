import { unlink } from 'fs/promises';
import { Router } from 'express';

import cloudinary from '../../config/cloudinary.js';
import uploader from '../../middleware/multer.js';

const upload = Router();

upload.post('/', uploader.single('image-file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      `./server/test/${req.file.filename}`
    );
    await unlink(`./server/test/${req.file.filename}`);
    console.log(`Successfully deleted ${req.file.filename}`);
    res.json({ msg: 'Completed file upload!' });
  } catch (error) {
    console.error('There was an error:', error.message);
    res.status(422).json({ msg: `There was an error: ${error.message}` });
  }
});

export default upload;
