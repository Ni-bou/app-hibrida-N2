import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegistrarsePage } from './registrarse.page';
import { FormsModule } from '@angular/forms';
import { DbserviceService } from '../dbservice.service';

describe('RegistrarsePage', () => {
    //varaibles de angular para manejar datos para ser usados en ngFor o ngIf entre otros
    let component: RegistrarsePage;
    let fixture: ComponentFixture<RegistrarsePage>;
    let mockRouter: jasmine.SpyObj<Router>;//espia de jasmin para Router
    let mockDbService: jasmine.SpyObj<DbserviceService>; //espia de jasmin para base de datos
    let mockAlertController: jasmine.SpyObj<AlertController>;//espia de jasmin para alertController


    beforeEach(async () => {
      mockRouter = jasmine.createSpyObj('Router', ['navigate']);
      mockDbService = jasmine.createSpyObj('DbserviceService', ['insertarUsuario', 'insertarCuentaUsuario']);
      mockAlertController = jasmine.createSpyObj('AlertController', ['create']);
  
      await TestBed.configureTestingModule({
        declarations: [ RegistrarsePage ],
        imports: [IonicModule.forRoot(), FormsModule],
        providers: [
          { provide: Router, useValue: mockRouter },
          { provide: DbserviceService, useValue: mockDbService },
          { provide: AlertController, useValue: mockAlertController }
        ]
      }).compileComponents();
  
      fixture = TestBed.createComponent(RegistrarsePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('deberia crear un componente', () => {
      expect(component).toBeTruthy();
    });
  });