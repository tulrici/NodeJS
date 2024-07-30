// init project
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const articlesRouter = require('./routes/articles');

const app = express();
const port = 3000;

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/articles', articlesRouter);

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});