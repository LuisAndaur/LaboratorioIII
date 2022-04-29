"use strict"

// -----------------------------------------
//                 CLASES
// -----------------------------------------
class Persona{

    constructor(id, nombre, apellido){
        this._id = id;
        this._nombre = nombre;
        this._apellido = apellido;
    }

    get Id(){
        return this._id;
    }

    set Id(value){
        this._id = value;
    }

    get Nombre(){
        return this._nombre;
    }

    set Nombre(value){
        this._nombre = value;
    }

    get Apellido(){
        return this._apellido;
    }   

    set Apellido(value){
        this._apellido = value;
    }

    toString(){
        return `| ID: ${this.Id} | Nombre: ${this.Nombre} | Apellido: ${this.Apellido}`;
    }
}

class Cliente extends Persona{

    constructor(id, nombre, apellido, edad, sexo){
        super(id, nombre, apellido);
        this._edad = edad;
        this._sexo = sexo;
    }

    get Edad(){
        return this._edad;
    }

    set Edad(value){
        this._edad = value;
    }

    get Sexo(){
        return this._sexo;
    }

    set Sexo(value){
        this._sexo = value;
    }

    toString(){
        return `${super.toString()} | Edad: ${this.Edad} | Sexo: ${this.Sexo} \n`;
    }
}

class Empleado extends Persona{

    constructor(id, nombre, apellido, cuil, sueldo){
        super(id, nombre, apellido);
        this._cuil = cuil;
        this._sueldo = sueldo;
    }

    get Cuil(){
        return this._cuil;
    }

    set Cuil(value){
        this._cuil = value;
    }

    get Sueldo(){
        return this._sueldo;
    }

    set Sueldo(value){
        this._sueldo = value;
    }

    toString(){
        return `${super.toString()} | Cuil: ${this.Cuil} | Sueldo: ${this.Sueldo} \n`;
    }
}


// -----------------------------------------
// String formato json 
// Lo pasamos a un array de objetos
// -----------------------------------------
let string = '[{"id":"518", "apellido":"Serrano", "nombre":"Horacio", "edad":"38", "sexo":"M"},{"id":"38","apellido":"Perez", "nombre":"Gabriel", "cuil":"20708945951","sueldo":"58318,30"},{"id":"9812", "apellido":"Martinez", "nombre":"Lorena", "edad":"25","sexo":"F"},{"id":"600", "apellido":"Paez", "nombre":"Micaela", "cuil":"20536275961","sueldo":"75318,30"}, {"id":"785", "apellido":"Manuel", "nombre":"Loza", "edad":"39","sexo":"M"},{"id":"862", "apellido":"Casa", "nombre":"Julian", "cuil":"20428684151","sueldo":"60318,30"}]';
let miArray = JSON.parse(string);
console.log(miArray);

// -----------------------------------------
// CONVIERTE EL ARRAY EN STRING
// let string = JSON.stringify(miArray);
// console.log(string);
// -----------------------------------------

// -----------------------------------------
// Array de personas a partir del string original
// Mapeamos y pasamos un array de objetos
// a un array de personas
// -----------------------------------------
let arrPersona = miArray.map(function(x) {
    if(x.hasOwnProperty("edad")){
        return new Cliente(x.id,x.nombre,x.apellido,x.edad,x.sexo);      
    }
    if(x.hasOwnProperty("cuil")){
        return new Empleado(x.id,x.nombre,x.apellido,x.cuil,x.sueldo);        
    }
 });

console.log(arrPersona);

// -----------------------------------------
// ELIMINAR TABLA
// -----------------------------------------
function limpiarTabla() {
    let cliente = arrPersona.filter(x => '_edad' in x);
    let empleado = arrPersona.filter(x => '_cuil' in x);
    let cuerpoTabla = document.querySelector("#cuerpoTabla");
    if(cuerpoTabla.childElementCount>=0){
        if(cuerpoTabla.childElementCount == cliente.length){
            cliente.forEach(() => {
                let tr = cuerpoTabla.querySelector("tr");
                cuerpoTabla.removeChild(tr);        
            });
        }
        else{
            if(cuerpoTabla.childElementCount == empleado.length){
                empleado.forEach(() => {
                    let tr = cuerpoTabla.querySelector("tr");
                    cuerpoTabla.removeChild(tr);        
                });
            }
            else{
                arrPersona.forEach(() => {
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
let body = document.getElementById('body');
body.addEventListener('load', generarTabla());

function generarTabla() {

    let cuerpoTabla = document.querySelector("#cuerpoTabla");
    if(!cuerpoTabla.childElementCount>=0){

        arrPersona.forEach(persona => {
            let tr = document.createElement("tr");
            tr.addEventListener('click', cargarCampos);
            // tr.ondblclick = deleteRow;
   
            let tdId = document.createElement("td");
            tdId.textContent = persona.Id;            
            tr.appendChild(tdId);

            let tdApellido = document.createElement("td");
            tdApellido.textContent = persona.Apellido;
            tr.appendChild(tdApellido);

            let tdNombre = document.createElement("td");
            tdNombre.textContent = persona.Nombre;
            tr.appendChild(tdNombre);
    
            let tdEdad = document.createElement("td");
            tdEdad.textContent = persona.Edad;
            tr.appendChild(tdEdad);
    
            let tdSexo = document.createElement("td");
            tdSexo.textContent = persona.Sexo;
            tr.appendChild(tdSexo);
    
            let tdCuil = document.createElement("td");
            tdCuil.textContent = persona.Cuil;
            tr.appendChild(tdCuil);
    
            let tdSueldo = document.createElement("td");
            tdSueldo.textContent = persona.Sueldo;
            tr.appendChild(tdSueldo);
    
            cuerpoTabla.appendChild(tr);
        });
    }
}


// -----------------------------------------
// BOTONES
// ORDENAMIENTO
// -----------------------------------------
let orderId = document.getElementById('oId');
orderId.addEventListener('click', ordenarId);
function ordenarId(){
        arrPersona.sort( (a, b) => {
            if (a.Id > b.Id) { 
            return 1;
            } 
            else if (a.Id < b.Id) { 
                return -1;
            } 
            else { 
                return 0;
            }
            });

        limpiarTabla();
        generarTabla();
}

let orderApellido = document.getElementById('oApellido');
orderApellido.addEventListener('click', ordenarApellido);
function ordenarApellido(){
    arrPersona.sort( (a, b) => {
        if (a.Apellido > b.Apellido) { 
        return 1;
        } 
        else if (a.Apellido < b.Apellido) {
            return -1;
        } 
        else { 
            return 0;
        }
        });

    limpiarTabla();
    generarTabla();
}


let orderNombre = document.getElementById('oNombre');
orderNombre.addEventListener('click', ordenarNombre);
function ordenarNombre(){
    arrPersona.sort( (a, b) => {
        if (a.Nombre > b.Nombre) { 
        return 1;
        } 
        else if (a.Nombre < b.Nombre) { 
            return -1;
        } 
        else { 
            return 0;
        }
        });

    limpiarTabla();
    generarTabla();
}

let orderEdad = document.getElementById('oEdad');
orderEdad.addEventListener('click', ordenarEdad);
function ordenarEdad(){
    arrPersona.sort( (a, b) => {
        if ((a.Edad || !a.value) > (b.Edad || !b.value)) {
        return 1;
        } 
        else if ((a.Edad || !a.value) < (b.Edad || !b.value)) { 
            return -1;
        } 
        else { 
            return 0;
        }
        });

    limpiarTabla();
    generarTabla();
}

let orderSexo = document.getElementById('oSexo');
orderSexo.addEventListener('click', ordenarSexo);
function ordenarSexo(){
    arrPersona.sort( (a, b) => {
        if ((a.Sexo || !a.value) > (b.Sexo || !b.value)) {
        return 1;
        } 
        else if ((a.Sexo || !a.value) < (b.Sexo || !b.value)) { 
            return -1;
        } 
        else { 
            return 0;
        }
        });

    limpiarTabla();
    generarTabla();
}

let orderCuil = document.getElementById('oCuil');
orderCuil.addEventListener('click', ordenarCuil);
function ordenarCuil(){
    arrPersona.sort( (a, b) => {
        if ((a.Cuil || !a.value) > (b.Cuil || !b.value)) {
        return 1;
        } 
        else if ((a.Cuil || !a.value) < (b.Cuil || !b.value)) { 
            return -1;
        } 
        else { 
            return 0;
        }
        });

    limpiarTabla();
    generarTabla();
}

let orderSueldo = document.getElementById('oSueldo');
orderSueldo.addEventListener('click', ordenarSueldo);
function ordenarSueldo(){
    arrPersona.sort( (a, b) => {
        if ((a.Sueldo || !a.value) > (b.Sueldo || !b.value)) {
        return 1;
        } 
        else if ((a.Sueldo || !a.value) < (b.Sueldo || !b.value)) { 
            return -1;
        } 
        else {
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
        if(obj == "clientes"){
            let clientes = arrPersona.filter(x => '_edad' in x);
            console.log(clientes);
            clientes.forEach(persona => {
                const tr = document.createElement("tr");
        
                let tdId = document.createElement("td");
                tdId.textContent = persona.Id;                
                tr.appendChild(tdId);

                let tdApellido = document.createElement("td");
                tdApellido.textContent = persona.Apellido;
                tr.appendChild(tdApellido);
        
                let tdNombre = document.createElement("td");
                tdNombre.textContent = persona.Nombre;
                tr.appendChild(tdNombre);
        
                let tdEdad = document.createElement("td");
                tdEdad.textContent = persona.Edad;
                tr.appendChild(tdEdad);
        
                let tdSexo = document.createElement("td");
                tdSexo.textContent = persona.Sexo;
                tr.appendChild(tdSexo);
        
                let tdCuil = document.createElement("td");
                tdCuil.textContent = persona.Cuil;
                tr.appendChild(tdCuil);
        
                let tdSueldo = document.createElement("td");
                tdSueldo.textContent = persona.Sueldo;
                tr.appendChild(tdSueldo);
        
                cuerpoTabla.appendChild(tr);
            });
        }
        else{
            let empleados = arrPersona.filter(x => '_cuil' in x);
            console.log(empleados);
            empleados.forEach(persona => {
                const tr = document.createElement("tr");
        
                let tdId = document.createElement("td");
                tdId.textContent = persona.Id;
                tr.appendChild(tdId);

                let tdApellido = document.createElement("td");
                tdApellido.textContent = persona.Apellido;
                tr.appendChild(tdApellido);
        
                let tdNombre = document.createElement("td");
                tdNombre.textContent = persona.Nombre;
                tr.appendChild(tdNombre);
        
                let tdEdad = document.createElement("td");
                tdEdad.textContent = persona.Edad;
                tr.appendChild(tdEdad);
        
                let tdSexo = document.createElement("td");
                tdSexo.textContent = persona.Sexo;
                tr.appendChild(tdSexo);
        
                let tdCuil = document.createElement("td");
                tdCuil.textContent = persona.Cuil;
                tr.appendChild(tdCuil);
        
                let tdSueldo = document.createElement("td");
                tdSueldo.textContent = persona.Sueldo;
                tr.appendChild(tdSueldo);
        
                cuerpoTabla.appendChild(tr);
            });
        }
        
    }
}

// -----------------------------------------
// SELECT
// -----------------------------------------
let seleccion = document.getElementById('select');
seleccion.addEventListener('change', select);
function select() {
    let x = document.getElementById("select").value;
    switch (x) {
        case "clientes":
            limpiarTabla();
            filtradoTabla("clientes");
            break;
    
        case "empleados":
            limpiarTabla();
            filtradoTabla("empleados");
            break;
    
        default:
            limpiarTabla();
            generarTabla();
            break;
      }
}


// -----------------------------------------
// FORMULARIO
// PINTAR ULTIMO persona
// -----------------------------------------

function pintarUltimo() {
    let indice = arrPersona.length-1;

    const tr = document.createElement("tr");

    let tdId = document.createElement("td");
    tdId.textContent = arrPersona[indice].id;
    tr.appendChild(tdId);

    let tdNombre = document.createElement("td");
    tdNombre.textContent = arrPersona[indice].nombre;
    tr.appendChild(tdNombre);

    let tdVelMax = document.createElement("td");
    tdVelMax.textContent = arrPersona[indice].velMax;
    tr.appendChild(tdVelMax);

    let tdCantPue = document.createElement("td");
    tdCantPue.textContent = arrPersona[indice].cantPue;
    tr.appendChild(tdCantPue);

    let tdCantTurb = document.createElement("td");
    tdCantTurb.textContent = arrPersona[indice].cantTurb;
    tr.appendChild(tdCantTurb);

    let tdAltMax = document.createElement("td");
    tdAltMax.textContent = arrPersona[indice].altMax;
    tr.appendChild(tdAltMax);

    cuerpoTabla.appendChild(tr);
}



// -----------------------------------------
// FORMULARIO
// AGREGAR persona
// -----------------------------------------

function agregarpersona(){
    let id = parseInt(document.getElementById("id").value);
    let nombre = document.getElementById("nombre").value;
    let velMax = parseInt(document.getElementById("velMax").value);
    let cantPuer = parseInt(document.getElementById("cantPuer").value);
    let cantTurb = parseInt(document.getElementById("cantTurb").value);
    let altMax = parseInt(document.getElementById("altMax").value);

    if(id>0 && nombre!="" && velMax>0){
        if(document.getElementById('auto').checked){
            if(id>0 && nombre!="" && velMax>0 && cantPuer>0){
                arrPersona.push(new Auto(id,nombre,velMax,cantPuer));
            }
        }
        else{
            if(id>0 && nombre!="" && velMax>0 && cantTurb>0 && altMax>0){
                arrPersona.push(new Avion(id,nombre,velMax,cantTurb,altMax));
            }
        }
        pintarUltimo();
    }
    else{
        alert("Completar el formulario");
    }
    
}



// -----------------------------------------
// ELIMINAR persona
// -----------------------------------------

function deleteRow(){
    var tr = event.target.parentNode; 
    var tbody = tr.parentNode;

    for(let i=0; i<arrPersona.length;i++){
        if(tr.getElementById == arrPersona[i].id){
            arrPersona.splice(i,1);
            tbody.parentNode.deleteRow(tr.rowIndex);
        }
    }    
}


// -----------------------------------------
// ACTUALIZAR persona
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

function actualizarpersona(){
    let id = parseInt(document.getElementById("id").value);
    let nombre = document.getElementById("nombre").value;
    let velMax = parseInt(document.getElementById("velMax").value);
    let cantPuer = parseInt(document.getElementById("cantPuer").value);
    let cantTurb = parseInt(document.getElementById("cantTurb").value);
    let altMax = parseInt(document.getElementById("altMax").value);

    for(let i=0;i<arrPersona.length;i++){
        if(id==arrPersona[i].id){
            if(id>0 && nombre!="" && velMax>0){
                if(document.getElementById('auto').checked){
                    if(id>0 && nombre!="" && velMax>0 && cantPuer>0){
                        arrPersona.splice(i,1,new Auto(id,nombre,velMax,cantPuer));
                    }
                }
                else{
                    if(id>0 && nombre!="" && velMax>0 && cantTurb>0 && altMax>0){
                        arrPersona.splice(i,1,new Avion(id,nombre,velMax,cantTurb,altMax));
                    }
                }
            }
        }
    }
    limpiarTabla();
    generarTabla();
    console.log(arrPersona);
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