// ESTO TOMA LAS CATEGORIAS Y LAS PONE EN UN SELECT PARA QUE EL USUARIO TENGA FACILIDAD A LA HORA DE BUSCAR UN GENERO
const opciones = () =>{
    const select = document.getElementById("category");
    const select2 = document.getElementById("select2");
    let options = ["Categorias","Aventura","Romance","Fantasia","Terror"];
    let options2 = ["Aventura","Romance","Fantasia","Terror"];
    for(let valor of options){
        const op = document.createElement("OPTION");
        op.innerHTML = valor;
        op.value = valor.toLowerCase();
        select.appendChild(op);
    }
    for(let valor of options2){
        const op = document.createElement("OPTION");
        op.innerHTML = valor;
        op.id= valor;
        op.value = valor.toLowerCase();
        select2.appendChild(op);
    }
}

// EJECUTO ESTA FUNCION PARA QUE LAS OPCIONES SE INSTALEN AL INICIAR LA PAGINA
opciones();

// FUNCION QUE ME PERMITE MOSTRAR EL FORMULARIO Y OCULTAR LAS DEMAS COSAS PARA GENERAR UN EFECTO
document.getElementById("btnAgregar").addEventListener("click",mostrarFormulario);
function mostrarFormulario(){
    document.getElementById("contForm").style.display="block";
    document.getElementById("contenedor").style.display="none";
}

// ESTO ME PERMITE OCULTAR EL FORMULARIO PARA MOSTRAR EL PRINCIPIO , ES DECIR LAS LIBROS Y EL FOOTER
document.getElementById("home").addEventListener("click",inicio);
function inicio(){
    document.getElementById("contForm").style.display="none";
    document.getElementById("contenedor").style.display="flex";
}

// VALIDO LOS DATOS QUE INGRESE EN EL FORMULARIO     
document.getElementById("form").addEventListener("submit",validar);
function validar(e){
    e.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let autor = document.getElementById("autor").value;
    let precio = document.getElementById("precio").value;
    let cantidad = document.getElementById("cantidad").value;
    let descripcion = document.getElementById("descripcion").value;
    let genero = document.getElementById("select2").value;
    if(nombre.length <= 0){
        alert("Falta completar el nombre");
    }else if(autor.length <= 0){
        alert("Falta completar el autor");
    }else if(descripcion.length<=40){
        alert("Tienes que completar la descripcion con un minimo de 40 caracteres");
    }else if(cantidad<=0){
        alert("La cantidad minima es 1");
    }
    const libro = {nombre, autor,descripcion,genero,precio,cantidad}

    if(localStorage.getItem("libros")==null){
        let bd = [];
        bd.unshift(libro);
        localStorage.setItem("libros",JSON.stringify(bd));
    }else{
        let bd = JSON.parse(localStorage.getItem("libros"));
        bd.unshift(libro);
        localStorage.setItem("libros",JSON.stringify(bd));
    }
    mostrarLibros();
    document.getElementById("form").reset();
}

// MUESTRA EN EL HOME PRINCIPAL TODOS LOS LIBROS PRO DEFECTO
function mostrarLibros(){
    let libros = JSON.parse(localStorage.getItem("libros"));
    let home = document.getElementById("contenedor");
    home.innerHTML="";
    if(libros.length<=0){
        home.innerHTML = "<div class='mensajeVacio'>No hay libros disponibles actualmente<div>";
    }else{
        for(const book of libros){
            let nombre = book.nombre;
            let autor = book.autor;
            let descripcion = book.descripcion;
            let precio = book.precio;
            let genero = book.genero;
            let cantidad = book.cantidad;
            home.innerHTML += ordenarCategoria(nombre, genero, autor, descripcion, precio, cantidad);
        }
    }
}

// ESTA FUNCION DA LA ESTRUCTURA DEL LIBRO PARA ASI GUARDARLO
function ordenarCategoria(nombre,genero,autor,descripcion,precio,cantidad){
    return `<div class="book">
        <p class="libro-name">${nombre}</p>
        <p class="genero-libro">Genero:${genero}</p>
        <p class="autor">${autor}</p>
        <p class="descripcion">${descripcion}</p>
        <p class="precio" onclick="comprar('${nombre}','${autor}','${precio}','${cantidad}');">Comprar por $${precio}</p>
        <p class="cantidad color2">Cantidad ${cantidad}</p>
        <p class="cantidad" onclick="agregarCant('${nombre}','${autor}','${precio}','${cantidad}');">Reponer</p>
        <button class="delete" onclick="eliminar('${nombre}','${autor}');">Delete</button>
    </div>`;
}

// EJECUTO ESTA FUNCION PARA QUE LOS LIBROS SE PUEDAN VER AL INICIAR LA PAGINA
mostrarLibros();

// ELIMINA UN LIBRO DEL ARRAY Y ACTUALIZA LA COLECCION
function eliminar(nombre,autor){
    let bd2 = JSON.parse(localStorage.getItem("libros"));
    for(let i in bd2){
        if(bd2[i].nombre == nombre && bd2[i].autor == autor){
            bd2.splice(i,1);
        }
    }
    localStorage.setItem("libros",JSON.stringify(bd2));
    mostrarLibros();
}

// ESTO FUNCION ES MUY IMPORTANTE, YA QUE RECORRE LSO LIBROS CON PARAMETROS QUE YO LE INDIQUE
function recorrerGeneroEspecifico(contenedor,categoriaLibro){
    let bdLibros = JSON.parse(localStorage.getItem("libros"));
    let home2 = document.getElementById("contenedor");
    let contador = 0;
    for(let i of bdLibros){
        let nombre = i.nombre;
        let autor = i.autor;
        let descripcion = i.descripcion;
        let precio = i.precio;
        let genero = i.genero;
        let cantidad = i.cantidad;
        if(genero==categoriaLibro){
            contenedor.innerHTML += ordenarCategoria(nombre,genero,autor,descripcion,precio,cantidad);
            contador++;
        }
    }
    if(contador==0){
        home2.innerHTML = `<div class='mensajeVacio'>No hay libros disponibles actualmente en la sección de ${categoriaLibro}<div>`;
    }
}

// ESTO MUESTRA LOS LIBROS POR CATEGORIA ATRAVES DEL ELEMENTO SELECT DEL MENU
document.getElementById("category").addEventListener("change",mostrarPorCategoria);
function mostrarPorCategoria(){
    const selectCategory = document.getElementById("category").value;
    let bdLibros2 = JSON.parse(localStorage.getItem("libros"));
    let home = document.getElementById("contenedor");
    home.innerHTML="";
    if(bdLibros2.length<=0){
        home.innerHTML = "<div class='mensajeVacio'>No hay libros disponibles actualmente<div>";
    }else{
        if(selectCategory=="aventura"){
            recorrerGeneroEspecifico(home,selectCategory);
        }else if(selectCategory=="fantasia"){
            recorrerGeneroEspecifico(home,selectCategory);
        }else if(selectCategory=="terror"){
            recorrerGeneroEspecifico(home,selectCategory);
        }else if(selectCategory=="romance"){
            recorrerGeneroEspecifico(home,selectCategory);
        }else if(selectCategory=="categorias"){
            let bdLibros = JSON.parse(localStorage.getItem("libros"));
            for(let book of bdLibros){
                let nombre = book.nombre;
                let autor = book.autor;
                let descripcion = book.descripcion;
                let precio = book.precio;
                let genero = book.genero;
                let cantidad = book.cantidad;
                contenedor.innerHTML += ordenarCategoria(nombre, genero, autor, descripcion, precio, cantidad);
            }
        }
    }
}

// MUESTRO EL FORMULARIO PARA REALIZAR LA COMPRA
function comprar(nombre,autor,precio,cantidad){
    let bd = JSON.parse(localStorage.getItem("libros"));
    var cantidadComprar = parseInt(prompt(`Precio del libro : $${precio}\nCantidad Actual: ${cantidad}\n¿Cuantos desea comprar?`));
    if(cantidadComprar<=cantidad){
        for(let i in bd){
            if(bd[i].nombre==nombre && bd[i].autor==autor && bd[i].precio==precio && bd[i].cantidad==cantidad){
                bd[i].cantidad = cantidad - cantidadComprar;
                // console.log(bd[i]);
                console.log("Comprado");
                alert(`El costo Total es ${precio*cantidadComprar}`);
            }
            if(bd[i].cantidad==0){
                bd.splice(i,1);
            }
        }
    }else{
        alert("No esta dentro del rango de cantidad maxima de unidades del libro");
    }
    localStorage.setItem("libros",JSON.stringify(bd));
    mostrarLibros();
}

// AGREGA LA CANTIDAD DE UNIDADES DE UN LIBRO PARA REPONERLO
function agregarCant(nombre,autor,precio,cantidad){
    let bd = JSON.parse(localStorage.getItem("libros"));
    var reponerStock = parseInt(prompt(`Ingrese la cantidad a reponer`));
    let spaceMax = 99999999 - cantidad;
    if(reponerStock<=spaceMax){
        for(let i in bd){
            if(bd[i].nombre==nombre && bd[i].autor==autor && bd[i].precio==precio && bd[i].cantidad==cantidad){
                bd[i].cantidad = parseInt(cantidad) + reponerStock;
                console.log("Agregado");
            }else if(bd[i].cantidad==99999999){
                bd[i].cantidad += "Completo"; 
            }
        }
    }else{
        alert("No esta dentro del rango de cantidad maxima de unidades del libro");
    }
    
    localStorage.setItem("libros",JSON.stringify(bd));
    mostrarLibros();
}

