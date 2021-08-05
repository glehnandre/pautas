import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { ProcessoService } from 'app/modules/services/processo.service';
import { EMPTY, Observable } from 'rxjs';

import { StatusComponent } from './status.component';

class MockProcessoService {
  public obterStatusDoProcesso(): Observable<any> {
    return EMPTY;
  }
}

describe('StatusComponent', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;
  let processoService: ProcessoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatTooltipModule,
        MatChipsModule,
      ],
      declarations: [StatusComponent],
      providers: [
        { provide: ProcessoService, useClass: MockProcessoService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
    processoService = TestBed.inject(ProcessoService);

    component.situacaoProcesso = {
      situacao: { id: 1, nome: '' },
      complemento: '',
      descricao: '',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Não  deve recuperar o status', () => {
    component.situacaoProcesso = {
      situacao: { id: 1, nome: '' },
      complemento: '',
      descricao: '',
    };

    fixture.detectChanges();
    const status = fixture.debugElement.queryAll(By.css('#status-processo'));
    expect(status[0].nativeElement.textContent.trim()).toEqual('');
  });

  it('Deve recuperar apenas o status', () => {
    component.situacaoProcesso = {
      situacao: { id: 1, nome: 'Apto a Pautar' },
      complemento: '',
      descricao: '',
    };

    fixture.detectChanges();

    const status = fixture.debugElement.queryAll(By.css('#status-processo'));
    const descricao = component.situacaoProcesso.descricao;
    const complemento = component.situacaoProcesso.complemento;

    expect(status[0].nativeElement.textContent.trim()).toEqual('Apto a Pautar');
    expect(descricao.trim()).toEqual('');
    expect(complemento.trim()).toEqual('');
  });

  it('Deve recuperar o status e complemento', () => {
    component.situacaoProcesso = {
      situacao: { id: 1, nome: 'Apto a Pautar' },
      complemento: 'para MMA',
      descricao: '',
    };

    fixture.detectChanges();

    const descricao = component.situacaoProcesso.descricao;
    const complemento = component.situacaoProcesso.complemento;
    const status = fixture.debugElement.query(By.css('#status-processo'));

    expect(status.nativeElement.textContent.trim()).toEqual('Apto a Pautar');
    expect(complemento.trim()).toEqual('para MMA');
    expect(descricao.trim()).toEqual('');
  });

  it('Deve recuperar o status, complemento e descrição', () => {
    component.situacaoProcesso = {
      situacao: { id: 1, nome: 'Apto a Pautar' },
      complemento: 'para MMA',
      descricao: 'Vista para o Ministro Marco Aurélio no dia 24/04/2020',
    };

    fixture.detectChanges();

    const complemento = component.situacaoProcesso.complemento;
    const descricao = component.situacaoProcesso.descricao;
    const status = fixture.debugElement.query(By.css('#status-processo'));

    expect(status.nativeElement.textContent.trim()).toEqual('Apto a Pautar');
    expect(complemento.trim()).toEqual('para MMA');
    expect(descricao.trim()).toEqual('Vista para o Ministro Marco Aurélio no dia 24/04/2020');
  });

  it('Deve recuperar o status e descrição', () => {
    component.situacaoProcesso = {
      situacao: { id: 1, nome: 'Apto a Pautar' },
      complemento: '',
      descricao: 'Vista para o Ministro Marco Aurélio no dia 24/04/2020',
    };

    fixture.detectChanges();

    const complemento = component.situacaoProcesso.complemento;
    const descricao = component.situacaoProcesso.descricao;
    const status = fixture.debugElement.query(By.css('#status-processo'));

    expect(status.nativeElement.textContent.trim()).toEqual('Apto a Pautar');
    expect(complemento.trim()).toEqual('');
    expect(descricao.trim()).toEqual('Vista para o Ministro Marco Aurélio no dia 24/04/2020');
  });

});
