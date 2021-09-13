import { TestBed } from '@angular/core/testing';

import { DecisaoService } from './decisao.service';

describe('DecisaoService', () => {
  let service: DecisaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecisaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
