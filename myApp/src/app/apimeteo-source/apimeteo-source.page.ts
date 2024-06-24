import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController, AlertController  } from '@ionic/angular';


@Component({
  selector: 'app-apimeteo-source',
  templateUrl: './apimeteo-source.page.html',
  styleUrls: ['./apimeteo-source.page.scss'],
})
export class APImeteoSourcePage implements OnInit {
  feriados: any[]=[];

  constructor(private http:HttpClient,private alertController: AlertController) { }

  ngOnInit() {
    this.fetchFeriados();
  }

  fetchFeriados() {
    this.http.get('https://api.boostr.cl/feriados/en.json').subscribe(
      (response: any) => {//es una variable de cualquier tipo la cual utilizaremos para traer "data":[] que contiene toda la informacion de la api
        this.feriados = response.data; //esto hacer que resiva la informacion directamente
        //luego en el html llamaremos a "let feriado of feriados" para llamar a datos como feriado.title
      },
      error => {
        this.mostrarAlerta('Error','');//arroja error en caso de no poder traer la informacion
      }
    );
  }



  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

}
