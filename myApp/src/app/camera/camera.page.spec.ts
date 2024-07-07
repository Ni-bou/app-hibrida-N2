import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CameraPage } from './camera.page';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';

describe('CameraPage', () => {
  let component: CameraPage;
  let fixture: ComponentFixture<CameraPage>;
  let sanitizer: DomSanitizer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CameraPage],
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustResourceUrl: jasmine.createSpy('bypassSecurityTrustResourceUrl').and.callFake((url: string) => url as SafeResourceUrl)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CameraPage);
    component = fixture.componentInstance;
    sanitizer = TestBed.inject(DomSanitizer);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  /*it('debería tomar una foto y sanitizar la URL', fakeAsync(async () => {
    const mockPhoto: Photo = {
      webPath: 'fake-image-path',
      format: 'jpeg',
      saved: false,
      base64String: 'undefined',
      exif: null,
      path: 'undefined'
    };

    spyOn(Camera, 'getPhoto').and.returnValue(Promise.resolve(mockPhoto));

    await component.takePicture();
    tick();

    expect(Camera.getPhoto).toHaveBeenCalledWith({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith('fake-image-path');
    expect(component.photo).toBe('fake-image-path' as SafeResourceUrl);
  }));*/
});
