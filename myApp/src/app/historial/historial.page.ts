import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  usuario: any='';
  password: any='';
  nCuenta:any='';
  saldo:any='';
  nombre:any='';
  apellido:any='';
  fecha:any='';
  opcion:any='';
  monto: any='';
 
  constructor( private router: Router) {
    this.usuario = localStorage.getItem('usuario');
    this.nCuenta= localStorage.getItem('nCuenta');
    this.saldo = Number(localStorage.getItem('nusaldomero'));
    this.nombre= localStorage.getItem('nombre');
    this.apellido= localStorage.getItem('apellido');
    this.opcion= localStorage.getItem('opcion');
    this.fecha= localStorage.getItem('fecha');
    
  }

  ngOnInit() {
    
  }
 

}
