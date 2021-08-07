import { TestBed } from '@angular/core/testing';
import { FuseAlertService } from '@fuse/components/alert';

import { AlertaService } from './alerta.service';

describe('AlertaService', () => {
  let service: AlertaService;
  let fuseAlertService: FuseAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertaService);
    fuseAlertService = TestBed.inject(FuseAlertService);
  });

  it('should be created', () => {
    service = new AlertaService(fuseAlertService);
    expect(service).toBeTruthy();
  });
});
