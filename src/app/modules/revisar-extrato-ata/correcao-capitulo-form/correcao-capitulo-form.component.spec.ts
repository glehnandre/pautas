import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrecaoCapituloFormComponent } from './correcao-capitulo-form.component';

describe('CorrecaoCapituloFormComponent', () => {
  let component: CorrecaoCapituloFormComponent;
  let fixture: ComponentFixture<CorrecaoCapituloFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrecaoCapituloFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrecaoCapituloFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
