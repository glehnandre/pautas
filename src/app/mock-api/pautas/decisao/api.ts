import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { TipoDoProcesso } from 'app/modules/acervo/model/enums/tipoDoProcesso.enum';
import { Decisao } from 'app/modules/acervo/model/interfaces/decisao.interface';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { SessaoJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface';
import { decisoes as decisoesData } from './data';

@Injectable({
    providedIn: 'root'
})
export class DecisaoMockApi {
    private _decisoes: Array<{decisoes: Decisao[], processo: Processo, sessao: SessaoJulgamento}> = decisoesData;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this._decisoes = decisoesData;
        this.registerHandlers();
    }
    
    registerHandlers(): void {
      this._fuseMockApiService
        .onGet('decisao/:processo')
        .reply(({urlParams}) => {
          const processo = urlParams.processo;
          
          const index = this._decisoes.findIndex(dec => {
            if (dec.processo.tipo === TipoDoProcesso.Merito) {
              const query = `${dec.processo.classe}${dec.processo.numero}`;
              if (processo === query) {
                return dec;
              }
            } else {
              const query = `${dec.processo.classe}${dec.processo.numero}-${dec.processo.abreviacao}`;
              if (processo === query) {
                return dec;
              }
            }
          });

          const decisao = this._decisoes[index];

          return [201, (decisao) ? decisao : {msg: 'Erro ao buscar decisões'}];
        });

      this._fuseMockApiService
        .onGet('processo/:processo/decisoes')
        .reply(({urlParams}) => {
          const processo = urlParams.processo;
          
          const index = this._decisoes.findIndex(dec => {
            if (dec.processo.tipo === TipoDoProcesso.Merito) {
              const query = `${dec.processo.classe}${dec.processo.numero}`;
              if (processo === query) {
                return dec;
              }
            }
          });

          const decisao = this._decisoes[index];

          return [201, (decisao) ? decisao : {msg: 'Erro ao buscar decisões'}];
        });

      this._fuseMockApiService
        .onPost('processo/:processo/decisoes')
        .reply(({request, urlParams}) => {
          const parametroProcesso = urlParams.processo;
          const { decisao } = request.body;
          
          const index = this._decisoes
            .findIndex(({processo}) => {
              const { classe, numero, abreviacao } = processo;
              const processoConcatenado = `${classe}${numero}-${abreviacao}`;
              
              return (processoConcatenado === parametroProcesso);
            });
          
          if (index !== -1) {
            this._decisoes[index].decisoes.push(decisao);
            return [201, {}];     
          } 

          return [404, {
            description: "Nenhuma decisão encontrada.",
          }];
        });

      this._fuseMockApiService
        .onDelete('decisoes/:id')
        .reply(({urlParams}) => {
          let id: number;

          try {
            id = +urlParams.id;
          } catch (error) {
            return [400, {description: 'Parâmetros incorretos para ação.'}]
          }

          const index = this._decisoes.findIndex(data => data.processo.id === id);

          if (index !== -1) {
            this._decisoes.splice(index, 1);
            return [201, { description: 'Sucesso' }]
          }

          return [404, { description: 'Tags ou processos não encontrados' }]
        });

    }
}
