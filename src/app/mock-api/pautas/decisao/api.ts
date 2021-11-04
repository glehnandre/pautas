import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Ata } from 'app/modules/acervo/model/interfaces/ata.interface';
import { DecisoesResultadoJulgamento } from 'app/modules/acervo/model/interfaces/decisao.interface';
import { ata as ataData, decisoes as decisoesData } from './data';

@Injectable({
    providedIn: 'root'
})
export class DecisaoMockApi {
    private _decisoes: Array<DecisoesResultadoJulgamento> = decisoesData;
    private _ata: Ata = ataData;

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
          const { decisao } = request.body;

          if (idProcesso) {
            return [201, {msg: 'ok'}];
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

      this._fuseMockApiService
        .onGet('ata/:num&:ano')
        .reply( ({ urlParams }) => {
          let num: number, ano:number;

          try {
            num = +urlParams.num;
            ano = +urlParams.ano;
          } catch (error) {
            return [400, { description: 'Parâmetros incorretos para ação.' }]
          }
          const ata = this._ata;

          return (ata) ?
            [200,  ata]:
            [404, { description: 'Não há sessão de julgamento com esse identificador' }];
        });

    }
}
