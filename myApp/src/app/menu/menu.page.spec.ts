import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuPage } from './menu.page';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from '../dbservice.service';
import { AlertController } from '@ionic/angular';
import { of } from 'rxjs';

describe('MenuPage', () => {
  let componente: MenuPage;
  let fixture: ComponentFixture<MenuPage>;
  let mockRouter: jasmine.SpyObj<Router>;


  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: '123' }) } },
        { provide: Router, useValue: mockRouter }
      ],
      declarations: [MenuPage]
    });
    fixture = TestBed.createComponent(MenuPage);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear un componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería ir a home', () => {
    componente.navigateToHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/menu/home']);
  });

  it('debería ir a perfil', () => {
    componente.navigateToPerfil();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/menu/perfil']);
  });

  it('debería ir a historial', () => {
    componente.navigateToHistorial();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/menu/historial']);
  });

  it('debería ir a map', () => {
    componente.navigateToMap();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/menu/map']);
  });

  it('debería ir a api-economía', () => {
    componente.navigateToApiEconomia();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/menu/api-economia']);
  });

  it('debería ir a cámara', () => {
    componente.navigateToCamera();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/menu/camera']);
  });

  it('debería ir a feriados', () => {
    componente.navigateToFeriados();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/menu/apimeteo-source']);
  });
  

  it('limpia el local storage con el metodo removerItems()', () => {
    localStorage.setItem('usuario', 'testUser');
    localStorage.setItem('password', 'testPassword');
    localStorage.setItem('nombre', 'Test');
    localStorage.setItem('apellido', 'User');
    localStorage.setItem('fecha', '2024-07-06');
    localStorage.setItem('opcion', 'opcion');
    localStorage.setItem('nCuenta', '1111');
    localStorage.setItem('monto', '100');

    componente.removerItems();

    expect(localStorage.getItem('usuario')).toBeNull();
    expect(localStorage.getItem('password')).toBeNull();
    expect(localStorage.getItem('nombre')).toBeNull();
    expect(localStorage.getItem('apellido')).toBeNull();
    expect(localStorage.getItem('fecha')).toBeNull();
    expect(localStorage.getItem('opcion')).toBeNull();
    expect(localStorage.getItem('nCuenta')).toBeNull();
    expect(localStorage.getItem('monto')).toBeNull();
  });

});
