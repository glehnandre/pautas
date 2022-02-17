import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormVistaEDestaqueComponent } from './form-vista-e-destaque.component';


describe('FormVistaEDestaqueComponent', () => {
  let component: FormVistaEDestaqueComponent;
  let fixture: ComponentFixture<FormVistaEDestaqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVistaEDestaqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVistaEDestaqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
