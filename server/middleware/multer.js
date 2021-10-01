import fs from 'fs';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(path.resolve());
    cb(
      null,
      path.resolve(
        path.resolve(),
        process.env.NODE_ENV === 'production' ? './server/temp' : './temp'
      )
    );
  },
});

const uploader = multer({ storage: storage });

export default uploader;
