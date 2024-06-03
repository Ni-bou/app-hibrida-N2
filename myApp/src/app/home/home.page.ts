import { Component } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';
import { ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  message = 'This modal example ';
  name = "";
  monto=0;


  data: any; //esta es una variable "any" es que permite cualquier valor
  user={
    usuario: "",
    nCuenta:0,
    saldo:0,
    nombre:"",
    apellido:"",
    fecha:"",
  }

  constructor(private activerouter: ActivatedRoute, private router: Router,  private modalController: ModalController) {
    console.log("entra al home");
    //se llama a la ruta activa y se obtiene sus parametrosd mediante una subscripcion
    this.activerouter.queryParams.subscribe(params => { //utilizamos lambda
      const navigation = this.router.getCurrentNavigation();
      console.log("obtiene la navegacion"+ navigation);
      if (navigation && navigation.extras &&  navigation.extras.state) {
        this.data = navigation.extras.state['user'];
        console.log("tiene un usuario en el home");
      }else{this.router.navigate(["/login"])}//si no tiene extra la navegacion actual navegar al login
      console.log("salio del home");
    })
    
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
    // Verificar si el monto es un número válido
    this.depositarme();
    console.log("se metido al metodo depositar");
}

  depositarme(){
    if ( this.monto <= 0) {
      console.log("Monto inválido");
      return;
    }else{
      this.data.saldo += this.monto ;
      console.log("va a enviar el nuevo saldo");
      console.log(this.data.saldo);
      this.modalController.dismiss(this.monto, 'confirm');
      let navigationExtras: NavigationExtras = {
        state: {
          user: {
            usuario: this.data.usuario,
            nCuenta: this.data.nCuenta,
            saldo: this.data.saldo,
            nombre: this.data.nombre,
            apellido: this.data.apellido,
            opcion: this.data.opcion,
            fecha: this.data.fecha
          
          }
        }
    };
    this.router.navigate(['/menu/home',], navigationExtras);
    this.monto=0;
    this.router.navigate(['/menu/historial'], navigationExtras);
    }
  }

  openModalDepositar() {
   
  }

  
}
