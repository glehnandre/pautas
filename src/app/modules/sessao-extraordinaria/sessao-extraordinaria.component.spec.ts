import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EMPTY, Observable } from 'rxjs';
import { JulgamentoService } from 'app/modules/services/julgamento.service'; 

import { SessaoExtraordinariaComponent } from './sessao-extraordinaria.component';

class MockJulgamentoService {
  public listarSessoesDeJulgamento(): Observable<any> { return EMPTY };
  public listarTodasAsSessoesDeJulgamento(): Observable<any> { return EMPTY };
}

describe('SessaoExtraordinariaComponent', () => {
  let component: SessaoExtraordinariaComponent;
  let fixture: ComponentFixture<SessaoExtraordinariaComponent>;
  let julgamentoService: JulgamentoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessaoExtraordinariaComponent ],
      providers: [
        { provide: JulgamentoService, useClass: MockJulgamentoService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessaoExtraordinariaComponent);
    component = fixture.componentInstance;
    julgamentoService = TestBed.inject(JulgamentoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Não deve haver sessão do tipo extraordinária disponível', () => {
    component.sessoes = [];
    fixture.detectChanges();
    
    const isExtraordinaria = component.sessoes
      .some(sessao => sessao.tipo === 'Extraordinária');

    expect(isExtraordinaria).toEqual(false);
  });

  it('Deve encontrar a sessão de julgamento com numero e ano', () => {
    component.sessoes = [{
      numero: 1000,
      ano: 2021,
      categoria: '',
      colegiado: '',
      data_inicio: '',
      data_fim: '',
      modalidade: '',
      tipo: '',
      situacao: 'ABERTA',
    }];
    fixture.detectChanges();
    
    const isNumeroAno = component.sessoes
      .some(sessao => ((sessao.numero > 0) && (sessao.ano > 0)));

    expect(isNumeroAno).toEqual(true);
  });

  it('Não deve haver sessão de julgamento sem pauta (vazia)', () => {
    component.sessoes = [];
    fixture.detectChanges();
    
    const isPauta = (component.sessoes.length === 0);

    expect(isPauta).toEqual(true);
  });
});
