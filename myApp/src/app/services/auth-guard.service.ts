import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //this.mostrarAlerta('AuthGuardService', 'Entro al metodo canActive');
    if (this.authService.isAuthenticated()) {
      //this.mostrarAlerta('AuthGuardService', 'entro al id canActive y va a retornar un true');
      return true;
    } else {
      this.router.navigate(['login']);
      //this.mostrarAlerta('AuthGuardService', 'entro al else canActive y va a retornar un false');
      return false;
    }
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