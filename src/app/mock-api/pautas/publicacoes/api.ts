import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { DjeDto } from 'app/modules/acervo/model/interfaces/djeDto.interface';
import { dje as djeData, pecas as pecasData } from './data';

@Injectable({
    providedIn: 'root'
})
export class PublicacaoMockApi {
    private _dje: DjeDto = djeData;
    private _pecas = pecasData;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this._dje = djeData;
        this._pecas = pecasData;
        this.registerHandlers();
    }
    
    registerHandlers(): void {
      this._fuseMockApiService
        .onGet('publicacoes')
        .reply(() => {
          return [201, this._dje];
        });

      this._fuseMockApiService
        .onGet('publicacoes/peca/:id')
        .reply(({urlParams}) => {
          const id = Number(urlParams.id);

          let peca = this._pecas.find(peca=>peca.publicacaoId == id);

          return [201, peca.url];
        });
    }
}
