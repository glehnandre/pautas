import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Colegiado } from 'app/modules/acervo/model/interfaces/colegiado.interface';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { ministro as ministroData, colegiado as colegiadoData, colegiadoPost } from './data';

@Injectable({
    providedIn: 'root'
})
export class MinistroMockApi {
    private _ministros: Ministro[] = ministroData;
    private _colegiado: Colegiado[] = colegiadoData;
    private _colegiadoPost: any[] = colegiadoPost;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this._ministros = ministroData;
        this._colegiado = colegiadoData;
        this.registerHandlers();
    }
    
    registerHandlers(): void {
      this._fuseMockApiService.onGet('/ministro')
        .reply(() => {
          return [200, this._ministros];
        });

      this._fuseMockApiService
        .onGet('/colegiado')
        .reply(({request}) => {
          const { params } = request;

          const merito = params.get('merito');
          const sessao = params.get('sessao');
          const recurso = params.get('recurso');
          const colegiado = params.get('cadeira');
          
          if (merito === 'undefined' && sessao === 'undefined') {
            return [200, this._colegiado];
          } else {
            const colegiados = this._colegiado
              .filter(col => `${col.numeroSessao}-${col.anoSessao}` === sessao);
            return [200, colegiados];
          }
        });

      this._fuseMockApiService
        .onPost('/colegiado')
        .reply(({request}) => {
          const { body } = request;
          
          this._colegiadoPost.push(body);

          return [200, this._colegiadoPost];
        });
    }
}
