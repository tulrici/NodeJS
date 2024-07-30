const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const articlesPath = path.join(__dirname, '../data/articles.json');

// read JSON datafile function
const readJsonFile = () => {
    return JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
  };

//route to create a new article
router.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/create.html'));
});

// route to view a single article by id
router.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/article.html'));
});

// route to view all articles
router.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/articles.html'));
    });

// POST article creation
router.post('/create', (req, res) => {
  const { name, code, description, image, price, quantity } = req.body;
  const articles = readJsonFile();
  const newArticle = { id: Date.now().toString(), name, code, description, image, price, quantity };
  articles.push(newArticle);
  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));
  res.redirect('/articles');
});

// GET all articles in JSON format from the datafile
router.get('/', (req, res) => {
    const articles = readJsonFile();
    res.json(articles);
  });

// GET a single article by id in JSON format from the datafile
router.get('/:id/data', (req, res) => {
    const articles = readJsonFile();
    const article = articles.find(a => a.id === req.params.id);
    if (!article) {
        return res.status(404).send('Article not found');
    }
    else {
        res.json(article);
    }
});


module.exports = router;
