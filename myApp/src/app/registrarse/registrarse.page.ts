import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbserviceService } from '../dbservice.service'; 

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {
  usuario: string = '';
  password: string = '';
  nCuenta:string = '';
  saldo: number = 0;
  nombre:string = '';
  apellido:string = '';
  opcion:string = '';
  fecha:string = '';
  id: number = 0;



  constructor(private activerouter: ActivatedRoute, private router: Router,private alertController: AlertController,private dbService: DbserviceService) {
  }
  
  ngOnInit() {

  }
  
  
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }


  async registrarse(){
        // Verifica si alguno de los campos está vacío
        if (!this.usuario.trim() || !this.password.trim()||!this.nombre.trim() || !this.apellido.trim()) {
          this.mostrarAlerta("Error", "Por favor completa todos los campos");
          return; // Detiene la ejecución si hay algún campo vacío y manda un mensaje
        }else{
    
          // Si los campos NO están vacíos, procede con la navegación
          //ME FALTA! verificar que el usuario que quieran crear no exista
          
          //ingrersar datos a la base de datos: 
          try {
            const success = await this.dbService.insertarUsuario(this.usuario, this.password, this.nombre, this.apellido, this.opcion, this.fecha, this.nCuenta);

            if (success) {
              this.id = success;
              this.mostrarAlerta('Éxito', 'Usuario registrado correctamente'+success);
              //aquí  guardamos los valores en el localStorage de usuario y passwod
          
              localStorage.setItem('usuario',this.usuario);
              localStorage.setItem('password',this.password);
              localStorage.setItem('nCuenta', this.nCuenta);
              localStorage.setItem('nombre', this.nombre);
              localStorage.setItem('apellido', this.apellido);
              localStorage.setItem('opcion', this.opcion);
              localStorage.setItem('fecha', this.fecha);
              localStorage.setItem('id',this.id.toString());//para guardar el id del usuario

              this.router.navigate(['/menu/home']); // Redirige a la página del menú si la inserción fue exitosa
            } else {
              this.mostrarAlerta('Error', 'Hubo un error al registrar el usuario');
              console.log('Hubo un error al registrar el usuario.');
            }
          } catch (error: any) {
            this.mostrarAlerta('Error', 'Error al registrar el usuario');
            console.error('Error al registrar el usuario:', error.message);
          }
          
        }
  }
 
}

