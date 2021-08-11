import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { ministro as ministroData } from './data';

@Injectable({
    providedIn: 'root'
})
export class MinistroMockApi {
    private _ministros: Ministro[] = ministroData;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this._ministros = ministroData;
        this.registerHandlers();
    }
    
    registerHandlers(): void {
      this._fuseMockApiService.onGet('/ministro')
        .reply(() => {
          return [200, this._ministros];
        });

        this._fuseMockApiService.onGet('/colegiado')
        .reply(() => {
          return [200, this._ministros];
        });
    }
}
