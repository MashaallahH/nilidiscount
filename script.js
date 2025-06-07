document.querySelectorAll('.buy-btn').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.getAttribute('data-product');
    alert(`Thank you for choosing to buy: ${product}`);
  });
});
