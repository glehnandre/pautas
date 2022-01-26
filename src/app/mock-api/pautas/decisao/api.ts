import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';

import { DecisoesResultadoJulgamento } from 'app/modules/acervo/model/interfaces/decisao.interface';
import { ModeloDecisao } from 'app/modules/acervo/model/interfaces/modeloDecisao.interface';
import { Destaque, Vista } from 'app/modules/acervo/model/interfaces/vista-e-destaque.interface';

import { dispositivos } from '../dispositivo/data';
import { decisoes as decisoesData, modeloDecisao } from './data';

import { setStorage } from '../storage';
import { destaques, vistas } from '../ata/data';

@Injectable({
    providedIn: 'root'
})
export class DecisaoMockApi {
    private _decisoes: Array<DecisoesResultadoJulgamento> = decisoesData;
    private _vistas: Array<Vista> = vistas;
    private _destaques: Array<Destaque> = destaques;
    private _modeloDecisao: ModeloDecisao[] = modeloDecisao;

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
                destaques: this._destaques.filter(({ processo }) => processo == idProcesso),
                vistas: this._vistas.filter(({ processo }) => processo == idProcesso),
              });
            } else {
              const dispositivo = dispositivos.find(d => d.id === decisao.dispositivo);
              this._decisoes[0].decisoes.push({
                capitulo: {
                  ...decisao,
                  id: this._decisoes[0].decisoes.length + 1,
                  dispositivo,
                },
                processos_mesma_decisao,
                destaques: this._destaques.filter(({ processo }) => processo == idProcesso),
                vistas: this._vistas.filter(({ processo }) => processo == idProcesso),
              });
            }
            setStorage('decisoes', this._decisoes);
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
            setStorage('decisoes', this._decisoes);
            return [201, { description: 'Sucesso' }]
          }

          return [404, { description: 'Tags ou processos não encontrados' }]
        });

      this._fuseMockApiService
        .onPost('modelo-decisao')
        .reply(({request}) => {
          const body = request.body;
          const index = this._modeloDecisao.findIndex(m => m.id === body.id);

          if (index === -1) {
            const dispositivo = dispositivos.find(d => d.id === body.dispositivo);
            body.id = this._modeloDecisao.length+1;
            this._modeloDecisao.push({...body, dispositivo});

            console.log(this._modeloDecisao)
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
    }
}
