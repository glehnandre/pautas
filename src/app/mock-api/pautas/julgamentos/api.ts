import { Injectable } from '@angular/core';
import { FuseMockApiUtils } from '@fuse/lib/mock-api';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Julgamento } from 'app/modules/acervo/acoes/pautar/pautar.component';
import { julgamentos as julgamentoData } from './data';

@Injectable({
    providedIn: 'root'
})
export class JulgamentoMockApi {
    private _julgamentos: Julgamento[] = julgamentoData;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this._julgamentos = julgamentoData;
        this.registerHandlers();
    }
    
    registerHandlers(): void {
      this._fuseMockApiService
        .onPost('julgamentos')
        .reply(({request}) => {
          const julgamento = request.body;

          this._julgamentos.push(julgamento);

          return [201, {
            msg: 'Processo pautado com sucesso!'
          }];
        });
    }
}
