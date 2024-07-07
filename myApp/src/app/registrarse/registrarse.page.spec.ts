import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegistrarsePage } from './registrarse.page';
import { FormsModule } from '@angular/forms';
import { DbserviceService } from '../dbservice.service';

describe('RegistrarsePage', () => {
  let componente: RegistrarsePage;
  let fixture: ComponentFixture<RegistrarsePage>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockDbService: jasmine.SpyObj<DbserviceService>;
  let mockAlertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockDbService = jasmine.createSpyObj('DbserviceService', [
      'insertarUsuario',
      'insertarCuentaUsuario',]);
    mockAlertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [RegistrarsePage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: DbserviceService, useValue: mockDbService },
        { provide: AlertController, useValue: mockAlertControllerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarsePage);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear un componente', () => {
    expect(componente).toBeTruthy();
  });

  it('deberia mostrar el alerta de error si esta vacio', async () => {
    componente.usuario = '';
    componente.password = '';
    componente.nombre = '';
    componente.apellido = '';
    componente.nCuenta = 0;

    await componente.registrarse();

    expect(mockAlertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'Por favor completa todos los campos',
      buttons: ['OK'],
    });
  });

  it('deberia insertar al usuario y navegar al inicio', async () => {
    componente.usuario = 'testuser';
    componente.password = 'testpass';
    componente.nombre = 'test';
    componente.apellido = 'undefined';
    componente.opcion = 'undefined';
    componente.fecha = 'undefined';
    componente.nCuenta = 1111;

    mockDbService.insertarUsuario.and.returnValue(Promise.resolve(1));
    mockDbService.insertarCuentaUsuario.and.returnValue(Promise.resolve({ rowsAffected: 1 }));

    await componente.registrarse();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/menu/home']);
  });

  it('deberia guardar la informacion en el localStorage', async () => {
    componente.usuario = 'testuser';
    componente.password = 'testpass';
    componente.nombre = 'test';
    componente.apellido = 'undefined';
    componente.opcion = 'undefined';
    componente.fecha = 'undefined';
    componente.nCuenta = 1111;
    componente.saldo = 0;

    const id = 1;
    mockDbService.insertarUsuario.and.returnValue(Promise.resolve(id));
    mockDbService.insertarCuentaUsuario.and.returnValue(Promise.resolve({ rowsAffected: 1 }));

    await componente.registrarse();

    expect(localStorage.getItem('usuario')).toBe('testuser');
    expect(localStorage.getItem('password')).toBe('testpass');
    expect(localStorage.getItem('id')).toBe('1');
    expect(localStorage.getItem('nCuenta')).toBe('1111');
    expect(localStorage.getItem('nombre')).toBe('test');
    expect(localStorage.getItem('apellido')).toBe('undefined');
    expect(localStorage.getItem('opcion')).toBe('undefined');
    expect(localStorage.getItem('fecha')).toBe('undefined');
    expect(localStorage.getItem('saldo')).toBe('0');

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/menu/home']);

  });
});
