import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';

import { ModeloDecisao } from 'app/modules/acervo/model/interfaces/modeloDecisao.interface';

import { dispositivos } from '../dispositivo/data';
import { modeloDecisao } from './data';

import { setStorage } from '../storage';

@Injectable({
    providedIn: 'root'
})
export class DecisaoMockApi {
    private _modeloDecisao: ModeloDecisao[] = modeloDecisao;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this.registerHandlers();
    }

    registerHandlers(): void {

      this._fuseMockApiService
        .onPost('modelo-decisao')
        .reply(({request}) => {
          const body = request.body;
          const modelo = this._modeloDecisao.find(m => (m.classe === body.classe) && (m.tipoCapitulo === body.tipo_capitulo) && (m.dispositivo.id === +body.dispositivo) && (m.recurso === body.recurso));
          if (modelo === undefined) {
            const dispositivo = dispositivos.find(d => d.id === body.dispositivo);
            body.id = this._modeloDecisao.length+1;
            this._modeloDecisao.push({...body, dispositivo});
            console.log(this._modeloDecisao);
            return [200, { description: "Sucesso." }];
          }else{
            return [404, { description: "Nenhuma decisão encontrada." }]; 
          }
        });

      this._fuseMockApiService
        .onGet('modelo-decisao')
        .reply(({request}) => {
          const classe: string = request.params.get('classe');
          const tipo_capitulo: string = request.params.get('tipo_capitulo');
          const dispositivo = request.params.get('dispositivo');
          const recurso: number = +request.params.get('recurso');

          const modelo = this._modeloDecisao.find(m => (m.classe === classe) && (m.tipoCapitulo === tipo_capitulo) && (m.dispositivo.id === +dispositivo) && (m.recurso === recurso));
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
