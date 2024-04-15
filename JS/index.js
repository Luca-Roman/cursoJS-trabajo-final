const insertProducts = (products) => {
    const productsContainer = document.getElementById("products-container");
    products.forEach(product => {
        const newProduct = document.createElement("div");
        newProduct.classList = "product";
        newProduct.innerHTML = `
            <img src= "./img/products/${product.id}.jpg">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button> Agregar al carrito </button>
        `
        newProduct.getElementsByTagName("button")[0].addEventListener("click", () => addToCart(product));
        productsContainer.appendChild(newProduct);
    });
}

async function getProducts () {
    try {
        const res = await fetch("http://127.0.0.1:5500/cursoJS-trabajo-final/Json/products.json")
        const data = await res.json()
        console.log(data)
        //return data
        insertProducts(data)
    } catch (error) {
        console.error(error)
    }
}

getProducts()





//
//Funcionalidad para insertar los productos en la pagina
//
//primero traemos el contenedor donde van a estar los pruductos
/*
const contenedorProductos = document.getElementById("productos-container");

function crearProductosInicio (productos) {
    //recorremos el array de productos y los vamos insertando en el codigo html y le agregamos el event listener a cada boton
    productos.forEach(producto => {
        const nuevoProducto = document.createElement("div");
        nuevoProducto.classList = "producto";
        nuevoProducto.innerHTML = `
            <img src= "./img/productos/${producto.id}.jpg">
            <h3>${producto.nombre}</h3>
            <p>${producto.precio}</p>
            <button> Agregar al carrito </button>
        `
        nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(producto));
        contenedorProductos.appendChild(nuevoProducto);
    });
};
crearProductosInicio(productos);
*/
