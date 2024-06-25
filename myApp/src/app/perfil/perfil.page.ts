import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbserviceService } from '../dbservice.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  data: any; // variable que puede contener cualquier tipo de valor

  usuario: any = '';
  nCuenta: any = '';
  saldo: number = 0;
  nombre: any = '';
  apellido: any = '';
  opcion: any = '';
  fecha: any = '';
  idUsuario: any = '';

  constructor(
    private activerouter: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private dbService: DbserviceService
  ) {}

  ngOnInit() {
    // Inicialización de variables desde localStorage
    this.saldo = 0;
    this.usuario = localStorage.getItem('usuario');
    this.nCuenta = Number(localStorage.getItem('nCuenta')) || 0;
    this.saldo = Number(localStorage.getItem('saldo')) || 0;
    this.nombre = localStorage.getItem('nombre');
    this.apellido = localStorage.getItem('apellido');
    this.opcion = localStorage.getItem('opcion');
    this.fecha = localStorage.getItem('fecha');
    this.idUsuario = Number(localStorage.getItem('idUsuario')) || 0;
  }

  limpiar() {
    // Método para limpiar variables
    this.usuario = '';
    this.nCuenta = '';
    this.nombre = '';
    this.apellido = '';
    this.opcion = '';
    this.fecha = '';
    this.saldo = 0;
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    // Método para mostrar alertas
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  mostrarDatos() {
    // Método para mostrar los datos ingresados
    if (!this.nombre.trim() || !this.apellido.trim()) {
      this.mostrarAlerta("Error", "Por favor completa todos los campos");
    } else {
      const mensaje = `Nombre: ${this.nombre}\n Apellido: ${this.apellido}\n Opción: ${this.opcion}\n Fecha: ${this.fecha}\n N Cuenta: ${this.nCuenta}`;
      this.mostrarAlerta("Ingresados", mensaje);
    }
  }

  async enviarDatosAHome() {
    // Método para enviar datos actualizados a la página de inicio

    if (!this.nombre.trim() || !this.apellido.trim() ) {
      this.mostrarAlerta("Error", "Por favor completa todos los campos obligatorios");
    } else {
      try {
        const actualizar = await this.dbService.actualizarUsuario(this.idUsuario, this.usuario, this.nombre, this.apellido, this.opcion, this.fecha, this.nCuenta);
        if (actualizar == true) {
          this.mostrarAlerta('actualización!', 'El usuario fue actualizado exitosamente ');

            localStorage.setItem('usuario', this.usuario);
            localStorage.setItem('nCuenta', this.nCuenta.toString());
            localStorage.setItem('saldo', this.saldo.toString());
            localStorage.setItem('nombre', this.nombre);
            localStorage.setItem('apellido', this.apellido);
            localStorage.setItem('opcion', this.opcion);
            localStorage.setItem('fecha', this.fecha);
            localStorage.setItem('idUsuario', this.idUsuario.toString());
          
          this.router.navigate(['/menu/home']);
        }else{
          this.mostrarAlerta('Error', 'Error al actualizar datos usuario ' );
        }
      } catch (error: any) {
        this.mostrarAlerta('Error', 'Error al actualizar datos usuario ' + error.message);
      }
    }
  }
}
