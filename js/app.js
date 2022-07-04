//VARIABLES
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");
const resultado = document.querySelector("#resultado");


const max = new Date().getFullYear();
const min = max - 15;

//Generar un objeto con la busqueda
const datosBusqueda = {
   marca:"",
   year:"",
   minimo:"",
   maximo:"",
   puertas:"",
   transmision:"",
   color:"", 
}



//EVENTOS
document.addEventListener("DOMContentLoaded", () => {
    mostrarAutos(autos); //muestra los autos al cargar

    //Llena las opciones de años
    llenarSelect();
});

//Event listeners para los select de busqueda - El change toma cuando cambia el select y la e es el evento
marca.addEventListener("change", e =>{
    console.log(e.target.value)
    datosBusqueda.marca= e.target.value;

    filtrarAuto();
    
});

year.addEventListener("change", e =>{
    datosBusqueda.year = e.target.value;
    filtrarAuto();
});

minimo.addEventListener("change", e =>{
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
});

maximo.addEventListener("change", e =>{
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});

puertas.addEventListener("change", e =>{
    datosBusqueda.puertas = parseInt(e.target.value); //se puede poner el parseint aca o en la funcion abajo cuando filtramos
    filtrarAuto();
});

transmision.addEventListener("change", e =>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener("change", e =>{
    datosBusqueda.color= e.target.value;
    filtrarAuto();
});






//FUNCIONES
function mostrarAutos(autos){

    limpiarHTML(); //Elimina el html previo 

    autos.forEach(auto => {

        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autoHTML = document.createElement("p");
        //console.log(year)

        autoHTML.textContent = `
        ${ marca } ${ modelo } - ${ year } - ${ puertas } Puertas - Transmisión ${ transmision } - Precio $ ${ precio } - Color ${ color }
        
        `;


        resultado.appendChild(autoHTML);
    });

}

//Limpiar HTML para los resultados del filtro - sino los resultados quedan abajo, por el appendchild
function limpiarHTML(){
    //limpiamos el resultado 
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

}

//Genera los años del select
function llenarSelect(){
    for (let i = max; i > min; i--){
        console.log(i);
        const opcion = document.createElement("option");
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // Agrega las opciones de años al select
    }
   
    
}

//Funcion que va filtrando mientras cambiamos los select
function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca) .filter( filtrarYear ) .filter( filtrarMinimo ) .filter( filtrarMaximo ).filter( filtrarTransmision ) .filter( filtrarColor ) .filter(filtrarPuertas);

    if(resultado.length){ 
       mostrarAutos(resultado); //pasamos la funcion que imprime en el html cambiando el parametro de autos por el de resultado
    } else {
        noResultado();
    }
   

}

function noResultado(){

    limpiarHTML();

    const noResultado = document.createElement("div");
    noResultado.classList.add("alerta", "error");
    noResultado.textContent="No hay resultados";
    resultado.appendChild(noResultado);
}


function filtrarMarca(auto){
    const { marca } = datosBusqueda;
    if( marca ){
        return auto.marca === marca;
    }
    return auto;

}

function filtrarYear(auto){
    const { year } = datosBusqueda;
    if( year ){
        return auto.year === parseInt(year); //porque year esta como string
    }
    return auto;

}

function filtrarMinimo(auto){
    const { minimo } = datosBusqueda;
    if( minimo ){
        return auto.precio >= minimo; //
    }
    return auto;

}

function filtrarMaximo(auto){
    const { maximo } = datosBusqueda;
    if( maximo ){
        return auto.precio <= maximo; //
    }
    return auto;

}

function filtrarTransmision(auto){
    const { transmision } = datosBusqueda;
    if( transmision ){
        return auto.transmision === transmision;
    }
    return auto;

}

function filtrarColor(auto){
    const { color } = datosBusqueda;
    if( color ){
        return auto.color === color;
    }
    return auto;

}

function filtrarPuertas(auto){
    const { puertas } = datosBusqueda;
    if( puertas ){
        return auto.puertas === parseInt(puertas); //porque puerta esta como string
    }
    return auto;

}