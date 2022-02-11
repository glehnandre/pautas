import { HttpClient } from '@angular/common/http';
import { getTestBed, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Pauta } from '../acervo/model/interfaces/pauta.interface';
import { SessaoDeJulgamentoService } from './sessao-de-julgamento.service';

class MockJulgamentoService {
  public pautarProcesso(pauta: any): Observable<void> {return null}
  public obterDadosDaPautaPeloProcesso(id: number): Observable<Pauta> {return null}
}

describe('JulgamentoService', () => {
  let service: SessaoDeJulgamentoService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    }).compileComponents().then(() => {
      httpClient = TestBed.inject(HttpClient);
      httpMock = TestBed.inject(HttpTestingController);
      service = TestBed.inject(SessaoDeJulgamentoService);
    });
  });

  it('should be created', () => {
    service = new SessaoDeJulgamentoService(httpClient);
    expect(service).toBeTruthy();
  });
});
