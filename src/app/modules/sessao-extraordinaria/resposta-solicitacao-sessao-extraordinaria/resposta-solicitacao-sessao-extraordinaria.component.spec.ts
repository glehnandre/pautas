import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { SessaoDeJulgamentoService } from '../../services/sessao-de-julgamento.service';

import { RespostaSolicitacaoSessaoExtraordinariaoComponent } from './resposta-solicitacao-sessao-extraordinaria.component';

class MockJulgamentoService {
  public obterSessaoDeJulgamento(): Observable<any> { return EMPTY };
  public listarTodasAsSessoesDeJulgamento(): Observable<any> { return EMPTY };
}

describe('RespostaSolicitacaoSessaoExtraordinariaCOmponent', () => {
  let component: RespostaSolicitacaoSessaoExtraordinariaoComponent;
  let fixture: ComponentFixture<RespostaSolicitacaoSessaoExtraordinariaoComponent>;
  let _sessaoDeJulgamentoService: SessaoDeJulgamentoService;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespostaSolicitacaoSessaoExtraordinariaoComponent ],
      providers: [
        { provide: SessaoDeJulgamentoService, useClass: MockJulgamentoService },
        { provide: FormBuilder, useClass: FormBuilder },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespostaSolicitacaoSessaoExtraordinariaoComponent);
    component = fixture.componentInstance;
    _sessaoDeJulgamentoService = TestBed.inject(SessaoDeJulgamentoService);
    fb = TestBed.inject(FormBuilder);
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
      id: 12,
      numero: 1000,
      ano: 2021,
      categoria: '',
      colegiado: '',
      data_inicio: '',
      data_fim: '',
      modalidade: '',
      tipo: '',
      situacao: 'ABERTA',
      ata:null,
      processos: []
    }];
    fixture.detectChanges();

    const isNumeroAno = component.sessoes
      .some(sessao => ((sessao.numero > 0) && (sessao.ano > 0)));

    expect(isNumeroAno).toEqual(true);
  });

});
