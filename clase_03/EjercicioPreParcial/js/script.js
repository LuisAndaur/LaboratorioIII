// -----------------------------------------
// String formato json 
// Lo pasamos a un array de objetos
// -----------------------------------------
let string = '[{"id":9000,"nombre":"Vought","velMax":5000,"altMax":18000,"cantTurb":4},{"id":5500,"nombre":"Ford","velMax":220,"cantPue":5 },{"id":7720,"nombre":"Pilatus","velMax":9800,"altMax":14500,"cantTurb":2},{"id":11230,"nombre":"Kia","velMax":150,"cantPue":3 },{"id":6900,"nombre":"MD-80","velMax":23000,"altMax":52000,"cantTurb":8},{"id":1340,"nombre":"Starfighter","velMax":5600,"altMax":33400,"cantTurb":5},{"id":1330,"nombre":"Citroen","velMax":200,"cantPue":2 },{"id":4444,"nombre":"Beechcraft","velMax":7688,"altMax":7400,"cantTurb":6}]';
let miArray = JSON.parse(string);
console.log(miArray);

// -----------------------------------------
// CONVIERTE EL ARRAY EN STRING
// let string = JSON.stringify(miArray);
// console.log(string);
// -----------------------------------------


// -----------------------------------------
//                 CLASES
// -----------------------------------------
class Vehiculo{

    constructor(id, nombre, velMax){
        this._id = id;
        this._nombre = nombre;
        this._velMax = velMax;
    }

    get id(){
        return this._id;
    }

    set id(value){
        this._id = value;
    }

    get nombre(){
        return this._nombre;
    }

    set nombre(value){
        this._nombre = value;
    }

    get velMax(){
        return this._velMax;
    }   

    set velMax(value){
        this._velMax = value;
    }
}

class Auto extends Vehiculo{

    constructor(id, nombre, velMax, cantPue){
        super(id, nombre, velMax);
        this._cantPue = cantPue;
    }

    get cantPue(){
        return this._cantPue;
    }

    set cantPue(value){
        this._cantPue = value;
    }
}

class Avion extends Vehiculo{

    constructor(id, nombre, velMax, cantTurb, altMax){
        super(id, nombre, velMax);
        this._cantTurb = cantTurb;
        this._altMax = altMax;
    }

    get cantTurb(){
        return this._cantTurb;
    }

    set cantTurb(value){
        this._cantTurb = value;
    }

    get altMax(){
        return this._altMax;
    }

    set altMax(value){
        this._altMax = value;
    }
}

// -----------------------------------------
// Array de vehiculos a partir del string original
// Mapeamos y pasamos un array de objetos
// a un array de vehiculos
// -----------------------------------------
let arrVehiculo = miArray.map(function(x) {
    if(x.hasOwnProperty("cantPue")){
        return new Auto(x.id,x.nombre,x.velMax,x.cantPue);      
    }
    if(x.hasOwnProperty("cantTurb")){
        return new Avion(x.id,x.nombre,x.velMax,x.cantTurb,x.altMax);        
    }
 });

console.log(arrVehiculo);

// -----------------------------------------
// ELIMINAR TABLA
// -----------------------------------------
function limpiarTabla() {
    let autos = arrVehiculo.filter(x => 'cantPue' in x);
    let aviones = arrVehiculo.filter(x => 'cantTurb' in x);
    let cuerpoTabla = document.querySelector("#cuerpoTabla");
    if(cuerpoTabla.childElementCount>0){
        if(cuerpoTabla.childElementCount == autos.length){
            autos.forEach(() => {
                let tr = cuerpoTabla.querySelector("tr");
                cuerpoTabla.removeChild(tr);        
            });
        }
        else{
            if(cuerpoTabla.childElementCount == aviones.length){
                aviones.forEach(() => {
                    let tr = cuerpoTabla.querySelector("tr");
                    cuerpoTabla.removeChild(tr);        
                });
            }
            else{
                arrVehiculo.forEach(() => {
                    let tr = cuerpoTabla.querySelector("tr");
                    cuerpoTabla.removeChild(tr);        
                });
            }
        }
        
    }
}

// -----------------------------------------
// GENERAR TABLA
// -----------------------------------------
function generarTabla() {

    let cuerpoTabla = document.querySelector("#cuerpoTabla");
    if(!cuerpoTabla.childElementCount>0){
        arrVehiculo.forEach(vehiculo => {
            
            let tr = document.createElement("TR");
            tr.getElementById = vehiculo.id;
            tr.ondblclick = deleteRow;
            tr.onclick = cargarCampos;
   
            let tdId = document.createElement("TD");
            tdId.textContent = vehiculo.id;            
            tr.appendChild(tdId);
                        
    
            let tdNombre = document.createElement("TD");
            tdNombre.textContent = vehiculo.nombre;
            tr.appendChild(tdNombre);
    
            let tdVelMax = document.createElement("TD");
            tdVelMax.textContent = vehiculo.velMax;
            tr.appendChild(tdVelMax);
    
            let tdCantPue = document.createElement("TD");
            tdCantPue.textContent = vehiculo.cantPue;
            tr.appendChild(tdCantPue);
    
            let tdCantTurb = document.createElement("TD");
            tdCantTurb.textContent = vehiculo.cantTurb;
            tr.appendChild(tdCantTurb);
    
            let tdAltMax = document.createElement("TD");
            tdAltMax.textContent = vehiculo.altMax;
            tr.appendChild(tdAltMax);
    
            cuerpoTabla.appendChild(tr);
        });

    }
}


// -----------------------------------------
// BOTONES
// ORDENAMIENTO
// -----------------------------------------
function ordenarId(){
        arrVehiculo.sort( (a, b) => {
            if (a.id > b.id) { /* condición cuando el primer elemento es mayor que el segundo */
            return 1;
            } 
            else if (a.id < b.id) { /* condición cuando el segundo elemento es mayor que el primero */
                return -1;
            } 
            else { /* caso indefinido o iguales por defecto */
                return 0;
            }
            });

        limpiarTabla();
        generarTabla();
}

function ordenarNombre(){
    arrVehiculo.sort( (a, b) => {
        if (a.nombre > b.nombre) { /* condición cuando el primer elemento es mayor que el segundo */
        return 1;
        } 
        else if (a.nombre < b.nombre) { /* condición cuando el segundo elemento es mayor que el primero */
            return -1;
        } 
        else { /* caso indefinido o iguales por defecto */
            return 0;
        }
        });

    limpiarTabla();
    generarTabla();
}

function ordenarVelMax(){
    arrVehiculo.sort( (a, b) => {
        if (a.velMax > b.velMax) { /* condición cuando el primer elemento es mayor que el segundo */
        return 1;
        } 
        else if (a.velMax < b.velMax) { /* condición cuando el segundo elemento es mayor que el primero */
            return -1;
        } 
        else { /* caso indefinido o iguales por defecto */
            return 0;
        }
        });

    limpiarTabla();
    generarTabla();
}

function ordenarCantPue(){
    arrVehiculo.sort( (a, b) => {
        if ((a.cantPue || !a.value) > (b.cantPue || !b.value)) { /* condición cuando el primer elemento es mayor que el segundo */
        return 1;
        } 
        else if ((a.cantPue || !a.value) < (b.cantPue || !b.value)) { /* condición cuando el segundo elemento es mayor que el primero */
            return -1;
        } 
        else { /* caso indefinido o iguales por defecto */
            return 0;
        }
        });

    limpiarTabla();
    generarTabla();
}

function ordenarCantTurb(){
    arrVehiculo.sort( (a, b) => {
        if ((a.cantTurb || !a.value) > (b.cantTurb || !b.value)) { /* condición cuando el primer elemento es mayor que el segundo */
        return 1;
        } 
        else if ((a.cantTurb || !a.value) < (b.cantTurb || !b.value)) { /* condición cuando el segundo elemento es mayor que el primero */
            return -1;
        } 
        else { /* caso indefinido o iguales por defecto */
            return 0;
        }
        });

    limpiarTabla();
    generarTabla();
}

function ordenarAltMax(){
    arrVehiculo.sort( (a, b) => {
        if ((a.altMax || !a.value) > (b.altMax || !b.value)) { /* condición cuando el primer elemento es mayor que el segundo */
        return 1;
        } 
        else if ((a.altMax || !a.value) < (b.altMax || !b.value)) { /* condición cuando el segundo elemento es mayor que el primero */
            return -1;
        } 
        else { /* caso indefinido o iguales por defecto */
            return 0;
        }
        });

    limpiarTabla();
    generarTabla();
}


// -----------------------------------------
// FILTRADOS
// -----------------------------------------
function filtradoTabla(obj) {
    
    const cuerpoTabla = document.getElementById("cuerpoTabla");
    if(!cuerpoTabla.childElementCount>0){
        if(obj == "autos"){
            let autos = arrVehiculo.filter(x => 'cantPue' in x);
            autos.forEach(vehiculo => {
                const tr = document.createElement("tr");
        
                let tdId = document.createElement("td");
                tdId.textContent = vehiculo.id;                
                tr.appendChild(tdId);
        
                let tdNombre = document.createElement("td");
                tdNombre.textContent = vehiculo.nombre;
                tr.appendChild(tdNombre);
        
                let tdVelMax = document.createElement("td");
                tdVelMax.textContent = vehiculo.velMax;
                tr.appendChild(tdVelMax);
        
                let tdCantPue = document.createElement("td");
                tdCantPue.textContent = vehiculo.cantPue;
                tr.appendChild(tdCantPue);
        
                let tdCantTurb = document.createElement("td");
                tdCantTurb.textContent = vehiculo.cantTurb;
                tr.appendChild(tdCantTurb);
        
                let tdAltMax = document.createElement("td");
                tdAltMax.textContent = vehiculo.altMax;
                tr.appendChild(tdAltMax);
        
                cuerpoTabla.appendChild(tr);
            });
        }
        else{
            let aviones = arrVehiculo.filter(x => 'cantTurb' in x);
            aviones.forEach(vehiculo => {
                const tr = document.createElement("tr");
        
                let tdId = document.createElement("td");
                tdId.textContent = vehiculo.id;
                tr.appendChild(tdId);
        
                let tdNombre = document.createElement("td");
                tdNombre.textContent = vehiculo.nombre;
                tr.appendChild(tdNombre);
        
                let tdVelMax = document.createElement("td");
                tdVelMax.textContent = vehiculo.velMax;
                tr.appendChild(tdVelMax);
        
                let tdCantPue = document.createElement("td");
                tdCantPue.textContent = vehiculo.cantPue;
                tr.appendChild(tdCantPue);
        
                let tdCantTurb = document.createElement("td");
                tdCantTurb.textContent = vehiculo.cantTurb;
                tr.appendChild(tdCantTurb);
        
                let tdAltMax = document.createElement("td");
                tdAltMax.textContent = vehiculo.altMax;
                tr.appendChild(tdAltMax);
        
                cuerpoTabla.appendChild(tr);
            });
        }
        
    }
}

// -----------------------------------------
// SELECT
// -----------------------------------------
function select() {
    let x = document.getElementById("select").value;
    switch (x) {
        case "autos":
            limpiarTabla();
            filtradoTabla("autos");
            break;
    
        case "aviones":
            limpiarTabla();
            filtradoTabla("aviones");
            break;
    
        default:
            limpiarTabla();
            generarTabla();
            break;
      }
}


// -----------------------------------------
// FORMULARIO
// PINTAR ULTIMO VEHICULO
// -----------------------------------------

function pintarUltimo() {
    let indice = arrVehiculo.length-1;

    const tr = document.createElement("tr");

    let tdId = document.createElement("td");
    tdId.textContent = arrVehiculo[indice].id;
    tr.appendChild(tdId);

    let tdNombre = document.createElement("td");
    tdNombre.textContent = arrVehiculo[indice].nombre;
    tr.appendChild(tdNombre);

    let tdVelMax = document.createElement("td");
    tdVelMax.textContent = arrVehiculo[indice].velMax;
    tr.appendChild(tdVelMax);

    let tdCantPue = document.createElement("td");
    tdCantPue.textContent = arrVehiculo[indice].cantPue;
    tr.appendChild(tdCantPue);

    let tdCantTurb = document.createElement("td");
    tdCantTurb.textContent = arrVehiculo[indice].cantTurb;
    tr.appendChild(tdCantTurb);

    let tdAltMax = document.createElement("td");
    tdAltMax.textContent = arrVehiculo[indice].altMax;
    tr.appendChild(tdAltMax);

    cuerpoTabla.appendChild(tr);
}



// -----------------------------------------
// FORMULARIO
// AGREGAR VEHICULO
// -----------------------------------------

function agregarVehiculo(){
    let id = parseInt(document.getElementById("id").value);
    let nombre = document.getElementById("nombre").value;
    let velMax = parseInt(document.getElementById("velMax").value);
    let cantPuer = parseInt(document.getElementById("cantPuer").value);
    let cantTurb = parseInt(document.getElementById("cantTurb").value);
    let altMax = parseInt(document.getElementById("altMax").value);

    if(id>0 && nombre!="" && velMax>0){
        if(document.getElementById('auto').checked){
            if(id>0 && nombre!="" && velMax>0 && cantPuer>0){
                arrVehiculo.push(new Auto(id,nombre,velMax,cantPuer));
            }
        }
        else{
            if(id>0 && nombre!="" && velMax>0 && cantTurb>0 && altMax>0){
                arrVehiculo.push(new Avion(id,nombre,velMax,cantTurb,altMax));
            }
        }
        pintarUltimo();
    }
    else{
        alert("Completar el formulario");
    }
    
}



// -----------------------------------------
// ELIMINAR VEHICULO
// -----------------------------------------

function deleteRow(){
    var tr = event.target.parentNode; 
    var tbody = tr.parentNode; // the row to be removed

    for(let i=0; i<arrVehiculo.length;i++){
        if(tr.getElementById == arrVehiculo[i].id){
            arrVehiculo.splice(i,1);
            tbody.parentNode.deleteRow(tr.rowIndex);
        }
    }    
}


// -----------------------------------------
// ACTUALIZAR VEHICULO
// -----------------------------------------
function cargarCampos(){
    var tr = event.target.parentNode;

    if(tr.cells[3].innerHTML>0){
        document.getElementById('auto').checked = true;
    }
    else{
        document.getElementById('avion').checked = true;
    }
    document.getElementById("id").value = tr.cells[0].innerHTML;
    document.getElementById("nombre").value = tr.cells[1].innerHTML;
    document.getElementById("velMax").value = tr.cells[2].innerHTML;
    document.getElementById("cantPuer").value = tr.cells[3].innerHTML;
    document.getElementById("cantTurb").value = tr.cells[4].innerHTML;
    document.getElementById("altMax").value = tr.cells[5].innerHTML;
}

function actualizarVehiculo(){
    let id = parseInt(document.getElementById("id").value);
    let nombre = document.getElementById("nombre").value;
    let velMax = parseInt(document.getElementById("velMax").value);
    let cantPuer = parseInt(document.getElementById("cantPuer").value);
    let cantTurb = parseInt(document.getElementById("cantTurb").value);
    let altMax = parseInt(document.getElementById("altMax").value);

    for(let i=0;i<arrVehiculo.length;i++){
        if(id==arrVehiculo[i].id){
            if(id>0 && nombre!="" && velMax>0){
                if(document.getElementById('auto').checked){
                    if(id>0 && nombre!="" && velMax>0 && cantPuer>0){
                        arrVehiculo.splice(i,1,new Auto(id,nombre,velMax,cantPuer));
                    }
                }
                else{
                    if(id>0 && nombre!="" && velMax>0 && cantTurb>0 && altMax>0){
                        arrVehiculo.splice(i,1,new Avion(id,nombre,velMax,cantTurb,altMax));
                    }
                }
            }
        }
    }
    limpiarTabla();
    generarTabla();
    console.log(arrVehiculo);
}

// -----------------------------------------
// LIMPIAR CAMPOS!
// -----------------------------------------
function limpiarCampos(){
    document.getElementById("id").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("velMax").value = "";
    document.getElementById("cantPuer").value = "";
    document.getElementById("cantTurb").value = "";
    document.getElementById("altMax").value = "";
    document.getElementById('auto').checked = false;
    document.getElementById('avion').checked = false;
}