import { TestBed } from '@angular/core/testing';
import { ResultadoJulgamentoService } from './resultado-julgamento.service';


describe('DecisaoService', () => {
  let service: ResultadoJulgamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultadoJulgamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
