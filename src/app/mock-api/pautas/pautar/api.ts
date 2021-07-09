import { Injectable } from '@angular/core';
import { FuseMockApiUtils } from '@fuse/lib/mock-api';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { pautas as pautaData } from './data';

@Injectable({
    providedIn: 'root'
})
export class PautaMockApi {
    private _pauta: any[] = pautaData;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this._pauta = pautaData;
        this.registerHandlers();
    }
    
    registerHandlers(): void {
      this._fuseMockApiService
        .onPost('pautas')
        .reply(({request}) => {
          const pauta = request.body;

          this._pauta.push(pauta);

          return [201, [this._pauta]];
        });
    }
}
