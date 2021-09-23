import { Router } from 'express';

const upload = Router();

upload.post('/', async (req, res) => {
    res.json({msg: 'Path hit for file upload!'})
});

export default upload;
