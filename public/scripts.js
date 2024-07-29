document.addEventListener('DOMContentLoaded', () => {
    const articlesList = document.getElementById('articles-list');
    const articleName = document.getElementById('article-name');
    const articleDescription = document.getElementById('article-description');
    const articleImage = document.getElementById('article-image');
    const articlePrice = document.getElementById('article-price');
    const articleQuantity = document.getElementById('article-quantity');
  
    console.log('Fetching articles...');
    
    if (articlesList) {

      fetch('/articles')
        .then(response => response.json())
        .then(articles => {
          articlesList.innerHTML = articles.map(article => `
          <div class="article-card">
            <img src="${article.image}" alt="${article.name}" class="article-image">
            <h2 class="article-title">${article.name}</h2>
            <p class="article-description">${article.description}</p>
            <p class="article-price">Price: $${article.price}</p>
            <p class="article-quantity">Quantity: ${article.quantity}</p>
            <a href="/articles/${article.id}" class="article-link">View Details</a>
          </div>
          `).join('');
        });
    }
  const articleId = window.location.pathname.split('/').pop();
  if (articleId && articleName && articleDescription && articleImage && articlePrice && articleQuantity) {
    fetch(`/articles/${articleId}`)
      .then(response => response.json())
      .then(article => {
        articleName.innerText = article.name;
        articleDescription.innerText = article.description;
        articleImage.src = article.image;
        articlePrice.innerText = `Price: $${article.price}`;
        articleQuantity.innerText = `Quantity: ${article.quantity}`;
      });
    }
  });
  