import React from 'react';
import './Home.css'; // Assuming your Home.css is correctly linked

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-overlay">
          <h1>Welcome to the Aquarium Store</h1>
          <p>Find the best aquarium products here!</p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </div>

      <div className="categories">
        <h2>Categories</h2>
        <div className="category-cards">
          <div className="category-card">
            <img src="/path-to-image" alt="Category 1" />
            <h3>Fish Tanks</h3>
          </div>
          <div className="category-card">
            <img src="/path-to-image" alt="Category 2" />
            <h3>Filters & Pumps</h3>
          </div>
          <div className="category-card">
            <img src="/path-to-image" alt="Category 3" />
            <h3>Accessories</h3>
          </div>
        </div>
      </div>

      <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-cards">
          <div className="product-card">
            <img src="/path-to-image" alt="Product 1" />
            <h3>Premium Fish Tank</h3>
            <p className="price">₹5000</p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
          <div className="product-card">
            <img src="/path-to-image" alt="Product 2" />
            <h3>Automatic Filter Pump</h3>
            <p className="price">₹1200</p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}


document.addEventListener('DOMContentLoaded', function () {
  const categories = [
    { name: 'Freshwater Fish', image: '/images/freshwater.jpg' },
    { name: 'Saltwater Fish', image: '/images/saltwater.jpg' },
    { name: 'Aquarium Plants', image: '/images/plants.jpg' },
    { name: 'Aquarium Decor', image: '/images/decor.jpg' },
    { name: 'Aquarium Filters', image: '/images/filters.jpg' },
    { name: 'Aquarium Lighting', image: '/images/lighting.jpg' },
  ];

  const featuredProducts = [
    { name: 'Blue Tang Fish', image: '/images/bluetang.jpg', price: '₹2000', category: 'Saltwater Fish' },
    { name: 'Clownfish', image: '/images/clownfish.jpg', price: '₹1500', category: 'Saltwater Fish' },
    { name: 'Java Fern Plant', image: '/images/javafern.jpg', price: '₹500', category: 'Aquarium Plants' },
    // Add more featured products as needed
  ];

  // Generate categories dynamically
  const categoryContainer = document.querySelector('.category-cards');
  categories.forEach(category => {
    const categoryCard = `
      <div class="category-card">
        <img src="${category.image}" alt="${category.name}">
        <h3>${category.name}</h3>
      </div>
    `;
    categoryContainer.innerHTML += categoryCard;
  });

  // Generate featured products dynamically
  const productContainer = document.querySelector('.product-cards');
  featuredProducts.forEach(product => {
    const productCard = `
      <div class="product-card" data-category="${product.category}">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">${product.price}</p>
        <button class="add-to-cart-btn">Add to Cart</button>
      </div>
    `;
    productContainer.innerHTML += productCard;
  });

  // Category filter
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const selectedCategory = card.querySelector('h3').textContent;
      document.querySelectorAll('.product-card').forEach(productCard => {
        if (selectedCategory === 'All Categories' || productCard.dataset.category === selectedCategory) {
          productCard.style.display = 'block';
        } else {
          productCard.style.display = 'none';
        }
      });
    });
  });

  // Product search
  const searchInput = document.querySelector('#product-search');
  searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(productCard => {
      const productName = productCard.querySelector('h3').textContent.toLowerCase();
      if (productName.includes(searchText)) {
        productCard.style.display = 'block';
      } else {
        productCard.style.display = 'none';
      }
    });
  });
});


export default Home;
