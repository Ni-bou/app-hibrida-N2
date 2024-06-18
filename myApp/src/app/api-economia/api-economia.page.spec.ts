import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiEconomiaPage } from './api-economia.page';

describe('ApiEconomiaPage', () => {
  let component: ApiEconomiaPage;
  let fixture: ComponentFixture<ApiEconomiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiEconomiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
