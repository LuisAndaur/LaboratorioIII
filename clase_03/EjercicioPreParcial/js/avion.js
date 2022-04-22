class Avion extends Vehiculo{

    constructor(id, nombre, velMax, cantPue){
        super(id, nombre, velMax);
        this._cantTurb = cantTurb;
    }

    get cantTurb(){
        return this._cantTurb;
    }

    set cantTurb(value){
        this._cantTurb = value;
    }

}