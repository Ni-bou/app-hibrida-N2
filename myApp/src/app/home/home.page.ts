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
  cuenta: number = 0;
  
  usuario: any = '';
  password: any = '';
  nCuenta: any = '';
  saldo: number;
  nombre: any = '';
  apellido: any = '';
  fecha: any = '';
  opcion: any = '';
  idUsuario: any='';


  constructor( private activerouter: ActivatedRoute,private router: Router,  private modalController: ModalController,private dbService: DbserviceService,private alertController: AlertController) {
    // Asignamos valores
    
    this.usuario = localStorage.getItem('usuario');
    this.password = localStorage.getItem('password');
    this.nCuenta = localStorage.getItem('nCuenta');
    this.nombre = localStorage.getItem('nombre');
    this.apellido = localStorage.getItem('apellido');
    this.opcion = localStorage.getItem('opcion');
    this.fecha = localStorage.getItem('fecha');
    
    this.idUsuario =Number(localStorage.getItem('idUsuario')) ;
    this.traerSaldo();
    this.saldo = Number(localStorage.getItem('saldo'))||0; // para convertir a número
    
    
    }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
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

    console.log("se metido al metodo depositar");
}



  depositarme() {
    if (this.monto <= 0) {
      this.mostrarAlerta('Error','El monto debe ser mayor a cero');
      return;
    } else {
      this.saldo += this.monto;
      this.modalController.dismiss(this.monto, 'confirm');
      this.actualizarCuentaSaldo(this.nCuenta,this.saldo);
      this.router.navigate(['/menu/home']);
    }
  }
  async actualizarCuentaSaldo(nCuenta: number, saldo:number) {
    try {
      const Actu_cuentaUsuario = await this.dbService.actualizarcuentaUsuario(nCuenta, saldo);
      
      if (Actu_cuentaUsuario.rows && Actu_cuentaUsuario.rows.length > 0) {
        for (let i = 0; i < Actu_cuentaUsuario.rows.length; i++) {
          const user = Actu_cuentaUsuario.rows.item(i);
          localStorage.setItem('nCuenta', user.nCuenta);
          localStorage.setItem('saldo', user.saldo);
          
          this.mostrarAlerta('for', 'numero cuenta: ' +user.nCuenta+'n/saldo actual: '+user.saldo );
        }
      }
    } catch (error: any) {
      this.mostrarAlerta('Error', 'Error al actualizar saldo de la cuenta usuario ' + error.message);
    }
  }

  async traerSaldo(){
    try{
      const saldoGet = await this.dbService.getSalgo(this.nCuenta);
      if(saldoGet){
        this.saldo= saldoGet;
        localStorage.setItem('saldo', this.saldo.toString());
      }

    }catch (error: any) {
      this.mostrarAlerta('Error', 'Error al traer cuenta usuario ' + error.message);
    }
  }

  async depositaATercero() {

   if(this.monto <= 0 && this.cuenta <=0){//que los datos sean ingresados en las casillas
    this.mostrarAlerta('Error','Debe ingresar una cuenta y monto valido monto:');
    return null;

   }else{
    //comprobar que el monto a transferir sea menor o igual que el saldo
    if(this.monto <= this.saldo){

      //this.mostrarAlerta('comprovar',' monto: '+this.monto+' cuenta: '+this.cuenta+' this.nCuenta: '+this.nCuenta+' saldo: '+this.saldo)
      try{
      const comprobar = await this.dbService.getSalgo(this.cuenta);//trae el saldo de la cuenta si encuentra la cuenta encuentra
      if(!comprobar){
        this.mostrarAlerta('Error',' no se encontro la cuenta al buscarla'+ comprobar)
        return null;
      }else{
        //trae el saldo y suma el monto, luego se llama al metodo cuentaUsuario que actualiza el saldo
        let saldoActual = parseFloat(comprobar);
        saldoActual += this.monto;
        this.saldo -= this.monto;
        const usuarioResive = await this.dbService.actualizarcuentaUsuario(this.cuenta,saldoActual);
        if(usuarioResive){
          this.mostrarAlerta('Exito!',' Deposito realizado exitosamente');
          this.router.navigate(['/menu/home']);
        }else{
          this.mostrarAlerta('Error',' no se encontro la cuenta'+ usuarioResive)
        }
        return true;
      }
      }catch(error: any) {
          this.mostrarAlerta('Error', 'Error al traer cuenta usuario para depositar terceros ' + error.message);
          return null;
      }
    
    }else{
      this.mostrarAlerta('Error', 'El monto es mayor a tu saldo');
      return null;
    }
   }
   return false;
  }

  mandarDatosHistorial() {
   
  }

  
}
