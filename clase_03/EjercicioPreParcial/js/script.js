// -----------------------------------------
// String formato json 
// Lo pasamos a un array de objetos
// -----------------------------------------
let vec = '[{"id":9000,"nombre":"Boeing I","velMax":5000,"altMax":12000,"cantTurb":4},{"id":5500,"nombre":"Ford","velMax":6500,"cantPue":2 },{"id":1230,"nombre":"Kia","velMax":1500,"cantPue":5 },{"id":7720,"nombre":"Pilatus","velMax":9800,"altMax":14500,"cantTurb":6},{"id":6900,"nombre":"MD-80","velMax":23000,"altMax":52000,"cantTurb":8}]';
let miArray = JSON.parse(vec);
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
// GENERAR TABLA
// -----------------------------------------
function generarTabla() {
    
    const cuerpoTabla = document.querySelector("#cuerpoTabla");
    arrVehiculo.forEach(vehiculo => {
        // Crear un <tr>
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

// -----------------------------------------
// ELIMINAR TABLA
// -----------------------------------------
function limpiarTabla() {
    let cuerpoTabla = document.querySelector("#cuerpoTabla");
    arrVehiculo.forEach(() => {
        let tr = cuerpoTabla.querySelector("tr");
        cuerpoTabla.removeChild(tr);        
    });
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
        if (a.cantPue > b.cantPue) { /* condición cuando el primer elemento es mayor que el segundo */
        return 1;
        } 
        else if (a.cantPue < b.cantPue) { /* condición cuando el segundo elemento es mayor que el primero */
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
        if (a.cantTurb > b.cantTurb) { /* condición cuando el primer elemento es mayor que el segundo */
        return 1;
        } 
        else if (a.cantTurb < b.cantTurb) { /* condición cuando el segundo elemento es mayor que el primero */
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
    arrVehiculo = arrVehiculo.filter(x => x.id).sort( (a, b) => {
        if (a.altMax > b.altMax) { /* condición cuando el primer elemento es mayor que el segundo */
        return 1;
        } 
        else if (a.altMax < b.altMax) { /* condición cuando el segundo elemento es mayor que el primero */
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
// SELECT
// -----------------------------------------
function select() {
    let x = document.getElementById("select").value;
    switch (x) {
        case "autos":
          
            break;
    
        case "aviones":
          
            break;
        
        case "todos":
            limpiarTabla();
            generarTabla();
            break;
    
        default:
          
            break;
      }
}





