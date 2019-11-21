import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList, {static: false} ) lista: IonList;
  @Input() terminada = false;

  constructor( public deseosService: DeseosService, private router: Router, private alert: AlertController ) { }

  ngOnInit() {}

  seleccionarLista( lista: Lista ){
if( this.terminada ){
  this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
} else {
  this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
}

  }

  borrarLista( lista: Lista ){
    this.deseosService.borrarLista( lista );
  }

  async editarTitulo( lista: Lista ){
    const alert = await this.alert.create({
      header: 'Editar lista',
      inputs: [{
        name: 'titulo',
        type: 'text',
        value: lista.titulo,
        placeholder: 'Editar lista'
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Editar',
          handler: ( data ) => {
            if (data.titulo.length === 0 ){
              return;
            }
            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    await alert.present();
  }
}
