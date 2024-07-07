import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from '../dbservice.service';
import { FormsModule } from '@angular/forms';

describe('PerfilPage', () => {
  let componente: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;
  let mockRouter: Router;
  let mockDbService: jasmine.SpyObj<DbserviceService>;
  let mockAlertControllerSpy: AlertController;

  beforeEach(async () => {
    const dbSpy = jasmine.createSpyObj('DbserviceService', ['actualizarUsuario']);
    const alertSpy = jasmine.createSpyObj('AlertController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [ PerfilPage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        FormsModule
      ],
      providers: [
        { provide: DbserviceService, useValue: dbSpy },
        { provide: AlertController, useValue: alertSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    componente = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    mockDbService = TestBed.inject(DbserviceService) as jasmine.SpyObj<DbserviceService>;
    mockAlertControllerSpy = TestBed.inject(AlertController);

    fixture.detectChanges();
  });

  it('deberia crear un componente', () => {
    expect(componente).toBeTruthy();
  });

  it('deberia traer los datos del storage', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      switch (key) {
        case 'usuario': return 'testuser';
        case 'nCuenta': return '1111';
        case 'saldo': return '0';
        case 'nombre': return 'test';
        case 'apellido': return 'undefined';
        case 'opcion': return 'undefined';
        case 'fecha': return 'undefined';
        case 'idUsuario': return '1';
        default: return null;
      }
    });

    componente.ngOnInit();

    expect(componente.usuario).toBe('testuser');
    expect(componente.nCuenta).toBe(1111);
    expect(componente.saldo).toBe(0);
    expect(componente.nombre).toBe('test');
    expect(componente.apellido).toBe('undefined');
    expect(componente.opcion).toBe('undefined');
    expect(componente.fecha).toBe('undefined');
    expect(componente.idUsuario).toBe(1);
  });

  it('deberia limpiar datos del metodo limpiar()', () => {
    componente.usuario = 'testuser';
    componente.nCuenta = 1111;
    componente.saldo = 0;
    componente.nombre = 'test';
    componente.apellido = 'undefined';
    componente.opcion = 'undefined';
    componente.fecha = 'undefined';

    componente.limpiar();

    expect(componente.usuario).toBe('');
    expect(componente.nCuenta).toBe('');
    expect(componente.saldo).toBe(0);
    expect(componente.nombre).toBe('');
    expect(componente.apellido).toBe('');
    expect(componente.opcion).toBe('');
    expect(componente.fecha).toBe('');
  });


  it('deberia mostrar los datos al apretar el boton mostrar del metodo mostrarDatos() ', async () => {
    spyOn(componente, 'mostrarAlerta');

    componente.nombre = 'test';
    componente.apellido = 'undefined';
    componente.opcion = 'undefined';
    componente.fecha = 'undefined';
    componente.nCuenta = 1111;

    await componente.mostrarDatos();
    
    expect(componente.mostrarAlerta).toHaveBeenCalledWith('Ingresados', 'Nombre: test\n Apellido: undefined\n Opción: undefined\n Fecha: undefined\n N Cuenta: 1111');
  });

  it('deberia actualizar los datos y guardar datos en el localStorage enviarDatosAHome() success', async () => {
    spyOn(componente, 'mostrarAlerta');
    spyOn(mockRouter, 'navigate');
    const actualizarSpy = mockDbService.actualizarUsuario.and.returnValue(Promise.resolve(true));

    componente.idUsuario = 1;
    componente.usuario = 'testuser';
    componente.nCuenta = 1111;
    componente.saldo = 0;
    componente.nombre = 'test';
    componente.apellido = 'undefined';
    componente.opcion = 'undefined';
    componente.fecha = 'undefined';

    await componente.enviarDatosAHome();

    expect(actualizarSpy).toHaveBeenCalledWith(1, 'testuser', 'test', 'undefined', 'undefined', 'undefined', 1111);
    expect(localStorage.getItem('usuario')).toBe('testuser');
    expect(localStorage.getItem('nCuenta')).toBe('1111');
    expect(localStorage.getItem('saldo')).toBe('0');
    expect(localStorage.getItem('nombre')).toBe('test');
    expect(localStorage.getItem('apellido')).toBe('undefined');
    expect(localStorage.getItem('opcion')).toBe('undefined');
    expect(localStorage.getItem('fecha')).toBe('undefined');
    expect(localStorage.getItem('idUsuario')).toBe('1');

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/menu/home']);
   
  });

  it('deberia mostrar error al no poder enviarDatosAHome()', async () => {
    spyOn(componente, 'mostrarAlerta');
    spyOn(mockRouter, 'navigate');
    const actualizarSpy = mockDbService.actualizarUsuario.and.returnValue(Promise.resolve(false));

    componente.nombre = 'test';
    componente.apellido = 'undefined';

    await componente.enviarDatosAHome();

    expect(actualizarSpy).toHaveBeenCalled();
    expect(componente.mostrarAlerta).toHaveBeenCalledWith('Error', 'Error al actualizar datos usuario ');
  });

});
