import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoPainelExpansivoComponent } from './processo-painel-expansivo.component';

describe('ProcessoPainelExpansivoComponent', () => {
  let component: ProcessoPainelExpansivoComponent;
  let fixture: ComponentFixture<ProcessoPainelExpansivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessoPainelExpansivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessoPainelExpansivoComponent);
    component = fixture.componentInstance;
    component.processo = {
      id: 0,
      classe: '',
      ementa: '',
      nome: '',
      numero: 0,
      situacao: 0,
      tipo: 0,
      lista: [],
      capitulos: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
