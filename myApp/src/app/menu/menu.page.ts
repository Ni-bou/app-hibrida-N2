import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
 

  constructor(private activerouter: ActivatedRoute, private router: Router, private alertController:AlertController) {
    
    //recuperamos los valores asignados en login y los asignamos
    this.usuario = localStorage.getItem('usuario');
    this.password = localStorage.getItem('password');
    this.nombre = localStorage.getItem('nombre');
    this.apellido = localStorage.getItem('apellido');
    this.opcion = localStorage.getItem('opcion');
    this.fecha = localStorage.getItem('fecha');

    console.log("entra al menu aqui trae el valor de usuario y password", this.usuario,this.password,"trajo");//comprovamos el uso de los datos

  }

  

  //redirecciona según el nombre de la visual a la que queramos ir
  navigateToHome() {
    
    this.router.navigate(['/menu/home']);
    console.log("envia datos a la visual home");
    this.mostrarAlerta("viajando", "Viaja informacion de menu al home");
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

    //esta es la ventana del mensaje en caso de error.
    async mostrarAlerta(titulo: string, mensaje: string) {
      const alert = await this.alertController.create({
        header: titulo,
        message: mensaje,
        buttons: ['OK']
      });
    
      await alert.present();
    }
}
