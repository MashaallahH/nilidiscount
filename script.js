// Mobile Nav Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// Helper: Update cart count in nav
function updateCartCount() {
  const cartCountElements = document.querySelectorAll('#cart-count');
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  let count = 0;
  for (const key in cart) {
    count += cart[key].quantity;
  }
  cartCountElements.forEach(el => el.textContent = count);
}

// Add product to cart
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};

  if (cart[product.id]) {
    cart[product.id].quantity += 1;
  } else {
    cart[product.id] = {
      name: product.name,
      price: product.price,
      quantity: 1,
      img: product.img,
    };
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Handle clicks on 'Add to Cart' buttons on products page
const buyButtons = document.querySelectorAll('.buy-btn');
buyButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    const product = {
      id: card.getAttribute('data-id'),
      name: card.getAttribute('data-name'),
      price: parseFloat(card.getAttribute('data-price')),
      img: card.querySelector('img').src,
    };
    addToCart(product);
  });
});

// On Cart Page: Render Cart Items
function renderCart() {
  const container = document.getElementById('cart-items-container');
  const summary = document.getElementById('cart-summary');
  const emptyMessage = document.getElementById('empty-cart-message');

  if (!container) return; // Not on cart page

  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  container.innerHTML = '';

  const productIds = Object.keys(cart);
  if (productIds.length === 0) {
    summary.style.display = 'none';
    emptyMessage.style.display = 'block';
    return;
  }

  emptyMessage.style.display = 'none';
  summary.style.display = 'block';

  let totalItems = 0;
  let totalPrice = 0;

  productIds.forEach(id => {
    const item = cart[id];
    totalItems += item.quantity;
    totalPrice += item.quantity * item.price;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    cartItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div class="cart-item-controls">
        <button class="btn-increase" data-id="${id}">+</button>
        <button class="btn-decrease" data-id="${id}">−</button>
        <button class="btn-remove" data-id="${id}">Remove</button>
      </div>
    `;

    container.appendChild(cartItem);
  });

  document.getElementById('total-items').textContent = totalItems;
  document.getElementById('total-price').textContent = totalPrice.toFixed(2);

  // Add event listeners for cart item buttons
  container.querySelectorAll('.btn-increase').forEach(button => {
    button.addEventListener('click', () => changeQuantity(button.dataset.id, 1));
  });
  container.querySelectorAll('.btn-decrease').forEach(button => {
    button.addEventListener('click', () => changeQuantity(button.dataset.id, -1));
  });
  container.querySelectorAll('.btn-remove').forEach(button => {
    button.addEventListener('click', () => removeItem(button.dataset.id));
  });
}

// Change quantity of an item in cart
function changeQuantity(productId, delta) {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  if (!cart[productId]) return;

  cart[productId].quantity += delta;

  if (cart[productId].quantity <= 0) {
    delete cart[productId];
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// Remove an item from cart
function removeItem(productId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  if (cart[productId]) {
    delete cart[productId];
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// Clear entire cart
const clearCartBtn = document.getElementById('clear-cart-btn');
if (clearCartBtn) {
  clearCartBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the cart?')) {
      localStorage.removeItem('cart');
      renderCart();
      updateCartCount();
    }
  });
}

// Initialize
updateCartCount();
renderCart();
