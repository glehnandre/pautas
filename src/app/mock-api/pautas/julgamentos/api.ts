import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { SessaoDeJulgamento } from 'app/modules/acervo/model/interfaces/sessaoDeJulgamento.interface';
import { julgamentos as julgamentoData } from './data';

@Injectable({
    providedIn: 'root'
})
export class JulgamentoMockApi {
    private _julgamentos: SessaoDeJulgamento[] = julgamentoData;

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
