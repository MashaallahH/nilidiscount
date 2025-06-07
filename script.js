// Handle all "Buy Now" buttons
const buttons = document.querySelectorAll('.buy-button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.getAttribute('data-product');
    alert(`You clicked Buy Now for: ${productName}`);
  });
});
