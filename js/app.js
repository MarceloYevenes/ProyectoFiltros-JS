//Selector para el tbody
const elementos = document.querySelector(".contenido");
const buttonMostrarTodo = document.querySelector(".buttonTodo");
const buttonLimpiarTabla = document.querySelector(".buttonLimpiar");
const areaBuscadora = document.querySelector("#buscador");

//Selectores para los filtros
const selectProfesion = document.querySelector(".select-profesion");
const selectCiudad = document.querySelector(".select-ciudad");

//Seleccion para mensaje de error
const mensaje = document.querySelector('.mensaje');

//Objeto para establecer datos de busqueda
const datosBusqueda = {
    ciudad:'',
    profesion:''
}


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

//Se agregan a un objeto para establecer todos los filtros
selectProfesion.addEventListener('change',(e)=>{
    datosBusqueda.profesion=e.target.value;
    filtrarPersonas();
});

//Se agregan a un objeto para establecer todos los filtros
selectCiudad.addEventListener('change',(e)=>{
    datosBusqueda.ciudad=e.target.value;
    filtrarPersonas();
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
 
  if(personas.length===0){
    const mensajeError = document.createElement('p');
    mensajeError.innerHTML="No hay elementos que coincidan con la búsqueda";
    mensaje.appendChild(mensajeError);
  }else{
    limpiarMensajeError();
  }
     

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

//Funcion con filter anidados que llamana a una funcion cada filter
function filtrarPersonas(){
    const resultado = personas.filter(filtrarProfesion).filter(filtrarCiudad);
    mostrarTabla(resultado);
}

//Se recibe el dato persona y se pregunta si coincide con el criterio
function filtrarProfesion(persona){
    if(datosBusqueda.profesion){
        return persona.profesion === datosBusqueda.profesion
    }else{
        return persona
    }
}

//Se recibe el dato persona y se pregunta si coincide con el criterio
function filtrarCiudad(persona){
    if(datosBusqueda.ciudad){
        return persona.ciudad === datosBusqueda.ciudad
    }else{
        return persona
    }
}

function limpiarMensajeError(){
    while(mensaje.firstChild){
        mensaje.removeChild(mensaje.firstChild);
    }
}


