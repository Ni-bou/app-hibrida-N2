import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController, AlertController  } from '@ionic/angular';
import { AstTransformer } from '@angular/compiler';

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
    this.http.get<any[]>('https://apis.digital.gob.cl/fl/feriados').subscribe(
      (response: any[]) => {
        this.feriados = response;
      },
      (error) => {
        this.presentErrorAlert();
        console.error('Error fetching feriados', error);
      }
    );
  }
  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Hubo un problema al obtener los feriados.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
