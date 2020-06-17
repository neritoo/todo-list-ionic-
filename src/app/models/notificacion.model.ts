export class Notificacion {
    id: number;
    at: any;

    public constructor(at: any){
        this.id = this.calcularId();
        this.at = at;
    }

    calcularId(): number{
        return Math.floor(Math.random() * ((100+1) - 1) + 1);
    }

}