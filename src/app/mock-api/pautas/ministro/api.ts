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

      this._fuseMockApiService.onGet('/colegiado')
        .reply(({request}) => {
          const { params } = request;
          const data = params?.get('data');
          const colegiado = params.get('colegiado');
          
          const colegiadoEncontrado = this._colegiado
            .filter(coleg => (colegiado) ? coleg.nome === colegiado : true);
            
          return [200, colegiadoEncontrado[0]];
        });
    }
}
