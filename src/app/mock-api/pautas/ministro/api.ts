import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Colegiado } from 'app/modules/acervo/model/interfaces/colegiado.interface';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { ministro as ministroData, colegiado as colegiadoData } from './data';

@Injectable({
    providedIn: 'root'
})
export class MinistroMockApi {
    private _ministros: Ministro[] = ministroData;
    private _colegiado: Colegiado[] = colegiadoData;

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

          const processo = params.get('processo');
          const data = params.get('data');
          const colegiado = params.get('colegiado');
          
          if (colegiado === 'pleno') {
            const pleno = this._colegiado.filter(col => col.nome === 'pleno');
            console.log(pleno)
            return [200, pleno];
          } else {
            const colegiados = this._colegiado
              .filter(col => col.nome === colegiado);

            return [200, colegiados];
          }
        });

      this._fuseMockApiService
      .onGet('/colegiado/:colegiado/composicao')
      .reply(({urlParams}) => {
        const col = String(urlParams.colegiado);
        const ministros: Ministro[] = []

        this._colegiado.forEach(colegiado=>{
          if(colegiado.nome==col){
            colegiado.composicao.forEach(composicao=>{
              ministros.push(composicao.ministro);
            })
          }
        })

        return [200, ministros];
      });

      this._fuseMockApiService
        .onPost('/colegiado')
        .reply(({request}) => {
          const { body } = request;
          
          this._colegiado.push(body);

          return [200, this._colegiado];
        });
    }
}
