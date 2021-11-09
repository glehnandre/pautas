import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { RevisaoInteiroTeor } from 'app/modules/revisar-inteiro-teor/revisar-inteiro-teor.component';
import { revisoes as revisoesData } from './data';

@Injectable({
    providedIn: 'root'
})
export class RevisaoInteiroTeorMockApi {
    private _revisoes: Array<RevisaoInteiroTeor> = revisoesData;

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

          const revisao = this._revisoes
            .find(rev => rev.id_processo === id);

          if (revisao !== undefined) {
            return [200, revisao];
          } else {
            return [200, {
              description: "Não há processo associado a esse processo.",
            }];
          }
        });
    }
}
