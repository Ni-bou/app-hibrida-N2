import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APImeteoSourcePage } from './apimeteo-source.page';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlertController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('APImeteoSourcePage', () => {
  let component: APImeteoSourcePage;
  let fixture: ComponentFixture<APImeteoSourcePage>;
  let httpMock: HttpTestingController;
  let alertController: AlertController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [APImeteoSourcePage],
      providers: [AlertController],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(APImeteoSourcePage);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    alertController = TestBed.inject(AlertController);

    spyOn(alertController, 'create').and.returnValue(Promise.resolve({
      present: () => Promise.resolve()
    } as any));

    spyOn(component, 'fetchFeriados').and.callThrough();

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('deberia recuperar feriados de la API', () => {
    const mockResponse = {
      data: [
        { title: 'Feriado 1' },
        { title: 'Feriado 2' }
      ]
    };


    expect(component.fetchFeriados).toHaveBeenCalled();

    const req = httpMock.expectOne('https://api.boostr.cl/feriados/en.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(component.feriados).toEqual(mockResponse.data);
  });

  
});
