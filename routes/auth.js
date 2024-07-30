const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersPath = path.join(__dirname, '../data/users.json');

// route to login
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

// route to register
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/register.html'));
});

// route to welcome
router.get('/welcome', (req, res) => {
  if (req.session.username) {
    res.sendFile(path.join(__dirname, '../views/welcome.html'));
  } else {
    res.redirect('/auth/login');
  }
});

// register new user
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    // test if the user already exists
    if (users.find(user => user.username === username)) {
    return res.status(400).send('User already exists');
    }
  users.push({ username, password });
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  res.redirect('/auth/login');
});

// login user
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
  const user = users.find(user => user.username === username && user.password === password);
  
  if (user) {
    req.session.username = user.username;
    res.redirect('/auth/welcome');
  } else {
    res.status(401).send('Invalid username or password');
  }
});

// logout user
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');


});

module.exports = router;
