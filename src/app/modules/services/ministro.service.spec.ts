import { TestBed } from '@angular/core/testing';

import { MinistroService } from './ministro.service';

describe('MinistroService', () => {
  let service: MinistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
