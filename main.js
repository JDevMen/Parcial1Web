let cantidadProductos = 0;
let carrito = document.getElementById("carroCompra");
let items = document.getElementById("items");
let sep = document.getElementById("separador");
let burger = document.getElementById("burgers");
let taco = document.getElementById("tacos");
let salad = document.getElementById("salads");
let dessert = document.getElementById("desserts");
let drink = document.getElementById("drinks");

let categoria = document.getElementById("categoriaActual");

const data = "./restaurant.json";

let cart = [];
let array = [];

function agregarCarrito() {
  cantidadProductos++;
  // let cartas = document.getElementById("cartas");
  // console.log("Deck de cartas", cartas.children("div"));
  items.innerHTML = cantidadProductos + " items";
}

function clearCards() {
  let cartas = document.getElementById("cartas");
  while (cartas.firstChild) {
    cartas.removeChild(cartas.firstChild);
  }
}

function listaItems() {}

//Función creación de tarjetas
function createCards(n) {
  fetch(data)
    .then((res) => res.json())
    .then((resp) => {
      array = resp;
      let listaItems = array[n].products;
      let cartas = document.getElementById("cartas");
      let m = 0;
      for (let i = 0; i < listaItems.length; i++) {
        let card = listaItems[i];

        let col = document.createElement("div");
        col.className = "col-sm-3 d-flex align-items-stretch";

        let tarjeta = document.createElement("div");
        tarjeta.className = "card h-100 ";

        let photo = document.createElement("img");
        photo.src = card.image;
        photo.className = "card-img-top";

        let body = document.createElement("div");
        body.className = "card-body";

        let title = document.createElement("h5");
        title.className = "card-title";
        title.innerHTML = card.name;

        let description = document.createElement("p");
        description.className = "card-text";
        description.innerHTML = `${card.description}`;

        let price = document.createElement("b");
        price.className = "card-price";
        price.innerHTML = `$ ${card.price}`;

        let addToCart = document.createElement("button");
        addToCart.type = "button";
        addToCart.className = "btn btn-dark";
        addToCart.innerHTML = "Add to cart";

        body.appendChild(title);
        body.appendChild(description);
        body.appendChild(price);
        body.appendChild(document.createElement("br"));
        body.appendChild(addToCart);

        tarjeta.appendChild(photo);
        tarjeta.appendChild(body);

        col.appendChild(tarjeta);
        cartas.appendChild(col);

        addToCart.addEventListener("click", () => {
          console.log(card);
          cart.push(card);
          agregarCarrito();
        });
      }
    });
}

//Event listeners categorias
burger.addEventListener("click", () => {
  clearCards();
  separador.hidden = false;
  categoria.hidden = false;
  categoria.innerHTML = "Burgers";
  createCards(0);
});

taco.addEventListener("click", () => {
  clearCards();
  separador.hidden = false;
  categoria.hidden = false;
  categoria.innerHTML = "Tacos";
  createCards(1);
});
salad.addEventListener("click", () => {
  clearCards();
  separador.hidden = false;
  categoria.hidden = false;
  categoria.innerHTML = "Salads";
  createCards(2);
});
dessert.addEventListener("click", () => {
  clearCards();
  separador.hidden = false;
  categoria.hidden = false;
  categoria.innerHTML = "Desserts";
  createCards(3);
});
drink.addEventListener("click", () => {
  clearCards();
  separador.hidden = false;
  categoria.hidden = false;
  categoria.innerHTML = "Drinks & Sides";
  createCards(4);
});

//Event listener carrito
carrito.addEventListener("click", () => {
  console.log(cart);
});
