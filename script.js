const buttons = document.querySelectorAll(".buy-btn");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    alert("Thank you for your interest! This feature will be live soon.");
  });
});
