export class DetalleLista {
    descripcion: string;
    completado: boolean;

    public constructor( descripcion: string){
        this.descripcion = descripcion;
        this.completado = false;
    }
}