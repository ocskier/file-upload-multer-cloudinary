import { Router } from 'express';
import path from 'path';

import checkUser from '../middleware/checkUser.js';

const html = Router();

let __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  __dirname = path.join(__dirname, './server');
}

html.get('/profile', checkUser, (req, res) => {
  return res.sendFile(path.join(__dirname, '../public/profile.html'));
});

html.get('/login', (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  return res.sendFile(path.join(__dirname, '../public/login.html'));
});

html.get('/register', (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  return res.sendFile(path.join(__dirname, '../public/register.html'));
});

html.get('/logout', (req, res) => {
  req.logout();
  return res.redirect('/');
});

html.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default html;
