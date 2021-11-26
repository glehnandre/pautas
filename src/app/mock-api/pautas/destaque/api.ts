import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Destaque } from 'app/modules/acervo/model/interfaces/destaque.interface';
import { destaques } from './data';

@Injectable({
  providedIn: 'root'
})
export class DestaqueMockApi {
  private _destaques: Destaque[] = destaques;

  constructor(private _fuseMockApiService: FuseMockApiService) {
    this.registerHandlers();
  }

  registerHandlers(): void { }
  
}
