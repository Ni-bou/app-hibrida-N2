import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController, AlertController  } from '@ionic/angular';

@Component({
  selector: 'app-api-economia',
  templateUrl: './api-economia.page.html',
  styleUrls: ['./api-economia.page.scss'],
})
export class ApiEconomiaPage implements OnInit {

  //variable de tipo arreglo
  economisData: any[] = [];

  constructor(private http:HttpClient,private alertController: AlertController) { }

  ngOnInit() {
  this.fetchEconomisData();

  }

  fetchEconomisData(){
    //realiza una solicitud http GET a la URL : 
    this.http.get('https://mindicador.cl/api').subscribe((response: any)=>{
    //cuando la solicitud se cumpla por completo
    //this.mostrarAlerta('API','este trae la api: '+ response);

    this.economisData= this.transformData(response);
  
  });
  }
  //este método recorre con un for todos los datos que trae el response
  transformData(data: any): any []{
    const result = [];
 
    for(const key in data){
      if (data.hasOwnProperty(key)&& typeof data[key]==='object'){
        result.push(data[key]);
      }
    }
    return result;
  }

  
}
