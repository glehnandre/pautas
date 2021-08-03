import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { StatusProcesso } from 'app/modules/acervo/tabela/status/situacaoProcesso';
import { situacao as situacaoData } from './data';
import { processo as processoData } from 'app/mock-api/pautas/processos/data';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';

@Injectable({
    providedIn: 'root'
})
export class SituacaoMockApi {
    private _situacao: StatusProcesso[] = situacaoData;
    private _processo: Processo[] = processoData;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this.registerHandlers();
    }
    
    registerHandlers(): void {
      this._fuseMockApiService
        .onGet('processos/:id/situacao')
        .reply(({urlParams}) => {
          const id = +urlParams.id;

          const processo = this._processo
            .find(processo => processo.id === id);

          const situacao = this._situacao
            .find(({situacao}) => situacao.id === processo.situacao);

          return [201, situacao];
        });
    }
}
