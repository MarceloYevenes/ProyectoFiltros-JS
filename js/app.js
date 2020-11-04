//Selector para el tbody
const elementos = document.querySelector(".contenido");
const buttonMostrarTodo = document.querySelector(".buttonTodo");
const buttonLimpiarTabla = document.querySelector(".buttonLimpiar");
const areaBuscadora = document.querySelector("#buscador");


//---Eventos---

//Evento al cargar el documento
document.addEventListener('DOMContentLoaded',()=>{
    mostrarTabla(personas);
});

//Evento para el boton mostrar toda la tabla
buttonMostrarTodo.addEventListener('click',()=>{
    mostrarTabla(personas);
});

//Evento para el boton limpiar toda la tabla
buttonLimpiarTabla.addEventListener('click',limpiarTabla);

//Evento buscar elementos(Detecta cada vez que se agrega un caracter)
areaBuscadora.addEventListener('input',(e)=>{
    //Detecta lo que esta escrito
    let valorBuscado= e.target.value;
    
    if(valorBuscado.length>=2){
        //Crea un nuevo array filtrado con todos los caracteres
        let filtrado = personas.filter((persona)=>{
           //Se retorna el valor buscado
           return persona.nombre.includes(valorBuscado);
        });
        mostrarTabla(filtrado);
    }else{
        mostrarTabla(personas);
    }
});


//---Funciones---

function limpiarTabla(){
    while(elementos.firstChild){
        elementos.removeChild(elementos.firstChild);
    }
}

function clickearVerMas(e,id){
    alert(`La id del usuario es: ${id}`);
}

function mostrarTabla(personas) {
  //Evitar repeticion de informacion  
  limpiarTabla();
  //Iterar sobre el array de objetos y mostrarlo en una tabla
  personas.forEach((element) => {
    

    //Selector para crear filas en el body
    const filaNueva = document.createElement("tr");

    //Para crear cada elemento de la fila
    const nuevoElementoID = document.createElement("td");
    const nuevoElementoNombre = document.createElement("td");
    const nuevoElementoTelefono = document.createElement("td");
    const nuevoElementoButton = document.createElement("td");
    const nuevoElementoProfesion = document.createElement("td");
    const nuevoElementoCiudad = document.createElement("td");
    const nuevoButton = document.createElement("button");

    //Agrega texto el button
    nuevoButton.type="button";
    nuevoButton.innerText = 'Ver más';  
    //Clases para los extilos
    nuevoButton.classList.add('btn','btn-primary');   

    //Evento al button
    nuevoButton.addEventListener('click',(e)=>{
        clickearVerMas(e,element.id);
    })

    //Para darle contenido a cada elemento de la fila
    nuevoElementoID.textContent = element.id;
    nuevoElementoNombre.textContent = element.nombre;
    nuevoElementoTelefono.textContent = element.telefono;
    nuevoElementoProfesion.textContent = element.profesion;
    nuevoElementoCiudad.textContent = element.ciudad;

    
    //Se agrega el button al td
    nuevoElementoButton.appendChild(nuevoButton)

    //Se agrega cada elemento del td al tr
    filaNueva.appendChild(nuevoElementoID);
    filaNueva.appendChild(nuevoElementoNombre);
    filaNueva.appendChild(nuevoElementoTelefono);
    filaNueva.appendChild(nuevoElementoProfesion);
    filaNueva.appendChild(nuevoElementoCiudad);
    filaNueva.appendChild(nuevoElementoButton);

    //Se agrega el tr al tbody
    elementos.appendChild(filaNueva);
  });
}



