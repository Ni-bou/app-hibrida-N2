import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, AlertController } from '@ionic/angular';
import { HomePage } from './home.page';
import { FormsModule } from '@angular/forms';
import { DbserviceService } from '../dbservice.service';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

describe('HomePage', () => {
  let componente: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockDbService: jasmine.SpyObj<DbserviceService>;
  let mockAlertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockDbService = jasmine.createSpyObj('DbserviceService', [
      'actualizarcuentaUsuario', 'getSalgo', 'datosUsuario'
    ]);
    mockAlertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), FormsModule,CommonModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: DbserviceService, useValue: mockDbService },
        { provide: AlertController, useValue: mockAlertControllerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } } 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('deberia traer los datos del localStorage', () => {
    interface LocalStorageData {
      [key: string]: string;
    }

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      const data: LocalStorageData = {
        'usuario': 'testuser',
        'password': 'testpass',
        'idUsuario': '1',
        'nCuenta': '1111',
        'nombre': 'test',
        'apellido': 'testapellido',
        'opcion': 'testopcion',
        'fecha': '2022-01-01',
        'saldo': '100'
      };
      return data[key] || null;
    });

    componente.usuario = localStorage.getItem('usuario');
    componente.password = localStorage.getItem('password');
    componente.idUsuario = Number(localStorage.getItem('idUsuario'));
    componente.nCuenta = Number(localStorage.getItem('nCuenta'));
    componente.nombre = localStorage.getItem('nombre');
    componente.apellido = localStorage.getItem('apellido');
    componente.opcion = localStorage.getItem('opcion');
    componente.fecha = localStorage.getItem('fecha');
    componente.saldo = Number(localStorage.getItem('saldo'));

    expect(componente.usuario).toBe('testuser');
    expect(componente.password).toBe('testpass');
    expect(componente.idUsuario).toBe(1);
    expect(componente.nCuenta).toBe(1111);
    expect(componente.nombre).toBe('test');
    expect(componente.apellido).toBe('testapellido');
    expect(componente.opcion).toBe('testopcion');
    expect(componente.fecha).toBe('2022-01-01');
    expect(componente.saldo).toBe(100);
  });

  it('debería actualizar el saldo del usuario', async () => {
    componente.nCuenta = 1234;
    componente.saldo = 200;
    mockDbService.actualizarcuentaUsuario.and.returnValue(Promise.resolve(true));
    
    await componente.actualizarCuentaSaldo(componente.nCuenta, componente.saldo);

    expect(mockDbService.actualizarcuentaUsuario).toHaveBeenCalledWith(1234, 200);
    
  });

  it('deberia mostrar una alerta si el monto a depositar es menor o igual a cero', async () => {
    componente.monto = 0;
    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    mockAlertControllerSpy.create.and.returnValue(Promise.resolve(alertSpy));

    await componente.depositarme();

    expect(mockAlertControllerSpy.create).toHaveBeenCalled();
    expect(alertSpy.present).toHaveBeenCalled();
  });

  it('deberia llamar a actualizarCuentaSaldo y navegar a /menu/home al depositar', async () => {
    componente.monto = 100;
    componente.saldo = 200;
    componente.nCuenta = 1234;
    mockDbService.actualizarcuentaUsuario.and.returnValue(Promise.resolve(true));

    await componente.depositarme();

    expect(componente.saldo).toBe(300);
    expect(mockDbService.actualizarcuentaUsuario).toHaveBeenCalledWith(1234, 300);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/menu/home']);
  });

  it('deberia traer el saldo del usuario', async () => {
    const saldoEsperado = 150;
    mockDbService.getSalgo.and.returnValue(Promise.resolve(saldoEsperado));
    componente.nCuenta = 1234;

    await componente.traerSaldo();

    expect(mockDbService.getSalgo).toHaveBeenCalledWith(1234);
    expect(componente.saldo).toBe(saldoEsperado);
  });

  it('deberia manejar el error al traer el saldo del usuario', async () => {
    const error = new Error('Error al traer el saldo');
    mockDbService.getSalgo.and.returnValue(Promise.reject(error));
    const alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    mockAlertControllerSpy.create.and.returnValue(Promise.resolve(alertSpy));

    await componente.traerSaldo();

    expect(mockDbService.getSalgo).toHaveBeenCalled();
    expect(mockAlertControllerSpy.create).toHaveBeenCalled();
    expect(alertSpy.present).toHaveBeenCalled();
  });

});
