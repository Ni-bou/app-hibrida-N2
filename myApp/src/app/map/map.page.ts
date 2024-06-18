import { MapType } from '@angular/compiler';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Plugin, Plugins } from '@capacitor/core';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @ViewChild('mapContainer', {static: false }) mapContainer:ElementRef|undefined;

  map: any;
  constructor() { }

  ngOnInit() {
    this.loadMap();
  }

  async loadMap(){
    try{
      const {Geolocation}=Plugins;
      const coordinates = await Geolocation['getCurrentPosition']();
      const mapOption = {
        center: new google.maps.LatLng(coordinates.coords.latitude, coordinates.coords.longitude),
        zoom: 15,
        MapType: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapContainer?.nativeElement, mapOption);

      const marker = new google.maps.Marker({
        position: mapOption.center,
        map: this.map,
        title: 'Ubicación actual'
      });

    }catch(error:any){
      console.error('Error al cargar el mapa',error.message);
    }
  }

}
