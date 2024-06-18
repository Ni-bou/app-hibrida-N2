import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbserviceService } from '../dbservice.service';


@Component({ 
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  data: any; //esta es una variable "any" es que permite cualquier valor

  usuario: any='';
  password: any='';
  nCuenta:any='';
  saldo: number = 0;
  nombre:any='';
  apellido:any='';
  opcion:any='';
  fecha:any='';
  id:any='';

  constructor(private activerouter: ActivatedRoute, private router: Router,private alertController: AlertController,private dbService: DbserviceService) {
  }
  
  ngOnInit() {
    this.saldo = 0;
    this.activerouter.queryParams.subscribe(params => {
      this.usuario = localStorage.getItem('usuario');
      this.password = localStorage.getItem('password');
      this.nCuenta = Number(localStorage.getItem('nCuenta')) || 0;
      this.saldo = Number(localStorage.getItem('saldo')) || 0;
      this.nombre = localStorage.getItem('nombre');
      this.apellido = localStorage.getItem('apellido');
      this.opcion = localStorage.getItem('opcion');
      this.fecha = localStorage.getItem('fecha');
      this.id = Number(localStorage.getItem('id')) || 0;

    if (!this.usuario || !this.password) { 
        this.router.navigate(['/login']);
      } else {
       
      }
    });
  }
  
  
  limpiar(){
    this.usuario='';
    this.nCuenta= '';
    this.nombre='';
    this.apellido='';
    this.opcion='';
    this.fecha='';
    this.saldo=0;
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  mostrarDatos() {
    if (!this.nombre.trim() || !this.apellido.trim()|| this.nCuenta <= 0 || isNaN(this.nCuenta)) {
      this.mostrarAlerta("Error", "Por favor completa todos los campos");
    } else {
      const mensaje = `Nombre: ${this.nombre}\n Apellido: ${this.apellido}\n Opción: ${this.opcion}\n Fecha: ${this.fecha}\n N Cuenta: ${this.nCuenta}`;
      this.mostrarAlerta("Ingresados", mensaje);
    }

  }

  async enviarDatosAHome() { 
    
    if (!this.nombre.trim() || !this.apellido.trim() ||this.nCuenta <= 0 ) {
      this.mostrarAlerta("Error", "Por favor completa todos los campos obligatorios");
    } else {
      try{
      const actualizar = await this.dbService.actualizarUsuario(this.id,this.usuario, this.password, this.nombre, this.apellido, this.opcion, this.fecha, this.nCuenta);
      if (actualizar == true){
      this.mostrarAlerta('actualización!', 'El usuario fue actualizado exitosamente '+ actualizar);
      localStorage.setItem('usuario', this.usuario);
      localStorage.setItem('password', this.password);
      localStorage.setItem('nCuenta', this.nCuenta.toString());
      localStorage.setItem('saldo', this.saldo.toString());
      localStorage.setItem('nombre', this.nombre);
      localStorage.setItem('apellido', this.apellido);
      localStorage.setItem('opcion', this.opcion);
      localStorage.setItem('fecha', this.fecha);
      localStorage.setItem('id', this.id.toString());

    
      this.router.navigate(['/menu/home']);
      }else{

      }
    }catch (error: any) {
      this.mostrarAlerta('Error', 'Error al actualizar datos usuario '+ error.message);
    }
  }
  }

}
