//Codificador: Ezequiel Bengoechea

class Producto{
    constructor(id,nom,precio,stock){
        this.id = id;
        this.nombre = nom;
        this.precio = precio;
        this.stock = stock;
    }
}

//NOTAS
/* 
BIEN AHI EZE LLEGASTE HASTA LA PARTE DE MOSTRAR EL ARREGLO CARRITO CON UN CONSOLE.LOG
EN LA LINEA 88, AHORA DEBERIAS UTILIZAR .MAP Y RETORNAR SOLO LOS PRECIOS DE LOS OBJETOS
PARA LUEGO USAR UN REDUCE Y ASI SUMARLOS VAMOS LOCOOOO


//HOLA PROFE: Los console.log(); que use para este programa son en su mayoria
Y/O totalidad solamente para ver que el programa este funcionando bien
mientras lo programaba, ya que mi programa fue creado mayoritariamente 
usando promps y alerts para que el usuario pueda interactuar
*/






//Creacion de verctores 
const nombre = ["motor", "control", "remera", "gorra"];
const marca = ["FAAC","ROSSI"];
const productos = [];
const carrito = [];

//Creacion de variables
let opId = 0;
//Para generar nombres de productos randoms utilizo esto para sacar id en los vectores nombre y marca
const getId = (vec) =>{
    return Math.round(Math.random() * (vec.length - 1) );
}

//Funcion de orden mayor para calcular los precios de una forma random
const getPrecio = () =>{
    let max = 2000;
    let min = 500;
    return Math.round(Math.random() * (max - min) + min);
}


const getStock = () =>{
    let max = 20;
    let min = 10;
    return Math.round(Math.random() * (max - min) + min);
}

//for para cargar los Productos (objetos) dentro del array productos
for(let i = 0; i < 5; i++){
    const prod = new Producto(i,nombre[getId(nombre)] + " " + marca[getId(marca)], getPrecio(), getStock()); 
    productos.push(prod);
}


//For para ver la lista de productos cargada
for(const item of productos){
    console.log(item);
}

//funciones

function menu(){
    let op = prompt("Ingrese (1) para ver nuestro catalogo\n Ingrese (2) para seleccionar un producto y añadirlo al carrito\nIngrese (3) para mostrar los productos que hay en el carrito actualmente, y su precio total.\nIngrese (4) para eliminar algun producto edl carrito segun la posicion");
    return op;
}


function cargarCarrito(productos){
    let nom = prompt("Ingrese el nombre del producto que desea llevar (explicitamente,  los profes pueden usar la consola del navegador para que sea mas facil), Distingue mayusculas");
    let band = productos.some((el) => el.nombre == nom);
    if(band){
        const prodFil = productos.filter((el) => el.nombre.includes(nom));
        console.log(prodFil);
        if(prodFil.length > 1){
            alert("El nombre coincide, por favor seleccione el id del producto que desea agregar al carrito");
            prodFil.forEach((obj) =>{
                alert("ID: " + obj.id + " " + obj.nombre + " $" +obj.precio);
            });
            do{
                let opId = Number(prompt("Ingrese el ID del objeto que desea agregar al carrito: "));
                if(opId > productos.length || opId < 0){
                    alert("Error el id ingresado no es valido.")
                }else{
                    const prodSelec= productos.find((el) => el.id == opId);
                    carrito.push(prodSelec);
                    alert("Su producto ha sido cargado");
                    console.log(carrito);
                    carrito.forEach((obj) =>{
                        console.log(obj.precio);
                    })
                }
            }while(opId > productos.length || opId < 0);
        }else{
            const prodSelec= productos.find((el) => el.nombre == nom);
            carrito.push(prodSelec);
            alert("Su producto ha sido cargado");
            console.log(carrito);
        }
    }else{
        alert("El nombre no coincide");
    }
}

function mostrarCarrito(){
    alert("Los productos de su carrito son: ")
    carrito.forEach((obj) => {
        alert("Prod: " + obj.nombre + " Precio: $" + obj.precio);
    });
    const vecPrecios = carrito.map((item) => {
        let precios = {
            "precio": item.precio 
        };
        return precios;
    })
    
    const total = vecPrecios.reduce((acum,elem) => acum + elem.precio, 0);
    console.log(total);
    alert("Ya se mostro todo el carrito, el valor total del carrito es: $" + total);
}


//LLEGASET HASTA ACA EZE TENDRIAS QUE AGREGAR DENTRO DEL IF EL METODO SPLITE() PARA
//ELIMINAR EL OBJETO DEL VECTOR
function modificarCarrito(){
    for(let i = 0; i < carrito.length; i++){
        alert("Posicion: " + i + " Nombre del Producto: " + carrito[i].nombre + " Precio: $" + carrito[i].precio );
    }
    let pos = prompt("Ingrese la posicion del producto que desea eliminar (recuerde que el primer elemento es 0)");
    if(pos < carrito.length && pos >= 0){
        alert("La posicion fue ingresada correctamente ");
        carrito.splice(pos,1);
        alert("Se ha modificado con exito el carrito.")
    }else{
        alert("Posicion ingresada invalida");
    }
}

//inicio de codigo


do{
    
    op = menu();
    if(op==1){ // Mostrar los productos disponibles
       productos.forEach((item) => {
        alert(item.nombre + " $" +item.precio)
       })
    }else if(op==2){ // Cargar productos en carrito
        cargarCarrito(productos);
    }else if(op==3){ //Mostrar carrito y precio total
        if(carrito.length != 0){
            mostrarCarrito();
        }else{
            alert("Todavia no ingreso ningun producto al carrito.")
        }
    }else if(op==4){
        if(carrito.length != 0){
            modificarCarrito();
        }else{
            alert("Deberia ingresar al menos un producto en el carrito antes de eliminarlo");
        }
    }else if(op == 0 || op === null){
        alert(`Gracias por usar esta pagina`)
        break;
    }else{
        alert("Usted no ingreso ninguna de las opciones, Por favor Ingrese una opcion valida")
    }
    
}while(op != 0 || op != null);