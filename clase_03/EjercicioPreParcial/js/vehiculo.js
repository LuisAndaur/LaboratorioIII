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