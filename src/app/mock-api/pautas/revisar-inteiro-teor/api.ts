import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { revisoes as revisoesData } from './data';

@Injectable({
    providedIn: 'root'
})
export class RevisaoInteiroTeorMockApi {
    private _revisoes: Array<any> = revisoesData;

    constructor(
      private _fuseMockApiService: FuseMockApiService
    ) {
      this.registerHandlers();
    }

    registerHandlers(): void {
      this._fuseMockApiService
        .onGet('/inteiro-teor')
        .reply(({request}) => {
          const { params } = request;
          const id: number = +params.get('id');

          console.log(id)
          
          return [200, this._revisoes[0]];
        });
    }
}
