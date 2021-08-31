import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';
import { MinistroService } from '../services/ministro.service';
import { ProcessoService } from '../services/processo.service';

import { CriacaoColegiadoComponent } from './criacao-colegiado.component';

class MockMinistroService {
  listarMinistros(): Observable<any> {return EMPTY}
  listarColegiados(): Observable<any> {return EMPTY}
}

class MockProcessoService {
  listarProcessos(): Observable<any> {return EMPTY}
  obterDocumentosDoProcesso(): Observable<any> {return EMPTY}
}

const MockActivatedRoute = {
  snapshot: {
    queryParams: {
      colegiado: 'pleno',
      processo: 'ADI100-Ag-Ag-Ag',
      sessao: '1000-2021'
    }
  }
}

describe('CriacaoColegiadoComponent', () => {
  let component: CriacaoColegiadoComponent;
  let fixture: ComponentFixture<CriacaoColegiadoComponent>;
  let fb: FormBuilder;
  let route: ActivatedRoute;
  let ministroService: MinistroService;
  let processoService: ProcessoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriacaoColegiadoComponent ],
      providers: [
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: MinistroService, useClass: MockMinistroService },
        { provide: ProcessoService, useClass: MockProcessoService },
        { provide: ActivatedRoute, useValue:  MockActivatedRoute},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriacaoColegiadoComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    ministroService = TestBed.inject(MinistroService);
    processoService = TestBed.inject(ProcessoService);
    route = TestBed.inject(ActivatedRoute);

    component.composicao = [];
    component.documentos = [];
    component.alerta = {titulo: '', mensagem: ''};
    component.colegiados = [];
    component.ministros = [];
    component.queryParams = { colegiado: 'pleno', data: '', processo: 'ADI100', sessao: '1000-2021' }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve testar o numero minimo de votos', () => {
    component.votosDosMinistros = [];
    fixture.detectChanges();
    expect(component.votosDosMinistros.length).toBeLessThan(5);
  });

  it('Deve testar se há um relator', () => {
    component.votosDosMinistros = [{
      incluir_voto: false,
      ja_votou: false,
      ministro: null,
      pode_votar: false,
      relator: true,
    }];
    fixture.detectChanges();
    expect(component.votosDosMinistros[0].relator).toBeTrue();
  });

  it('Deve testar o comportamento do colegiado para o processo: ADI200 e colegiado: primeira-turma', () => {
    component.queryParams = {
      colegiado: 'primeira-turma',
      processo: 'ADI200',
      sessao: '2000-2021',
      data: '',
    };

    MockActivatedRoute.snapshot.queryParams = component.queryParams;

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Deve testar o comportamento do colegiado para o processo: ADI100-Ag-Ag-Ag e colegiado: pleno', () => {
    component.queryParams = {
      colegiado: 'pleno',
      processo: 'ADI100-Ag-Ag-Ag',
      sessao: '2000-2021',
      data: '',
    };

    MockActivatedRoute.snapshot.queryParams = component.queryParams;

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
