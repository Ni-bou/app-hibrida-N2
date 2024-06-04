import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras} from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({ 
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  data: any; //esta es una variable "any" es que permite cualquier valor

  usuario: string='';
  nCuenta: number= 0;
  saldo: number= 0;
  nombre: string='';
  apellido: string='';
  opcion: string='';
  fecha:string='';


  constructor(private activerouter: ActivatedRoute, private router: Router,private alertController: AlertController) {

    //se llama a la ruta activa y se obtiene sus parametrosd mediante una subscripcion
    this.activerouter.queryParams.subscribe(params => { //utilizamos lambda
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras && navigation.extras.state) {
        this.data = navigation.extras.state['user'];
        let navigationExtras: NavigationExtras = {
          state: {
            user:this.data
          }
        };

      }else{this.router.navigate(["/login"])}//si no tiene extra la navegacion actual navegar al login
    })
  }
  ngOnInit() {
  }
  
  limpiar(){
    this.usuario='';
    this.nCuenta= 0;
    this.saldo=100;
    this.nombre='';
    this.apellido='';
    this.opcion='';
    this.fecha='';
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  mostrarDatos() {
    if (!this.nombre.trim() || !this.apellido.trim()|| this.nCuenta <= 0 || isNaN(this.nCuenta)) {
      this.mostrarAlerta("Error", "Por favor completa todos los campos");
    } else {
      const mensaje = `Nombre: ${this.nombre}\n Apellido: ${this.apellido}\n Opción: ${this.opcion}\n Fecha: ${this.fecha}\n N Cuenta: ${this.nCuenta}`;
      this.mostrarAlerta("Ingresados", mensaje);
    }
  }

  enviarDatosAHome() {
    if (!this.nombre.trim() || !this.apellido.trim() ||this.nCuenta <= 0 || isNaN(this.nCuenta)) {
      this.mostrarAlerta("Error", "Por favor completa todos los campos obligatorios");
    } else {
      let navigationExtras: NavigationExtras = {
        state: {
          user: {
            usuario: this.data.usuario,
            nCuenta: this.nCuenta,
            saldo: this.saldo,
            nombre: this.nombre,
            apellido: this.apellido,
            opcion: this.opcion,
            fecha: this.fecha,

          }
        }
      };
      this.router.navigate(['/menu/home'], navigationExtras);
    }
  }

}
