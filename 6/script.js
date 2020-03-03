const app = document.getElementById("app");
const toggle = document.getElementById("toggle");
const close = document.getElementById("close");
const open = document.getElementById("open");
const modal = document.getElementById("modal");

toggle.addEventListener("click", () => app.classList.toggle("show-nav"));

open.addEventListener("click", () => modal.classList.add("active"));

close.addEventListener("click", () => modal.classList.remove("active"));

window.addEventListener(
  "click",
  e => e.target == modal && modal.classList.remove("active")
);
