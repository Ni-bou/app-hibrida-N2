import { Component } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data: any; //esta es una variable "any" es que permite cualquier valor
  user={
    usuario: "",
    nombre:"",
    apellido:"",
    fecha:""
  }

  constructor(private activerouter: ActivatedRoute, private router: Router) {
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

}
