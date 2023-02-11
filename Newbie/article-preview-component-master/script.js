console.log("hello world");
const shareBtn = document.querySelector(".share-btn");
const btnArrow = document.querySelector(".btn-arrow");
const popup = document.querySelector(".popup");
[shareBtn, btnArrow].forEach((btn) =>
  btn.addEventListener("click", () => popup.classList.toggle("hide"))
);
