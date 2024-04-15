//
//Funcionalidad carrito de compras
//

function addToCart(product) {
    //Agregamos el producto que nos llega por parametro al local storage
    const memory =JSON.parse(localStorage.getItem("products"));
    let count = 0;
    if(!memory) {
        //si la memoria no tenía el registro productos lo creamos y agregamos el primer producto
        localStorage.setItem("products", JSON.stringify([getNewProductToMemorY(product)]));
        count= 1;
    }
    else {
        //Si ya existia ese registro revisamos si existia el producto en la memoria y agregamos o sumamos la cantidad dependiendo el caso
        const productIndex = memory.findIndex(productInMemory => productInMemory.id === product.id);
        const newMemory = memory;
        if (productIndex === -1) {
            newMemory.push(getNewProductToMemorY(product))
            count = 1;
        }
        else {
           newMemory[productIndex].amount ++;
           count = newMemory[productIndex].amount;
        }
        localStorage.setItem("products", JSON.stringify(newMemory));
    }
    //Al finalizar actualizamos el numero de articulos en el carrito
    updateCartNumber();
    return count;
}

function getNewProductToMemorY(product) {
    //devolvemos el producto que nos envian por parametro con el atributo cantidad agregado e inicializado en 1
    const newProduct = product;
    newProduct.amount = 1;
    return newProduct;
}

const cartAmount = document.getElementById("cart-amount");
function updateCartNumber () {
    //Actualizamos el numero de articulos en el carrito
    const memory = JSON.parse(localStorage.getItem("products"));
    if (memory && memory.length>0){
        const count = memory.reduce((acum, current) => acum+current.amount, 0);
        cartAmount.innerText = count;
    }
    else {
        cartAmount.innerText =  0;
    }
}
updateCartNumber()

function decreaseCart (product) {
    const memory = JSON.parse(localStorage.getItem("products"));
    const productIndex = memory.findIndex(productInMemory => productInMemory.id === product.id);
    if (memory[productIndex].amount === 1) {
        memory.splice(productIndex,1);
    }
    else {
        memory[productIndex].amount--;
    }
    localStorage.setItem("products", JSON.stringify(memory));
    updateCartNumber();
}
