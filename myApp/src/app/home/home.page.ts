import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ModalController, AlertController  } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { DbserviceService } from '../dbservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //data: any;
 
  message = 'This modal example ';
  name = "";
  monto: number = 0;
  
  usuario: any = '';
  password: any = '';
  nCuenta: any = '';
  saldo: number = 0;
  nombre: any = '';
  apellido: any = '';
  fecha: any = '';
  opcion: any = '';
  id: any= '';


  constructor( private activerouter: ActivatedRoute,private router: Router,  private modalController: ModalController,private dbService: DbserviceService,private alertController: AlertController) {
    // Asignamos valores
    this.usuario = localStorage.getItem('usuario');
    this.password = localStorage.getItem('password');
    this.nCuenta = localStorage.getItem('nombre');
    this.nombre = localStorage.getItem('nombre');
    this.apellido = localStorage.getItem('apellido');
    this.opcion = localStorage.getItem('opcion');
    this.fecha = localStorage.getItem('fecha');
    this.id = localStorage.getItem('id');
  }

  ngOnInit() {
    
    if (!this.usuario || !this.password) { 
      this.router.navigate(["/login"]);
    } else {
      this.saldo = Number(localStorage.getItem('saldo')) || 0; // para convertir a número
      
      console.log("Datos recibidos en el home desde perfil:", 
        this.usuario, this.nCuenta, this.saldo, this.nombre, this.apellido, this.opcion, this.fecha);
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalController.dismiss(this.monto, 'confirm');
  }

  onWillDismissDepositarme(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<number>>;
    if (ev.detail.role === 'confirm') {
     this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  onWillDismissDepositar(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<number>>;
    if (ev.detail.role === 'confirm') {
     this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  openModalDepositarme() {
    //Verificar si el monto es un número válido
    this.depositarme();
    console.log("se metido al metodo depositar");
}

  depositarme() {
    if (this.monto <= 0) {
      console.log("Monto inválido");
      return;
    } else {
      this.saldo += this.monto;
      console.log("va a enviar el nuevo saldo");
      console.log(this.saldo);
      this.modalController.dismiss(this.monto, 'confirm');
      this.actualizarLocalStorage();
      console.log("Datos actualizados:", this.usuario, this.nCuenta, this.saldo, this.nombre, this.apellido, this.opcion, this.fecha, this.monto);
      this.router.navigate(['/menu/home']);
    }
  }
  actualizarLocalStorage() {
    localStorage.setItem('usuario', this.usuario);
    localStorage.setItem('password', this.password);
    localStorage.setItem('nCuenta', this.nCuenta);
    localStorage.setItem('saldo', this.saldo.toString());
    localStorage.setItem('nombre', this.nombre);
    localStorage.setItem('apellido', this.apellido);
    localStorage.setItem('opcion', this.opcion);
    localStorage.setItem('fecha', this.fecha);
    localStorage.setItem('monto', this.monto.toString());
  }

  openModalDepositar() {
   
  }
  mandarDatosHistorial() {
   
  }

  
}
