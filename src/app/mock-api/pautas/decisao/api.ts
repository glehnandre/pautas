import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Ata } from 'app/modules/acervo/model/interfaces/ata.interface';
import { DecisoesResultadoJulgamento } from 'app/modules/acervo/model/interfaces/decisao.interface';
import { ModeloDecisao } from 'app/modules/acervo/model/interfaces/modeloDecisao.interface';
import { dispositivos } from '../dispositivo/data';
import { decisoes as decisoesData, modeloDecisao } from './data';
import { ata as ataData} from './data';

@Injectable({
    providedIn: 'root'
})
export class DecisaoMockApi {
    private _decisoes: Array<DecisoesResultadoJulgamento> = decisoesData;
    private _modeloDecisao: ModeloDecisao[] = modeloDecisao;
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

      this._fuseMockApiService
        .onPost('modelo-decisao')
        .reply(({request}) => {
          const body = request.body as ModeloDecisao;
          const index = this._modeloDecisao.findIndex(m => m.id === body.id);

          if (index === -1) {
            body.id = this._modeloDecisao.length+1;
            this._modeloDecisao.push(body);
            
            return [200, { description: "Sucesso." }];
          }

          return [404, { description: "Nenhuma decisão encontrada." }];
        });

      this._fuseMockApiService
        .onGet('modelo-decisao')
        .reply(({request}) => {
          const classe: string = request.params.get('classe');
          const tipo_capitulo: string = request.params.get('tipo_capitulo');
          const dispositivo = request.params.get('dispositivo');
          const recurso: number = +request.params.get('recurso');

          const modelo = this._modeloDecisao
            .find(m => (m.classe === classe) && (m.tipoCapitulo === tipo_capitulo) && (m.dispositivo.id === +dispositivo) && (m.recurso === recurso));

          if (modelo !== undefined) {
            return [200, modelo];
          } else {
            return [404, { 
              description: "Não foram encontrados dispositivos para o processo" 
            }];
          }

        });

      this._fuseMockApiService
        .onPut('modelo-decisao/:id')
        .reply(({request, urlParams}) => {
          const id: number = +urlParams.id;
          const index = this._modeloDecisao.findIndex(m => m.id === id);
          const body = request.body;

          if (index !== -1) {
            const dispositivo = dispositivos.find(d => d.id === body.dispositivo);
            this._modeloDecisao.splice(index, 1);
            this._modeloDecisao.push({...body, id, dispositivo});

            return [200, this._modeloDecisao[index]];
          }

          return [404, { description: "Não foram encontrados dispositivos para o processo" }];
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
