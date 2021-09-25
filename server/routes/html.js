import { Router } from 'express';
import path from 'path';

const html = Router();

const __dirname = path.resolve();

html.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/profile.html'));
});

html.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

html.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/register.html'));
});

html.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

export default html;
