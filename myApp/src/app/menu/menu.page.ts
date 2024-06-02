import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  data: any;
  user = {
    usuario: "",
    password: ""
  };

  nombre: string = '';
  apellido: string = '';
  opcion: string = '';
  fecha: string = '';

  constructor(private activerouter: ActivatedRoute, private router: Router) {
    console.log("entra al menu");
    // Se llama a la ruta activa y se obtiene sus parámetros mediante una suscripción
    this.activerouter.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras && navigation.extras.state) {
        this.data = navigation.extras.state['user'];
        console.log("entro al if tomando al usuario");
      } else {
        // Navegar a login si no hay datos del usuario
        this.router.navigate(["/login"]);
      }
    });
  }

  ngOnInit() {
    // Verificar la ruta actual y navegar en consecuencia
    if (this.router.url.includes('/menu/home')) {
      this.navigateToHome();
    } else if (this.router.url.includes('/menu/perfil')) {
      this.navigateToPerfil();
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

  Salir(){
    console.log("Salir del programa");
    this.data = null;
    this.user = { usuario: "", password: "" };
    this.router.navigate(['/login']);
  }
}
