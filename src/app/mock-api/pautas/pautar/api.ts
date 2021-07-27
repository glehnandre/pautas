import { Injectable } from '@angular/core';
import { FuseMockApiUtils } from '@fuse/lib/mock-api';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Pauta } from 'app/modules/acervo/acoes/pautar/pautar.component';
import { pautas as pautaData } from './data';

@Injectable({
    providedIn: 'root'
})
export class PautaMockApi {
    private _pauta: Pauta[] = pautaData;

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
