import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';

import { Ata } from 'app/modules/acervo/model/interfaces/ata.interface';

import { processo } from '../processos/data';
import { atas } from './data';
import { getStorage } from '../storage';

@Injectable({
    providedIn: 'root'
})
export class AtaMockApi {
    private _atas: Ata[] = getStorage('atas', atas);
    private _processos = getStorage('processos', processo);

    constructor(private _fuseMockApiService: FuseMockApiService) {
      this.registerHandlers();
    }

    registerHandlers(): void {
      this._fuseMockApiService
        .onGet('ata/:id')
        .reply( ({ urlParams }) => {
          let id: number;

          try {
            id = +urlParams.id;
          } catch (error) {
            return [400, { description: 'Parâmetros incorretos para ação.' }];
          }
          let ata = this._atas.find(({ sessao }) => sessao.id == id);
          return (ata) ?
            [200,  ata]:
            [404, { description: 'Não há sessão de julgamento com esse identificador' }];
        });

      this._fuseMockApiService
        .onPost('ata/:id')
        .reply( ({ request, urlParams }) => {
          let id: number;
          const {  body } = request;
          try {
            id = +urlParams.id;
          } catch (error) {
            return [400, { description: 'Parâmetros incorretos para ação.' }];
          }
          return this._processos.filter( ({ id }) => body == id).length ?
            [200, 'Sucesso']:
            [404, 'Nenhum processo encontrado'];
        })

    }
}
