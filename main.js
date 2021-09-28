let burger = document.getElementById("burgers");
let taco = document.getElementById("tacos");
let salad = document.getElementById("salads");
let dessert = document.getElementById("desserts");
let drink = document.getElementById("drinks");

let categoria = document.getElementById("categoriaActual");

burger.addEventListener("click", () => {
  categoria.innerHTML = "Burgers";
});

taco.addEventListener("click", () => {
  categoria.innerHTML = "Tacos";
});
salad.addEventListener("click", () => {
  categoria.innerHTML = "Salads";
});
dessert.addEventListener("click", () => {
  categoria.innerHTML = "Desserts";
});
drink.addEventListener("click", () => {
  categoria.innerHTML = "Drinks & Sides";
});
