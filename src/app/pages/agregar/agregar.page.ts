import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { DetalleLista } from 'src/app/models/lista-item.model';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import roundToNearestMinutes from 'date-fns/roundToNearestMinutes'
import { Notificacion } from 'src/app/models/notificacion.model';

declare let cordova: any; 

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  lista: Lista;
  nombreItem: string = '';
  
  constructor( private deseosService: DeseosService,
    private route: ActivatedRoute,
    private notificacion: LocalNotifications ) {

    const listaId = this.route.snapshot.paramMap.get('listaId');
    this.lista = this.deseosService.obtenerLista(listaId);
  }

  ngOnInit() {

  }


  enviarNotificacion(item: DetalleLista){
    cordova.plugins.notification.local.schedule({
      id: item.notificacion.id,
      title: "Lista de deseos",
      text: item.descripcion,
      at: roundToNearestMinutes(Date.parse(item.notificacion.at))
      });
    
  }

  agregarNotificacion(item: DetalleLista){
    let notificacion = new Notificacion(item.fechaHoraNotificacion);
    item.notificacion = notificacion;
  }

  agregarItem(){
    if (this.nombreItem.length === 0 ){
      return;
    }

    const nuevoItem = new DetalleLista( this.nombreItem );
    this.lista.items.push(nuevoItem);

    this.nombreItem = '';
    this.deseosService.guardarStorage();
  }

  cambioCheck( item: DetalleLista ){
    const pendientes = this.lista.items.filter( itemData => !itemData.completado).length;
    if ( pendientes === 0 ){
      this.lista.terminada = true;
      this.lista.fechaTerminada = new Date();
    } else {
      this.lista.terminada = false;
      this.lista.fechaCreacion = null;
    }
    this.deseosService.guardarStorage();
  }

  borrar ( i: number ){
    this.lista.items.splice(i, 1);
    this.deseosService.guardarStorage();
  }

}
