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
// STRING A JSON
// -----------------------------------------
let string = '[{"id":"518", "apellido":"Serrano", "nombre":"Horacio", "edad":"38", "sexo":"M"},{"id":"38","apellido":"Perez", "nombre":"Gabriel", "cuil":"20708945951","sueldo":"58318,30"},{"id":"9812", "apellido":"Martinez", "nombre":"Lorena", "edad":"25","sexo":"F"},{"id":"600", "apellido":"Paez", "nombre":"Micaela", "cuil":"20536275961","sueldo":"75318,30"}, {"id":"785", "apellido":"Manuel", "nombre":"Loza", "edad":"39","sexo":"M"},{"id":"862", "apellido":"Casa", "nombre":"Julian", "cuil":"20428684151","sueldo":"60318,30"}]';
let miArray = JSON.parse(string);
let arrPersona = miArray.map(function(x) {
    if(x.hasOwnProperty("edad")){
        return new Cliente(x.id,x.nombre,x.apellido,x.edad,x.sexo);      
    }
    if(x.hasOwnProperty("cuil")){
        return new Empleado(x.id,x.nombre,x.apellido,x.cuil,x.sueldo);        
    }
 });

// -----------------------------------------
// LIMPIAR TABLA
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
function generarTabla() {
    let selectTipo = document.getElementById('select');
    let cuerpoTabla = document.querySelector("#cuerpoTabla");
    if(!cuerpoTabla.childElementCount>=0){
        arrPersona.forEach(persona => {
            if(selectTipo.value == "clientes" && persona instanceof Cliente){
                cargarFilas(persona);
            }
            else{
                if(selectTipo.value == "empleados" && persona instanceof Empleado){
                    cargarFilas(persona);
                }
                else{
                    if(selectTipo.value=="todos"){
                        cargarFilas(persona);
                    }
                }
            }
        });
    }
}

function cargarFilas(persona){
    let cuerpoTabla = document.querySelector("#cuerpoTabla");
    let datos = [persona.Id,persona.Apellido,persona.Nombre,persona.Edad,persona.Sexo,persona.Cuil,persona.Sueldo];
    let tr = document.createElement("tr");
    tr.addEventListener('dblclick', cargarCampos); 

    for(let i=0;i<datos.length;i++){
        let td = document.createElement("td");
        td.id = datos[i];
        td.textContent = datos[i];
        tr.appendChild(td);
    }
    cuerpoTabla.appendChild(tr);
}

// -----------------------------------------
// CONFIGURACION INICIAL
// -----------------------------------------
let body = document.getElementById('body');
body.addEventListener('load', configInit());

function configInit(){
    document.getElementById('form').style.display = "none";
    document.getElementById('cId').checked = true;
    document.getElementById('cApellido').checked = true;
    document.getElementById('cNombre').checked = true;
    document.getElementById('cEdad').checked = true;
    document.getElementById('cSexo').checked = true;
    document.getElementById('cCuil').checked = true;
    document.getElementById('cSueldo').checked = true;
    document.getElementById("fId").readOnly = true;
    generarTabla();
}

// -----------------------------------------
// CHEACK
// OCULTAR COLUMNAS
// -----------------------------------------
let cId = document.getElementById('cId');
let cApellido = document.getElementById('cApellido');
let cNombre = document.getElementById('cNombre');
let cEdad = document.getElementById('cEdad');
let cSexo = document.getElementById('cSexo');
let cCuil = document.getElementById('cCuil');
let cSueldo = document.getElementById('cSueldo');
let arrayCheck = [cId,cApellido,cNombre,cEdad,cSexo,cCuil,cSueldo];

for(let i=0;i<arrayCheck.length;i++){
    arrayCheck[i].textContent = i;
    arrayCheck[i].addEventListener('click', ocultar);
}

function ocultar(e){
    let btn = e.currentTarget;
    let indice = btn.textContent;
    let tbody = document.querySelector("#cuerpoTabla");
    let arrayTh = ['thId','thApellido','thNombre','thEdad','thSexo','thCuil','thSueldo'];
    let arrayCheck = ['cId','cApellido','cNombre','cEdad','cSexo','cCuil','cSueldo'];
    let tr = tbody.childNodes;

    for(let i=0; i<tbody.childNodes.length-1; i++){
        let td = tr.item(i+1).childNodes.item(indice);
        
        if(!document.getElementById(arrayCheck[indice]).checked){
            td.style.display = "none";
            document.getElementById(arrayTh[indice]).style.display = "none";
            document.getElementById(arrayCheck[indice]).checked = false;
        }
        else{
            td.style.display = "";
            document.getElementById(arrayTh[indice]).style.display = "";
            document.getElementById(arrayCheck[indice]).checked = true;
        }
    }
}

// -----------------------------------------
// BOTONES
// ORDENAMIENTO
// -----------------------------------------
let orderId = document.getElementById('oId');
let orderApellido = document.getElementById('oApellido');
let orderNombre = document.getElementById('oNombre');
let orderEdad = document.getElementById('oEdad');
let orderSexo = document.getElementById('oSexo');
let orderCuil = document.getElementById('oCuil');
let orderSueldo = document.getElementById('oSueldo');
let arrayOrder = [orderId,orderApellido,orderNombre,orderEdad,orderSexo,orderCuil,orderSueldo];

for(let i=0;i<arrayOrder.length;i++){
    arrayOrder[i].textContent = i;
    arrayOrder[i].addEventListener('click', function(){
        arrPersona.sort( (a, b) => {
            let paramA = [a.Id,a.Apellido,a.Nombre,a.Edad,a.Sexo,a.Cuil,a.Sueldo];
            let paramB = [b.Id,b.Apellido,b.Nombre,b.Edad,b.Sexo,b.Cuil,b.Sueldo];
            if(paramA[i]){
                if (paramA[i] > paramB[i]) {
                    return 1;
                } 
                else if (paramA[i] == paramB[i]) { 
                    return 0;
                } 
                else {
                    return -1;
                }
            }
        });
        limpiarTabla();
        generarTabla();
    });
}

// -----------------------------------------
// FILTRADOS
// -----------------------------------------
function filtradoTabla(obj) {
    let cuerpoTabla = document.getElementById("cuerpoTabla");
    if(!cuerpoTabla.childElementCount>0){
        if(obj == "clientes"){
            let clientes = arrPersona.filter(x => '_edad' in x);
            clientes.forEach(persona => {
                cargarFilas(persona);
            });
            return clientes;
        }
        else{
            let empleados = arrPersona.filter(x => '_cuil' in x);
            empleados.forEach(persona => {
                cargarFilas(persona);
            });
            return empleados;
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
// PROMEDIO IDs
// -----------------------------------------
let calculadora = document.getElementById('calcular');
calculadora.addEventListener('click', calcular);

function calcular() {
    let x = document.getElementById("select").value;
    let acumulador = 0;
    let promedio = 0;
    let clientes = [];
    let empleados = [];
    switch (x) {
        case "clientes":
            clientes = arrPersona.filter(x => '_edad' in x);
            clientes.forEach(persona => {
                acumulador += parseInt(persona.Id);
            });
            promedio = parseFloat(acumulador)/clientes.length;
            document.getElementById("promId").value = promedio;
            break;
    
        case "empleados":
            empleados = arrPersona.filter(x => '_cuil' in x);
            empleados.forEach(persona => {
                acumulador += parseFloat(persona.Id);
            });
            promedio = parseFloat(acumulador)/empleados.length;
            document.getElementById("promId").value = promedio;
            break;
    
        default:
            arrPersona.forEach(persona => {
                acumulador += parseFloat(persona.Id);
            });
            promedio = parseFloat(acumulador)/arrPersona.length;
            document.getElementById("promId").value = promedio;
            break;
    }
}

// -----------------------------------------
// TABLA
// INSERTAR PERSONA
// -----------------------------------------
let alta = document.getElementById('alta');
alta.addEventListener('click', agregarPersona);

function insertarNuevo() {
    let indice = arrPersona.length-1;
    let newPersona = arrPersona[indice];
    cargarFilas(newPersona);
}

// -----------------------------------------
// FORMULARIO
// ALTA PERSONA
// -----------------------------------------
let altas = document.getElementById('alta');
altas.addEventListener('click', agregarPersona);

function agregarPersona(){
    let id = Math.round(Math.random() * (0 + 10001));
    while(existeId(id)){
        id = Math.round(Math.random() * (0 + 10001));
    }
    let apellido = document.getElementById("fApellido").value;
    let nombre = document.getElementById("fNombre").value;

    if(document.getElementById("fId").value==""){
        if(id>0 && nombre!="" && apellido!=""){
            let newAlta;
            if(document.getElementById("fSelect").value == "cliente"){
                let edad = parseInt(document.getElementById("fInput1").value);
                let sexo = document.getElementById("fInput2").value;
                if(edad>0 && sexo!=""){  
                    newAlta = new Cliente(id,nombre,apellido,edad,sexo);
                    arrPersona.push(newAlta);
                }
            }
            else{
                let cuil = parseInt(document.getElementById("fInput1").value);
                let sueldo = parseInt(document.getElementById("fInput2").value);
                if(cuil>0 && sueldo>0){
                    newAlta = new Empleado(id,nombre,apellido,cuil,sueldo);
                    arrPersona.push(newAlta);
                }
            }
            insertarNuevo();
            console.log(newAlta.toString());
        }
        else{
            alert("Completar el formulario con datos correctos");
        }
        document.getElementById('form').style.display = "none";
        limpiarCampos();
    }
    else{
        alert("Registro ya existe");
    }
}

function existeId(id){
    let existe = false;
    arrPersona.forEach(newPersona => {
        if(newPersona.Id == id){
            existe = true;
        }
    });
    return existe;
}

// -----------------------------------------
// FORMULARIO
// ELIMINAR PERSONA
// -----------------------------------------
let eliminar = document.getElementById('eliminar');
eliminar.addEventListener('click', deleteRow);

function deleteRow(){
    let tbody = document.getElementById('cuerpoTabla');
    let tr = tbody.childNodes;
    let id = parseInt(document.getElementById("fId").value);
    for(let i=0; i<arrPersona.length;i++){
        if(id == arrPersona[i].Id){
            limpiarTabla();
            arrPersona.splice(i,1);
            generarTabla();
            break;
        }
    }
    document.getElementById('form').style.display = "none";
    limpiarCampos();
    limpiarTabla();
    generarTabla();
}

// -----------------------------------------
// FORMULARIO
// CARGAR CAMPOS
// -----------------------------------------
function cargarCampos(){
    var tr = event.target.parentNode;
    document.getElementById('form').style.display = "";
    document.getElementById("fId").value = tr.cells[0].innerHTML;
    document.getElementById("fApellido").value = tr.cells[1].innerHTML;
    document.getElementById("fNombre").value = tr.cells[2].innerHTML;

    if(tr.cells[3].innerHTML!="" && tr.cells[4].innerHTML!=""){
        document.getElementById("fSelect").value = 'cliente';
        document.getElementById("fInput1").value = tr.cells[3].innerHTML;
        document.getElementById("fInput2").value = tr.cells[4].innerText;
        document.getElementById("label1").innerHTML = 'Edad: ';
        document.getElementById("label2").innerHTML = 'Sexo: ';
    }
    else{
        document.getElementById("fSelect").value = 'empleado';
        document.getElementById("fInput1").value = tr.cells[5].innerHTML;
        document.getElementById("fInput2").value = tr.cells[6].innerText;
        document.getElementById("label1").innerHTML = 'Cuil: ';
        document.getElementById("label2").innerHTML = 'Sueldo: ';
    }
}

// -----------------------------------------
// SELECT FORMULARIO
// -----------------------------------------
let selector = document.getElementById('fSelect');
selector.addEventListener('change', selectForm);
function selectForm() {
    if(document.getElementById("fSelect").value == 'cliente'){
        document.getElementById("label1").innerHTML = 'Edad: ';
        document.getElementById("label2").innerHTML = 'Sexo: ';
    }
    else{
        document.getElementById("label1").innerHTML = 'Cuil: ';
        document.getElementById("label2").innerHTML = 'Sueldo: ';
    }
}

// -----------------------------------------
// FORMULARIO
// MODIFICAR PERSONA
// -----------------------------------------
let modificar = document.getElementById('modificar');
modificar.addEventListener('click', modificarCampo);

function modificarCampo(){
    let id = parseInt(document.getElementById("fId").value);
    let apellido = document.getElementById("fApellido").value;
    let nombre = document.getElementById("fNombre").value;

    for(let i=0;i<arrPersona.length;i++){
        if(id==arrPersona[i].Id){
            if(id>0 && nombre!="" && apellido!=""){
                if(document.getElementById("fSelect").value == "cliente"){
                    let edad = parseInt(document.getElementById("fInput1").value);
                    let sexo = document.getElementById("fInput2").value;
                    if(edad>0 && sexo!=""){
                        arrPersona.splice(i,1,new Cliente(id,nombre,apellido,edad,sexo));
                        break;
                    }
                }
                else{
                    let cuil = parseInt(document.getElementById("fInput1").value);
                    let sueldo = parseInt(document.getElementById("fInput2").value);
                    if(cuil>0 && sueldo>0){
                        arrPersona.splice(i,1,new Empleado(id,nombre,apellido,cuil,sueldo));
                        break;
                    }
                }
            }
            else{
                alert("Completar el formulario con datos correctos");
            }
        }
    }
    document.getElementById('form').style.display = "none";
    limpiarCampos();
    limpiarTabla();
    generarTabla();
}

// -----------------------------------------
// FORMULARIO
// LIMPIAR CAMPOS!
// -----------------------------------------
function limpiarCampos(){
    document.getElementById("fId").value = "";
    document.getElementById("fApellido").value = "";
    document.getElementById("fNombre").value = "";
    document.getElementById("fInput1").value = "";
    document.getElementById("fInput2").value = "";
}

// -----------------------------------------
// VISIBILIDAD FORM!
// -----------------------------------------
let agregar = document.getElementById('agregar');
agregar.addEventListener('click', visibilidad);

function visibilidad(){
    if(document.getElementById('form').style.display == ""){
        document.getElementById('form').style.display = "none";
    }
    else{
        document.getElementById('form').style.display = "";
    }
    limpiarCampos();
}

// -----------------------------------------
// FORMULARIO
// CANCELAR FORM!
// -----------------------------------------
let cancel = document.getElementById('cancelar');
cancel.addEventListener('click', cancelar);

function cancelar(){
    document.getElementById('form').style.display = "none";
    limpiarCampos();
}
