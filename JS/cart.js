//
//Funcionalidad para insertar los productos del carrito en la pagina del carrito
//
//primero traemos el contenedor donde van a estar los pruductos
const contenedorProductos = document.getElementById("productos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const reiniciarCarritoElement = document.getElementById("reiniciar");

function crearCarrito () {
    contenedorProductos.innerHTML ="";
    const productos = JSON.parse(localStorage.getItem("productos"))
    
    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            const nuevoProducto = document.createElement("div");
            nuevoProducto.classList = "producto";
            nuevoProducto.innerHTML = `
                <img src= "./img/productos/${producto.id}.jpg">
                <h3>${producto.nombre}</h3>
                <p>${producto.precio}</p>
                <div id="div">
                    <button> - </button>
                    <span class= "cantidad"> ${producto.cantidad} </span> 
                    <button> + </button>
                </div>
            `;
            nuevoProducto.getElementsByTagName("button")[1].addEventListener("click", (e) => {
                const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
                cuentaElement.innerText = agregarAlCarrito(producto);
                actualizarTotales();
            });
            nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", () => {
                restarAlCarrito(producto);
                crearCarrito();
                actualizarTotales();
            });
            contenedorProductos.appendChild(nuevoProducto);
        });
    }
};
crearCarrito();
actualizarTotales();

function actualizarTotales () {
    const productos = JSON.parse(localStorage.getItem("productos"))
    let unidades = 0;
    let precio = 0;
    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        });
    }
    unidadesElement.innerText = unidades;
    precioElement.innerText = precio;
}

reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito () {
    localStorage.removeItem("productos");
    actualizarTotales();
    crearCarrito();
}