import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {

  //son variable de cualquier tipo
  usuario: any='';
  password: any='';
  nombre: any='';
  apellido: any='';
  opcion: any='';
  fecha: any='';
 

  constructor(private activerouter: ActivatedRoute, private router: Router) {
    
    //recuperamos los valores asignados en login y los asignamos
    this.usuario = localStorage.getItem('usuario');
    this.password = localStorage.getItem('password');
    this.nombre = localStorage.getItem('nombre');
    this.apellido = localStorage.getItem('apellido');
    this.opcion = localStorage.getItem('opcion');
    this.fecha = localStorage.getItem('fecha');

    console.log("entra al menu aqui trae el valor de usuario y password", this.usuario,this.password,"trajo");//comprovamos el uso de los datos

  }

  ngOnInit() {
    // Verificar la ruta actual y navegar en consecuencia
    if (this.router.url.includes('/menu/home')) {
      this.navigateToHome();
    } else if (this.router.url.includes('/menu/perfil')) {
      this.navigateToPerfil();
    } else if (this.router.url.includes('/menu/historial')) {
      this.navigateToHistorial();
    } else if (this.router.url.includes('/menu/map')) {
      this.navigateToMap();
    } else if (this.router.url.includes('/menu/camera')) {
      this.navigateToCamera;
    } else if (this.router.url.includes('/menu/api-economia')) {
      this.navigateToApiEconomia();
    }  else {
      this.router.navigate(['/menu/home']); // Navegar a /menu/home si no coincide con ninguna ruta específica
    }
  }

  //redirecciona según el nombre de la visual a la que queramos ir
  navigateToHome() {
    
    this.router.navigate(['/menu/home']);
    console.log("envia datos a la visual home");
  }

  navigateToPerfil() {
    console.log("entro a navigateToPerfil()");
  
    this.router.navigate(['/menu/perfil']);
    
    console.log("envia datos a la visual perfil");
  }

  navigateToHistorial() {
    
    this.router.navigate(['/menu/historial']);
    console.log("envia datos a la visual historial");
  }

  navigateToMap() {
    
    this.router.navigate(['/menu/map']);
    console.log("envia datos a la visual historial");
  }

  navigateToApiEconomia() {
    
    this.router.navigate(['/menu/api-economia']);
    console.log("envia datos a la visual historial");
  }

  navigateToCamera() {
    
    this.router.navigate(['/menu/camera']);
    console.log("envia datos a la visual historial");
  }


  //llama a la funcion removerItems para reutilizar codigo
  Salir(){
    console.log("Salir del programa");
    this.removerItems();
    this.router.navigate(['/login']);

  }
  //elima cada uno de los items
  removerItems(){
    localStorage.removeItem('usuario');
    localStorage.removeItem('password');
    localStorage.removeItem('saldo');
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellido');
    localStorage.removeItem('fecha');
    localStorage.removeItem('opcion');
    localStorage.removeItem('nCuenta');
    localStorage.removeItem('monto');
   
  }
}
