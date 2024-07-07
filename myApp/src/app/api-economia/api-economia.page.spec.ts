import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiEconomiaPage } from './api-economia.page';
import { HttpClientModule } from '@angular/common/http';

describe('ApiEconomiaPage', () => {
  let component: ApiEconomiaPage;
  let fixture: ComponentFixture<ApiEconomiaPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ApiEconomiaPage]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ApiEconomiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear un componente', () => {
    expect(component).toBeTruthy();
  });
});
