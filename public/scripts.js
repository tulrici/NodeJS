document.addEventListener('DOMContentLoaded', () => {

    console.log('Fetching articles...');

    // Fetch all articles
  fetch('/articles')
  .then((res) => res.json())
  .then(data => {
    const articlesList = document.getElementById('articles-list');
    data.forEach(article => {
      const articleCard = document.createElement('div');
      articleCard.classList.add('article-card');

      const articleImage = document.createElement('img');
      articleImage.classList.add('article-image');
      articleImage.src = article.image;
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

      articlesList.appendChild(articleCard);

    });

});
});