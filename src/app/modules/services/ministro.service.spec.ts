import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MinistroService } from './ministro.service';

describe('MinistroService', () => {
  let service: MinistroService;
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
      service = TestBed.inject(MinistroService);
    });
  });

  it('should be created', () => {
    service = new MinistroService(httpClient);
    expect(service).toBeTruthy();
  });
});
