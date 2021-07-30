import { TestBed } from '@angular/core/testing';

import { JulgamentoService } from './julgamento.service';

describe('JulgamentoService', () => {
  let service: JulgamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JulgamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
