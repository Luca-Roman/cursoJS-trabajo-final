//
//Funcionalidad para insertar los productos en la pagina
//
//primero traemos el contenedor donde van a estar los pruductos
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

