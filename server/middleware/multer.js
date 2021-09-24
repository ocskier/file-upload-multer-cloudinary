import fs from 'fs';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, path.resolve(path.resolve(), './server/test'));
  },
});

const uploader = multer({ storage: storage });

export default uploader;
