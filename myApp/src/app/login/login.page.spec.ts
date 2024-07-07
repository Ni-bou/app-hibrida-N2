import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from '../dbservice.service';
import { AlertController } from '@ionic/angular';
import { of } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let dbServiceSpy: jasmine.SpyObj<DbserviceService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(() => {
    dbServiceSpy = jasmine.createSpyObj('DbserviceService', ['validarUsuario', 'datosUsuario']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);

    TestBed.configureTestingModule({
      providers: [
        { provide: SQLite },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' })
          }
        },
        { provide: DbserviceService, useValue: dbServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AlertController, useValue: alertControllerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear un componente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia mostrar alerta de erros si esta vacio ', async () => {
    component.usuario = '';
    component.password = '';

    await component.ingresar();

    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'Por favor completa todos los campos',
      buttons: ['OK']
    });
  });

  it('deberia ir al home si cumple el login', async () => {
    component.usuario = 'testuser';//emula el nombre del usuario
    component.password = 'testpass';//emula una clave
    dbServiceSpy.validarUsuario.and.returnValue(Promise.resolve(1));//recordar que esto devuelve la primera columna de lo que encuentra
    dbServiceSpy.datosUsuario.and.returnValue(Promise.resolve({ rows: { length: 1, item: () => ({ nombre: 'test' }) } }));//devolvia el id del usuario

    await component.ingresar();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/menu/home']);
  });

  it('deberia arrojar error si no se encuentra al usuario', async () => {
    component.usuario = 'testuser';
    component.password = 'testpass';
    dbServiceSpy.validarUsuario.and.returnValue(Promise.resolve(null));//segun la base de datos deberia arrojar nulo

    await component.ingresar();

    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'Usuario o contraseña incorrectos',
      buttons: ['OK']
    });
  });

  it('deberia guardar la informacion del login en el localStorage', async () => {
    component.usuario = 'testuser';//volvemos a crear un usuario
    component.password = 'testpass';//volvemos a crear una clave
    dbServiceSpy.validarUsuario.and.returnValue(Promise.resolve(1)); //se valida el usuario
    dbServiceSpy.datosUsuario.and.returnValue(Promise.resolve({ rows: { length: 1, item: () => ({ nombre: 'test' }) } })); //se trae el id del usuario

    await component.ingresar();//esperamos la prosa en este caso seria el id
  
    expect(localStorage.getItem('usuario')).toBe('testuser');
    expect(localStorage.getItem('password')).toBe('testpass');
    expect(localStorage.getItem('idUsuario')).toBe('1');
  });
});
