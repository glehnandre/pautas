import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { dispositivos as dispositivoData } from './data';

@Injectable({
  providedIn: 'root'
})
export class DispositivoMockApi {
  private _dispositivos = dispositivoData;

  constructor(private _fuseMockApiService: FuseMockApiService) {
    this.registerHandlers();
  }
  
  registerHandlers(): void {
    this._fuseMockApiService
      .onGet('dispositivos/processo/:id/tipo-capitulo/:tipo')
      .reply(({urlParams}) => {
        const id = +urlParams.id;
        const tipo = urlParams.tipo;

        return [200, this._dispositivos];
      });
  }
}
