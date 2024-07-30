const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const articlesPath = path.join(__dirname, '../data/articles.json');

// read JSON datafile function
const readJsonFile = () => {
    return JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
  };

// GET all articles in JSON format from the datafile
router.get('/data', (req, res) => {
    try {
        const articles = readJsonFile();
        console.log('Sending articles data:', articles);
        res.json(articles);
    } catch (error) {
        console.error('Error reading articles data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


// GET a single article by id in JSON format from the datafile
router.get('/:id/data', (req, res) => {
    try {
        const articles = readJsonFile();
        const article = articles.find(a => a.id === req.params.id);
        if (!article) {
            console.log(`Article with id ${req.params.id} not found`);
            return res.status(404).json({ error: 'Article not found' });
        }
        console.log(`Sending article data for id ${req.params.id}:`, article);
        res.json(article);
    } catch (error) {
        console.error('Error reading article data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

//route to create a new article
router.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/create.html'));
  });

// route to view a single article by id
router.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/article.html'));
});

// route to view all articles
router.get('/', (req, res) => {
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

module.exports = router;
