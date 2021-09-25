import { Router } from 'express';
import path from 'path';

import checkUser from '../middleware/checkUser.js';

const html = Router();

const __dirname = path.resolve();

html.get('/profile', checkUser, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/profile.html'));
});

html.get('/login', checkUser, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

html.get('/register', checkUser, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/register.html'));
});

html.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

export default html;
