import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
user={
  usuario: "",
  password:""
}
  constructor(private router: Router, private alertController: AlertController) { }//se debe instanciar

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    
  }

  ingresar() {
    // Verifica si alguno de los campos está vacío
    if (!this.user.usuario.trim() || !this.user.password.trim()) {
      this.mostrarAlerta("Error", "Por favor completa todos los campos");
      return; // Detiene la ejecución si hay algún campo vacío
    }

    // Si los campos no están vacíos, procede con la navegación
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['/perfil'], navigationExtras);
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}
