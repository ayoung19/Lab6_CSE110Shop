// Script.js

async function loadData(callback) {
  let products = JSON.parse(localStorage.getItem('Lab6Data'));

  if (products == null) {
    const response = await fetch('https://fakestoreapi.com/products');
    products = response.json();
  }

  return products;
}

window.addEventListener('DOMContentLoaded', () => {
  const productList = document.querySelector('#product-list');

  loadData().then((products) => {
    localStorage.setItem('Lab6Data', JSON.stringify(products));
    products.forEach(({ id, image, title, price }) => {
      productList.appendChild(new ProductItem(id, image, title, price));
    });
  });
});