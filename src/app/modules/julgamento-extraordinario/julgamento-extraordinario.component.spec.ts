import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { JulgamentoService } from '../services/julgamento.service';

import { JulgamentoExtraordinarioComponent } from './julgamento-extraordinario.component';

class MockJulgamentoService {
  public listarSessoesDeJulgamento(): Observable<any> { return EMPTY };
  public listarTodasAsSessoesDeJulgamento(): Observable<any> { return EMPTY };
}

describe('JulgamentoExtraordinarioComponent', () => {
  let component: JulgamentoExtraordinarioComponent;
  let fixture: ComponentFixture<JulgamentoExtraordinarioComponent>;
  let julgamentoService: JulgamentoService;
  let fb: FormBuilder;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JulgamentoExtraordinarioComponent ],
      providers: [
        { provide: JulgamentoService, useClass: MockJulgamentoService },
        { provide: FormBuilder, useClass: FormBuilder },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JulgamentoExtraordinarioComponent);
    component = fixture.componentInstance;
    julgamentoService = TestBed.inject(JulgamentoService);
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

  it(`Deve fazer a validação de sessão escolhida (Ciente e pautar na sessão - 
    Esta opção só pode estar ativa se foi escolhida uma sessão 
    de julgamento.)`, () => {
    component.formJulgamento.setValue({
      nova_data: '',
      sessao: '',
    });
    fixture.detectChanges();
    
    const isValid = component.formJulgamento.valid;

    expect(isValid).toEqual(false);
  });
});
