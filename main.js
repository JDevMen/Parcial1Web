const data = "./restaurant.json";

//Elementos html dentro de index.html-------------------------
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
let bodyDoc = document.body;
//Variables auxiliares----------------------
let cantidadProductos = 0;
let cart = [];
let array = [];

createModal();

//Funciones de cálculo o modificación------------------------
//Función obtener total de orden
function getTotal() {
  let t = 0;

  cart.forEach((element) => {
    t += element.amount;
  });

  return t;
}

//Función para agregar item al carrito
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
}

//Función agregar cantidad a item en carrito
function masItem(item, htmlQty, htmlAmount) {
  item.qty++;
  item.amount += item.unitPrice;
  cantidadProductos++;
  htmlQty.innerHTML = item.qty;
  htmlAmount.innerHTML = item.amount.toFixed(2);
  let total = document.getElementById("totalB");
  total.innerHTML = "Total: $" + getTotal().toFixed(2);
  items.innerHTML = cantidadProductos + " items";
}

//Función quitar cantidad a item en carrito
function menosItem(item, htmlQty, htmlAmount) {
  item.qty--;
  let indexItem = cart.indexOf(item);
  let total = document.getElementById("totalB");
  cantidadProductos--;
  if (item.qty > 0) {
    item.amount -= item.unitPrice;
    htmlQty.innerHTML = item.qty;
    htmlAmount.innerHTML = item.amount.toFixed(2);
  } else {
    cart.splice(indexItem, 1);
    clearTable();
    orderDetail();
  }
  total.innerHTML = "Total: $" + getTotal().toFixed(2);
  items.innerHTML = cantidadProductos + " items";
}

//Función para quitar todos los items del carrito
function quitarItemsCarrito() {
  cart = [];
  cantidadProduct = 0;
  clearTable();
  orderDetail();
  items.innerHTML = " items";
}

//------------------Funciones de creación--------------------

function createModal() {
  let modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = "exampleModal";
  modal.tabIndex = "-1";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-hidden", "true");

  let modalDialog = document.createElement("div");
  modalDialog.className = "modal-dialog";
  modalDialog.setAttribute("role", "document");

  let modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  let modalH = document.createElement("div");
  modalH.className = "modal-header";

  let modalTitle = document.createElement("h4");
  modalTitle.innerText = "Cancel the order";

  let modalC = document.createElement("button");
  modalC.className = "close";
  modalC.setAttribute("data-dismiss", "modal");
  modalC.setAttribute("aria-label", "Close");

  let modalClose = document.createElement("span");
  modalClose.id = "close";
  modalClose.className = "close";
  modalClose.innerHTML = "&times;";

  modalC.appendChild(modalClose);

  let hr1 = document.createElement("hr");

  modalH.appendChild(modalTitle);
  modalH.appendChild(modalC);
  modalH.appendChild(hr1);

  let modalB = document.createElement("div");
  modalB.className = "modal-body";
  modalB.innerHTML = "Are you sure about cancelling the order?";

  let modalF = document.createElement("div");
  modalF.className = "modal-footer";

  let buttonCancel = document.createElement("button");
  buttonCancel.className = "btn btn-light";
  buttonCancel.setAttribute("data-dismiss", "modal");
  buttonCancel.innerHTML = "Yes, I want to cancel the order";
  buttonCancel.addEventListener("click", () => {
    quitarItemsCarrito();
  });

  let buttonContinue = document.createElement("button");
  buttonContinue.className = "btn btn-danger";
  buttonContinue.setAttribute("data-dismiss", "modal");
  buttonContinue.innerHTML = "No, I want to continue adding products";

  modalF.appendChild(buttonCancel);
  modalF.appendChild(buttonContinue);

  modalContent.appendChild(modalH);
  modalContent.appendChild(modalB);
  modalContent.appendChild(modalF);

  modalDialog.appendChild(modalContent);

  modal.appendChild(modalDialog);

  bodyDoc.appendChild(modal);
}

//Función crear de tarjetas
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
        photo.className = "card-img-top mx-auto d-block";

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
          agregarCarrito(card);
        });
      }
    });
}

//Función crear tabla de orden
function orderDetail() {
  let table = document.createElement("table");
  table.className = "table table-striped";

  //Table head
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

  //Table body
  let tableBody = document.createElement("tbody");
  for (let i = 0; i < cart.length; i++) {
    const element = cart[i];
    let newRow = tableBody.insertRow();
    let item = newRow.insertCell();
    let qty = newRow.insertCell();
    let desc = newRow.insertCell();
    let unit = newRow.insertCell();
    let amount = newRow.insertCell();
    let modify = newRow.insertCell();

    item.innerHTML = i + 1;
    qty.innerHTML = element.qty;
    desc.innerHTML = element.description;
    unit.innerHTML = element.unitPrice;
    amount.innerHTML = element.amount.toFixed(2);

    let botonMenos = document.createElement("button");
    botonMenos.type = "button";
    botonMenos.className = "btn btn-secondary adding";
    botonMenos.innerHTML = "-";
    botonMenos.addEventListener("click", () => menosItem(element, qty, amount));

    let botonMas = document.createElement("button");
    botonMas.type = "button";
    botonMas.className = "btn btn-secondary adding";
    botonMas.innerHTML = "+";
    botonMas.addEventListener("click", () => masItem(element, qty, amount));

    modify.appendChild(botonMenos);
    modify.appendChild(botonMas);
  }

  //Agregar tHead y tbody
  table.appendChild(tableHead);
  table.appendChild(tableBody);

  tableDiv.appendChild(table);

  orderFunction();
}

//Función crear total y botones de orden
function orderFunction() {
  let row = document.createElement("div");
  row.className = "row";

  let total = document.createElement("div");
  total.className = "col-9";

  let b = document.createElement("b");
  b.id = "totalB";
  b.innerText = "Total: $" + getTotal().toFixed(2);

  total.appendChild(b);

  let botones = document.createElement("div");
  botones.className = "col-3";

  let cancel = document.createElement("button");
  cancel.type = "button";
  cancel.className = "btn btn-danger";
  cancel.innerHTML = "Cancel";
  cancel.setAttribute("data-toggle", "modal");
  cancel.setAttribute("data-target", "#exampleModal");

  let confirm = document.createElement("button");
  confirm.type = "button";
  confirm.className = "btn btn-light";
  confirm.innerHTML = "Confirm order";
  confirm.addEventListener("click", () => {
    console.log(cart);
    quitarItemsCarrito();
    cantidadProductos = 0;
  });

  botones.appendChild(cancel);
  botones.appendChild(confirm);

  row.appendChild(total);
  row.appendChild(botones);

  tableDiv.appendChild(row);
}

//Funciones para eliminar elementos tarjetas y tabla
function clearCards() {
  let cartas = document.getElementById("cartas");
  while (cartas.firstChild) {
    cartas.removeChild(cartas.firstChild);
  }
}
function clearTable() {
  while (tableDiv.firstChild) {
    tableDiv.removeChild(tableDiv.firstChild);
  }
}

//--------------------Event listeners categorias-------------
burger.addEventListener("click", () => {
  clearTable();
  clearCards();
  separador.hidden = false;
  categoria.hidden = false;
  categoria.innerHTML = "Burgers";
  createCards(0);
});

taco.addEventListener("click", () => {
  clearTable();
  clearCards();
  separador.hidden = false;
  categoria.hidden = false;
  categoria.innerHTML = "Tacos";
  createCards(1);
});
salad.addEventListener("click", () => {
  clearTable();
  clearCards();
  separador.hidden = false;
  categoria.hidden = false;
  categoria.innerHTML = "Salads";
  createCards(2);
});
dessert.addEventListener("click", () => {
  clearTable();
  clearCards();
  separador.hidden = false;
  categoria.hidden = false;
  categoria.innerHTML = "Desserts";
  createCards(3);
});
drink.addEventListener("click", () => {
  clearTable();
  clearCards();
  separador.hidden = false;
  categoria.hidden = false;
  categoria.innerHTML = "Drinks & Sides";
  createCards(4);
});
//Event listener carrito
carrito.addEventListener("click", () => {
  clearTable();
  separador.hidden = false;
  categoria.hidden = false;
  categoria.innerHTML = "Order detail";
  clearCards();
  orderDetail();
});
