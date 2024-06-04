import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { SharedService } from '../shared.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { Component, ElementRef, ViewChild } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard, IonCardContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  

  animation!: Animation;
  userData: any;
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
    monto:0,
  }


  constructor(private activerouter: ActivatedRoute, private router: Router,  private modalController: ModalController,private sharedService: SharedService,private animationCtrl: AnimationController) {
    console.log("entra al home");
    //se llama a la ruta activa y se obtiene sus parametrosd mediante una subscripcion
    this.data = this.sharedService.getUserData();
        console.log("tiene un usuario en el home"+this.data);
    this.activerouter.queryParams.subscribe(params => { //utilizamos lambda
      const navigation = this.router.getCurrentNavigation();
      console.log("obtiene la navegacion"+ this.data);
      if (navigation && navigation.extras &&  navigation.extras.state) {
        this.data = navigation.extras.state['user'];
        console.log("tiene un usuario en el home");
        this.mandarDatosHistorial();
      }else{this.router.navigate(["/login"])}//si no tiene extra la navegacion actual navegar al login
      console.log("salio del home");
    })
    
  }

  ngOnInit() {
    this.data = this.sharedService.getUserData();
    if (this.data) {
      console.log('User Data en home:', this.data);
      this.sharedService.setUserData(this.data);
    }
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
            fecha: this.data.fecha,
            monto: this.monto,
          
          }
        }
    };
    this.sharedService.setUserData(this.data);
    console.log("this.monto",this.monto);
    this.router.navigate(['/menu/home',], navigationExtras);
    }
    this.monto=0;
  }

  openModalDepositar() {
   
  }
  mandarDatosHistorial() {
    this.sharedService.setUserData(this.data);
  }

  //animacion:
 /*
  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(3000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, width: '80px' },
        { offset: 0.72, width: 'var(--width)' },
        { offset: 1, width: '240px' },
      ]);
      this.animation.play();
  }*/
  
}
