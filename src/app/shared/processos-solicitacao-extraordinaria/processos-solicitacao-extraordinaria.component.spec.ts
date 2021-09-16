import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessosSolicitacaoExtraordinariaComponent } from './processos-solicitacao-extraordinaria.component';

describe('ProcessosSolicitacaoExtraordinariaComponent', () => {
  let component: ProcessosSolicitacaoExtraordinariaComponent;
  let fixture: ComponentFixture<ProcessosSolicitacaoExtraordinariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessosSolicitacaoExtraordinariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessosSolicitacaoExtraordinariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
