import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APImeteoSourcePage } from './apimeteo-source.page';

describe('APImeteoSourcePage', () => {
  let component: APImeteoSourcePage;
  let fixture: ComponentFixture<APImeteoSourcePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(APImeteoSourcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
