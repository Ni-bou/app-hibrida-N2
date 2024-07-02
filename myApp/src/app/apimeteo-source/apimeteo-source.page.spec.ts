import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APImeteoSourcePage } from './apimeteo-source.page';
import { HttpClientModule } from '@angular/common/http';

describe('APImeteoSourcePage', () => {
  let component: APImeteoSourcePage;
  let fixture: ComponentFixture<APImeteoSourcePage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [APImeteoSourcePage]
    })
    .compileComponents();
    fixture = TestBed.createComponent(APImeteoSourcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
