import { TestBed } from '@angular/core/testing';

import { RevisarInteiroTeorService } from './revisar-inteiro-teor.service';

describe('RevisarInteiroTeorService', () => {
  let service: RevisarInteiroTeorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevisarInteiroTeorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
