import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MapPage } from './map.page';
import { Plugins } from '@capacitor/core';

describe('MapPage', () => {
  let component: MapPage;
  let fixture: ComponentFixture<MapPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  /*it('debería cargar el mapa correctamente', fakeAsync(() => {
    const mockGeolocation = {
      getCurrentPosition: jasmine.createSpy().and.returnValue(Promise.resolve({
        coords: {
          latitude: 40.712776,
          longitude: -74.005974
        }
      }))
    };


    spyOn(Plugins, ['Geolocation']).and.returnValue(mockGeolocation);

    component.loadMap();
    tick();

    expect(component.map).toBeDefined();
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
  }));*/
});
