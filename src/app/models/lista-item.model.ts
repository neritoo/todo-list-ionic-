import { Notificacion } from './notificacion.model';

export class DetalleLista {
    descripcion: string;
    completado: boolean;
    fechaHoraNotificacion: any;
    notificacion: Notificacion;

    public constructor( descripcion: string){
        this.descripcion = descripcion;
        this.completado = false;
        //this.fechaHoraNotificacion = new Date().toString();
    }
}