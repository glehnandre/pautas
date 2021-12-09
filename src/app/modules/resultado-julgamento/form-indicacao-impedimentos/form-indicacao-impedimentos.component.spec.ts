import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIndicacaoImpedimentosComponent } from './form-indicacao-impedimentos.component';

describe('FormIndicacaoImpedimentosComponent', () => {
  let component: FormIndicacaoImpedimentosComponent;
  let fixture: ComponentFixture<FormIndicacaoImpedimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormIndicacaoImpedimentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIndicacaoImpedimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
