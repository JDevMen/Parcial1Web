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

let tableDiv = document.getElementById("tableDiv");

const data = "./restaurant.json";

let cart = [];
let array = [];

function agregarCarrito(item) {
  let name = item.name;
  let found = cart.find((i) => i["description"] === name);
  if (cart.length == 0 || !found) {
    let newItem = {
      qty: 1,
      description: name,
      unitPrice: item.price,
      amount: item.price,
    };
    cart.push(newItem);
  } else {
    found.qty++;
    found.amount += found.unitPrice;
  }

  cantidadProductos++;
  items.innerHTML = cantidadProductos + " items";
  console.log(cart);
}

function clearCards() {
  let cartas = document.getElementById("cartas");
  while (cartas.firstChild) {
    cartas.removeChild(cartas.firstChild);
  }
}

//Función creación de tarjetas
function createCards(n) {
  fetch(data)
    .then((res) => res.json())
    .then((resp) => {
      array = resp;
      let listaItems = array[n].products;
      let cartas = document.getElementById("cartas");
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
          // cart.push(card);
          agregarCarrito(card);
        });
      }
    });
}

//Función crear tabla de orden
function orderDetail() {
  let table = document.createElement("table");
  table.className = "table table-bordered table-striped table-hover";

  let tableHead = document.createElement("thead");
  let trHead = document.createElement("tr");

  let itemH = document.createElement("th");
  itemH.scope = "col";
  itemH.innerHTML = "Item";

  let qtyH = document.createElement("th");
  qtyH.scope = "col";
  qtyH.innerHTML = "Qty.";

  let descH = document.createElement("th");
  descH.scope = "col";
  descH.innerHTML = "Description";

  let unitH = document.createElement("th");
  unitH.scope = "col";
  unitH.innerHTML = "Unit Price";

  let amountH = document.createElement("th");
  amountH.scope = "col";
  amountH.innerHTML = "Amount";

  let modifyH = document.createElement("th");
  modifyH.scope = "col";
  modifyH.innerHTML = "Modify";

  trHead.appendChild(itemH);
  trHead.appendChild(qtyH);
  trHead.appendChild(descH);
  trHead.appendChild(unitH);
  trHead.appendChild(amountH);
  trHead.appendChild(modifyH);

  tableHead.appendChild(trHead);

  let tableBody = document.createElement("tbody");

  //Agregar tHead y tbody
  table.appendChild(tableHead);

  tableDiv.appendChild(table);

  console.log(tableDiv);
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
  separador.hidden = false;
  categoria.hidden = false;
  categoria.innerHTML = "Order detail";
  clearCards();
  orderDetail();
  console.log(cart);
});
