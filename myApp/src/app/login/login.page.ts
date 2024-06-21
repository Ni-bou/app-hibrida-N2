import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbserviceService } from '../dbservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

usuario: any='';
password: any='';
idUsuario: any='';
  constructor(private router: Router, private alertController: AlertController,private dbService: DbserviceService) { }//se debe instanciar

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    
  }

  async ingresar() {//esta en el boton ingresar
    // Verifica si alguno de los campos está vacío
    if (!this.usuario.trim() || !this.password.trim()) {
      this.mostrarAlerta("Error", "Por favor completa todos los campos");
      return; // Detiene la ejecución si hay algún campo vacío y manda un mensaje
    }else{

    // Si los campos NO están vacíos, procede con la navegación
  
    //verificar al usuario en la base de datos
      try {
        console.log('login 1 entrada a la funcion validarUsuario');
        const user_id = await this.dbService.validarUsuario(this.usuario, this.password);
        if (user_id) {
          
          //aquí  guardamos los valores en el localStorage de usuario y passwod
          this.idUsuario=user_id;
          localStorage.setItem('usuario',this.usuario);
          localStorage.setItem('password',this.password);
          localStorage.setItem('idUsuario', user_id.toString());
          this.mostrarAlerta('Éxito', 'Inicio de sesión exitoso'+user_id+this.idUsuario);
          //me falta traer los datos faltantes como nombre y apellido

          this.router.navigate(['/menu/home'],user_id); // nos manda al menu
        } else {
          this.mostrarAlerta('Error', 'Usuario o contraseña incorrectos');
        }
      } catch (error:any) {
        this.mostrarAlerta('Error', 'Error al iniciar sesión'+error.message);
        console.error(error);
      }
    }
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

  registrarse(){
    this.router.navigate(['/registrarse']);//nos redirige a registrarse
    console.log('voy a registrarme');
  }
}
