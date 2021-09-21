import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { decisoes as decisoesData } from './data';

@Injectable({
    providedIn: 'root'
})
export class DecisaoMockApi {
    private _decisoes: any[] = decisoesData;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this._decisoes = decisoesData;
        this.registerHandlers();
    }
    
    registerHandlers(): void {
      this._fuseMockApiService
        .onGet('/decisao/:processo')
        .reply(({urlParams}) => {
          const processo = urlParams.processo;
          
          const index = this._decisoes.findIndex(dec => {
            if (dec.processo.tipo === 'Merito') {
              const query = `${dec.processo.classe}${dec.processo.numero}`;
              if (processo === query) {
                return dec;
              }
            }
          });

          const decisao = this._decisoes[index];

          return [201, (decisao) ? decisao : {msg: 'Erro ao buscar decisões'}];
        });
    }
}
