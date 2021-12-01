import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { DecisoesResultadoJulgamento } from 'app/modules/acervo/model/interfaces/decisao.interface';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { processo } from '../processos/data';
import { sessao } from '../sessoes-julgamento/data';
import { decisoes as decisoesData } from './data';

@Injectable({
    providedIn: 'root'
})
export class DecisaoMockApi {
    private _decisoes: Array<DecisoesResultadoJulgamento> = decisoesData;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this._decisoes = decisoesData;
        this.registerHandlers();
    }

    registerHandlers(): void {
      this._fuseMockApiService
        .onGet('processo/:id/decisoes')
        .reply(({urlParams}) => {
          const idProcesso = +urlParams.id;

          const decisao = this._decisoes[0];

          return [201, (decisao) ? decisao : {msg: 'Erro ao buscar decisões'}];
        });

      this._fuseMockApiService
        .onPost('processo/:id/decisoes')
        .reply(({request, urlParams}) => {
          const idProcesso = +urlParams.id;
          const { decisao, processos_mesma_decisao } = request.body;
          
          if (idProcesso) {
            const index = this._decisoes[0].decisoes
              .findIndex(dec => JSON.stringify(dec.capitulo) === JSON.stringify(decisao));
            
            if (decisao.id) {
              const index = this._decisoes[0].decisoes.findIndex(it => it.capitulo.id === decisao.id);
              this._decisoes[0].decisoes.splice(index, 1);
              this._decisoes[0].decisoes.push({
                capitulo: decisao,
                processos_mesma_decisao,
              });
            } else {
              this._decisoes[0].decisoes.push({
                capitulo: {
                  id: this._decisoes[0].decisoes.length + 1,
                  ...decisao,
                },
                processos_mesma_decisao,
              });
            }

            return [201, this._decisoes[0]];     
          }

          return [404, {
            description: "Nenhuma decisão encontrada.",
          }];
        });

      this._fuseMockApiService
        .onDelete('decisoes/:id')
        .reply(({urlParams}) => {
          let idProcesso: number;

          try {
            idProcesso = +urlParams.id;
          } catch (error) {
            return [400, {description: 'Parâmetros incorretos para ação.'}]
          }

          const index = this._decisoes
            .findIndex(({decisoes}) => decisoes
              .findIndex(({processos_mesma_decisao}) => processos_mesma_decisao
                .findIndex(({id}) => id === idProcesso)));

          if (index !== -1) {
            this._decisoes.splice(index, 1);
            return [201, { description: 'Sucesso' }]
          }

          return [404, { description: 'Tags ou processos não encontrados' }]
        });

    }
}
