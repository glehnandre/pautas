import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Vista } from 'app/modules/acervo/model/interfaces/vista.interface';
import { vistas } from './data';

@Injectable({
  providedIn: 'root'
})
export class VistaMockApi {
  private _vistas: Vista[] = vistas;

  constructor(private _fuseMockApiService: FuseMockApiService) {
    this.registerHandlers();
  }

  registerHandlers(): void { }
  
}
