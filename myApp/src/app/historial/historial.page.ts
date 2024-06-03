import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  
  data: any; //esta es una variable "any" es que permite cualquier valor


  user={
    usuario: "",
    nCuenta:0,
    saldo:0,
    nombre:"",
    apellido:"",
    fecha:"",
  }
  historial: any;

  constructor(private activerouter: ActivatedRoute, private router: Router) {
    console.log("entra al home");
    //se llama a la ruta activa y se obtiene sus parametrosd mediante una subscripcion
    this.activerouter.queryParams.subscribe(params => { //utilizamos lambda
      const navigation = this.router.getCurrentNavigation();
      console.log("obtiene la navegacion"+ navigation);
      if (navigation && navigation.extras &&  navigation.extras.state) {
        this.data = navigation.extras.state['historial'];
        console.log("tiene un usuario en el home");
      }else{this.router.navigate(["/login"])}//si no tiene extra la navegacion actual navegar al login
      console.log("salio del home");
    })
    
  }


  ngOnInit() {
    // Verificar la ruta actual y navegar en consecuencia
    if (this.router.url.includes('/menu/home')) {
      this.navigateToHome();
    } else if (this.router.url.includes('/menu/perfil')) {
      this.navigateToPerfil();
    } else if (this.router.url.includes('/menu/historial')) {
      this.navigateToHistorial();
    }
  }

  navigateToHome() {
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.data
      }
    };
    this.router.navigate(['/menu/home'], navigationExtras);
    console.log("envia datos a la visual home");
  }

  navigateToPerfil() {
    console.log("entro a navigateToPerfil()");
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.data
      }
    };
    this.router.navigate(['/menu/perfil'], navigationExtras);
    console.log("envia datos a la visual perfil");
  }

  navigateToHistorial() {
    console.log("entro a navigateToPerfil()");
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.data
      }
    };
    this.router.navigate(['/menu/historial'], navigationExtras);
    console.log("envia datos a la visual historial");
  }

  Salir(){
    console.log("Salir del programa");
    this.data = null;
    this.user = { usuario: "",nCuenta:0,
    saldo:0,
    nombre:"",
    apellido:"",
    fecha:""}
    this.router.navigate(['/login']);
  }

}
