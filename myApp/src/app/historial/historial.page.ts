import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  userData: any;
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
  historial={
    
  }

  constructor(private activerouter: ActivatedRoute, private router: Router,private sharedService: SharedService) {
    console.log("entro al historial");
    //se llama a la ruta activa y se obtiene sus parametrosd mediante una subscripcion
    this.activerouter.queryParams.subscribe(params => { //utilizamos lambda
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras &&  navigation.extras.state) {
        this.data = navigation.extras.state['user'];
        console.log("tiene un usuario en el historial",this.data);
        
      }else{this.router.navigate(["/login"])}//si no tiene extra la navegacion actual navegar al login
      console.log("salio del HISTORIAL");
    })
    
  }


  ngOnInit() {
    this.userData = this.sharedService.getUserData();
    if (this.userData) {
      console.log('User Data:', this.userData);
      this.sharedService.setUserData(this.data);
      this.enviarDatosHome()
    }
  }
 

  Salir(){
    console.log("Salir del programa");
    this.data = null;
    this.userData = null;
    this.user = { usuario: "",nCuenta:0,
    saldo:0,
    nombre:"",
    apellido:"",
    fecha:"",
    monto:0}
    this.router.navigate(['/login']);
  }
  enviarDatosHome(){
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
          
        }
      }
  };
  this.sharedService.setUserData(this.data);
  }

}
