// legacy-store.js

/* Product list */
var productList = [
  { id: 1, name: "T-Shirt", price: 19.99 },
  { id: 2, name: "Hoodie", price: 39.99 },
  { id: 3, name: "Cap", price: 14.99 },
];

/* Get elements */
var productListEl = document.getElementById("product-list");

/* Helper Functions */
function formatCurrency(num) {
  return "$" + num.toFixed(2);
}

function addProductCard(product) {
  var productCardEl = document.createElement("div");
  productCardEl.className = "product-card";

  var productNameEl = document.createElement("h3");
  productNameEl.innerHTML = product.name;
  productCardEl.appendChild(productNameEl);

  var productPriceEl = document.createElement("p");
  productPriceEl.innerHTML = formatCurrency(product.price);
  productCardEl.appendChild(productPriceEl);

  var addToCartButton = document.createElement("button");
  addToCartButton.innerHTML = "Add to Cart";
  addToCartButton.onclick = function() {
    addToCart(product);
  };
  productCardEl.appendChild(addToCartButton);

  productListEl.appendChild(productCardEl);
}

function addToCart(product) {
  var cart = JSON.parse(localStorage.getItem("cart") || "[]");
  var existingProduct = cart.find(function(item) {
    return item.id === product.id;
  });

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

/* Render products */
(function() {
  for (var i = 0; i < productList.length; i++) {
    addProductCard(productList[i]);
  }
})();

/* Add product click handler */
document.querySelector(".add-product-form").addEventListener("submit", function(event) {
  event.preventDefault();

  var productName = document.getElementById("product-name").value;
  var productPrice = document.getElementById("product-price").value;

  if (productName && productPrice) {
    var newProduct = {
      id: productList.length + 1,
      name: productName,
      price: parseFloat(productPrice),
    };

    productList.push(newProduct);
    addProductCard(newProduct);

    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
  }
});

/* Add global error handling */
window.onerror = function(message, url, lineNo, colNo, error) {
  console.log("Error: " + message + "\n" + "URL: " + url + "\n" + "Line: " + lineNo + " Column: " + colNo + "\n" + "Error object: " + JSON.stringify(error));
};
