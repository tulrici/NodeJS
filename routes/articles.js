const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const articlesPath = path.join(__dirname, '../data/articles.json');

router.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/create.html'));
});

router.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/article.html'));
});

router.get('/articles', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/articles.html'));
    });

// read JSON datafile
const readJsonFile = () => {
  return JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
};

// POST article creation
router.post('/create', (req, res) => {
  const { name, code, description, image, price, quantity } = req.body;
  const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
  const newArticle = { id: Date.now().toString(), name, code, description, image, price, quantity };
  articles.push(newArticle);
  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));
  res.redirect('/articles');
});

// GET all articles
router.get('/', (req, res) => {
    const articles = readJsonFile();
    res.json(articles);
  });

// GET a single article by id
router.get('/:id', (req, res) => {
    const articles = readJsonFile();
    const article = articles.find(a => a.id === req.params.id);
    res.json(article);
});

// Crete a html element for each article from the JSON file
function createArticleCards(data) {}


module.exports = router;
