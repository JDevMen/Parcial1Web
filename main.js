let cantidadProductos = 0;
let items = document.getElementById("items");
let sep = document.getElementById("separador");
let burger = document.getElementById("burgers");
let taco = document.getElementById("tacos");
let salad = document.getElementById("salads");
let dessert = document.getElementById("desserts");
let drink = document.getElementById("drinks");

let categoria = document.getElementById("categoriaActual");

const data = "./restaurant.json";

let array = [];

function agregarCarrito() {
  cantidadProductos++;

  items.innerHTML = cantidadProductos + " items";
}

function createCards(n) {
  fetch(data)
    .then((res) => res.json())
    .then((resp) => {
      array = resp;
      let listaItems = array[n].products;
      let tarjeta = "";

      listaItems.forEach((card) => {
        tarjeta += "<div class='card mb-4' style = 'min-width: 10rem'>";
        tarjeta += "<img class='card-img-top' src = '" + card.image + "'>";
        tarjeta += "<div class='card-body'>";
        tarjeta += "<h5 class='card-title'>" + card.name + "</h5>";
        tarjeta += "<p class='card-text'>" + card.description + "</p>";
        tarjeta += "<b class='card-text'>" + card.price + "</b>";
        tarjeta +=
          "<button type='button' class='btn btn-primary' onclick='agregarCarrito()' value='addCart'> Add to cart </button> ";
        tarjeta += "</div>";
        tarjeta += "</div>";
      });
      document.getElementById("cartas").innerHTML = tarjeta;
    });
}

burger.addEventListener("click", () => {
  separador.hidden = false;
  categoria.hidden = false;
  categoria.innerHTML = "Burgers";
  createCards(0);
});

taco.addEventListener("click", () => {
  separador.hidden = false;
  categoria.hidden = false;
  categoria.innerHTML = "Tacos";
  createCards(1);
});
salad.addEventListener("click", () => {
  separador.hidden = false;
  categoria.hidden = false;
  categoria.innerHTML = "Salads";
  createCards(2);
});
dessert.addEventListener("click", () => {
  separador.hidden = false;
  categoria.hidden = false;
  categoria.innerHTML = "Desserts";
  createCards(3);
});
drink.addEventListener("click", () => {
  separador.hidden = false;
  categoria.hidden = false;
  categoria.innerHTML = "Drinks & Sides";
  createCards(4);
});
