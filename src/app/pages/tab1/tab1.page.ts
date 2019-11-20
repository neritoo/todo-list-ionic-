import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor( public deseosServices: DeseosService, private router: Router, private alert: AlertController ) {}

  async agregarLista(){
    const alert = await this.alert.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {console.log('Cancelar')}
        },
        {
          text: 'Crear',
          handler: ( data ) => {
            if (data.titulo.length === 0 ){
              return;
            }
            const listaId = this.deseosServices.crearLista(data.titulo);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
          }
        }
      ]
    });

    await alert.present();
  }

  seleccionarLista( lista: Lista ){
    const id = lista.id;
    this.router.navigateByUrl(`/tabs/tab1/agregar/${id}`);
  }

  borrar( i: number ){
    this.deseosServices.listas.splice(i, 1);
    this.deseosServices.guardarStorage();
  }
}
