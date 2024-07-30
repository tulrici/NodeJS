document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Check if we're on the articles list page
  if (window.location.pathname === '/articles') {
      loadAllArticles();
  } 
  // Check if we're on a single article page
  else if (window.location.pathname.startsWith('/articles/') && window.location.pathname !== '/articles/create') {
      loadSingleArticle();
  }
});

function loadAllArticles() {
  console.log('Fetching articles...');

  fetch('/articles/data')
      .then((res) => {
          console.log('Response status:', res.status);
          console.log('Response headers:', res.headers);
          if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.text(); // Use text() instead of json() to see raw content
      })
      .then(text => {
          console.log('Raw response:', text);
          try {
              return JSON.parse(text);
          } catch (e) {
              console.error('JSON parse error:', e);
              throw new Error('Invalid JSON response');
          }
      })
      .then(data => {
          console.log('Parsed data:', data);
          const articlesList = document.getElementById('articles-list');
          if (!articlesList) {
              console.error('articles-list element not found');
              return;
          }
          articlesList.innerHTML = ''; // Clear existing content
          data.forEach(article => {
              const articleCard = createArticleCard(article);
              articlesList.appendChild(articleCard);
          });
      })
      .catch(error => {
          console.error('Error fetching articles:', error);
          const articlesList = document.getElementById('articles-list');
          if (articlesList) {
              articlesList.innerHTML = `<p>Une erreur est survenue lors du chargement des articles: ${error.message}</p>`;
          }
      });
}

function loadSingleArticle() {
  const articleId = window.location.pathname.split('/').pop();
  console.log(`Loading article with ID: ${articleId}`);

  fetch(`/articles/${articleId}/data`)
      .then(response => {
          console.log('Response status:', response.status);
          console.log('Response headers:', response.headers);
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
      })
      .then(text => {
          console.log('Raw response:', text);
          return JSON.parse(text);
      })
      .then(article => {
          console.log('Article data:', article);
          if (document.getElementById('article-name')) {
              document.getElementById('article-name').textContent = article.name;
              document.getElementById('article-description').textContent = article.description;
              document.getElementById('article-image').src = article.image || '/api/placeholder/200/200';
              document.getElementById('article-price').textContent = `${article.price}€`;
              document.getElementById('article-quantity').textContent = article.quantity;
          } else {
              console.error('Article elements not found in the DOM');
          }
      })
      .catch(error => {
          console.error('Error loading article:', error);
          document.body.innerHTML = `<p>Une erreur est survenue lors du chargement de l'article: ${error.message}</p>`;
      });
}

function createArticleCard(article) {
  const articleCard = document.createElement('div');
  articleCard.classList.add('article-card');

  const articleImage = document.createElement('img');
  articleImage.classList.add('article-image');
  articleImage.src = article.image || '/api/placeholder/200/200';
  articleImage.alt = article.name;

  const articleTitle = document.createElement('h2');
  articleTitle.classList.add('article-title');
  articleTitle.textContent = article.name;

  const articleDescription = document.createElement('p');
  articleDescription.classList.add('article-description');
  articleDescription.textContent = article.description;

  const articlePrice = document.createElement('p');
  articlePrice.classList.add('article-price');
  articlePrice.textContent = `Price: ${article.price}€`;

  const articleQuantity = document.createElement('p');
  articleQuantity.classList.add('article-quantity');
  articleQuantity.textContent = `Quantity: ${article.quantity}`;

  const articleLink = document.createElement('a');
  articleLink.classList.add('article-link');
  articleLink.href = `/articles/${article.id}`;
  articleLink.textContent = 'View article';

  articleCard.appendChild(articleImage);
  articleCard.appendChild(articleTitle);
  articleCard.appendChild(articleDescription);
  articleCard.appendChild(articlePrice);
  articleCard.appendChild(articleQuantity);
  articleCard.appendChild(articleLink);

  return articleCard;
}