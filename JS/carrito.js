//
//Funcionalidad carrito de compras
//

function agregarAlCarrito(producto) {
    //Agregamos el producto que nos llega por parametro al local storage
    const memoria =JSON.parse(localStorage.getItem("productos"));
    let cuenta = 0;
    if(!memoria) {
        //si la memoria no tenía el registro productos lo creamos y agregamos el primer producto
        localStorage.setItem("productos", JSON.stringify([getNuevoProductoParaMemoria(producto)]));
        cuenta = 1;
    }
    else {
        //Si ya existia ese registro revisamos si existia el producto en la memoria y agregamos o sumamos la cantidad dependiendo el caso
        const indiceProducto = memoria.findIndex(product => product.id === producto.id);
        const nuevaMemoria = memoria;
        if (indiceProducto === -1) {
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))
            cuenta = 1;
        }
        else {
           nuevaMemoria[indiceProducto].cantidad ++;
           cuenta = nuevaMemoria[indiceProducto].cantidad;
        }
        localStorage.setItem("productos", JSON.stringify(nuevaMemoria));
    }
    //Al finalizar actualizamos el numero de articulos en el carrito
    actualizarNumeroCarrito();
    return cuenta;
}

function getNuevoProductoParaMemoria(producto) {
    //devolvemos el producto que nos envian por parametro con el atributo cantidad agregado e inicializado en 1
    const newProduct = producto;
    newProduct.cantidad = 1;
    return newProduct;
}

const valorCantidadCarrito = document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito () {
    //Actualizamos el numero de articulos en el carrito
    const memoria = JSON.parse(localStorage.getItem("productos"));
    if (memoria && memoria.length>0){
        const cuenta = memoria.reduce((acum, current) => acum+current.cantidad, 0);
        valorCantidadCarrito.innerText = cuenta;
    }
    else {
        valorCantidadCarrito.innerText =  0;
    }
}
actualizarNumeroCarrito()

function restarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("productos"));
    const indiceProducto = memoria.findIndex(product => product.id === producto.id);
    if (memoria[indiceProducto].cantidad === 1) {
        memoria.splice(indiceProducto,1);
    }
    else {
        memoria[indiceProducto].cantidad--;
    }
    localStorage.setItem("productos", JSON.stringify(memoria));
    actualizarNumeroCarrito();
}
