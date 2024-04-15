//
//Funcionalidad para insertar los productos del carrito en la pagina del carrito
//
//primero traemos el contenedor donde van a estar los pruductos
const productsContainer = document.getElementById("products-container");
const priceElement = document.getElementById("precio");

function createCart () {
    productsContainer.innerHTML ="";
    const products = JSON.parse(localStorage.getItem("products"))
    
    if (products && products.length > 0) {
        products.forEach(product => {
            const nuevoProducto = document.createElement("div");
            nuevoProducto.classList = "product";
            nuevoProducto.innerHTML = `
                <img src= "./img/products/${product.id}.jpg">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <div id="div">
                    <button> - </button>
                    <span class= "amount"> ${product.amount} </span> 
                    <button> + </button>
                </div>
            `;
            nuevoProducto.getElementsByTagName("button")[1].addEventListener("click", (e) => {
                const countElement = e.target.parentElement.getElementsByTagName("span")[0];
                countElement.innerText = addToCart(product);
                updateTotals();
            });
            nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", () => {
                decreaseCart(product);
                createCart();
                updateTotals();
            });
            productsContainer.appendChild(nuevoProducto);
        });
    }
};
createCart();
updateTotals();

function updateTotals () {
    const unitiesElement = document.getElementById("unidades");
    const products = JSON.parse(localStorage.getItem("products"))
    let amount = 0;
    let price = 0;
    if (products && products.length > 0) {
        products.forEach(product => {
            amount += product.amount;
            price += product.price * product.amount;
        });
    }
    unitiesElement.innerText = amount;
    priceElement.innerText = price;
}

const restartCartElement = document.getElementById("reiniciar");
restartCartElement.addEventListener("click", restartCart);
function restartCart () {
    localStorage.removeItem("products");
    updateTotals();
    createCart();
}