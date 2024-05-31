import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  data: any; //esta es una variable "any" es que permite cualquier valor
  /**
   * En el constructor del HomePage se colocan por parametros
   * todas aquellas propiedades con el siguiente formato
   * private =  visibilidad
   * activeRoute = identificador
   * ActiveRoute = Tipo de objeto
   * : Indica que el identificador sera de la clase posterior a los :
   */
  nombre: string='';
  apellido: string='';
  opcion: string='';
  fecha:string='';

  constructor(private activerouter: ActivatedRoute, private router: Router) {

    //se llama a la ruta activa y se obtiene sus parametrosd mediante una subscripcion
    this.activerouter.queryParams.subscribe(params => { //utilizamos lambda
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras && navigation.extras.state) {
        this.data = navigation.extras.state['user'];
      }else{this.router.navigate(["/login"])}//si no tiene extra la navegacion actual navegar al login
    })
  }

  limpiar(){
    this.nombre='';
    this.apellido='';
    this.opcion='';
    this.fecha='';
  }
}
