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