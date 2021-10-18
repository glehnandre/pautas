import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Publicacao } from 'app/modules/acervo/model/interfaces/publicacao.interface';
import { publicacao as publicacaoData } from './data';

@Injectable({
    providedIn: 'root'
})
export class PublicacaoMockApi {
    private _publicacao: Publicacao = publicacaoData;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this._publicacao = publicacaoData;
        this.registerHandlers();
    }
    
    registerHandlers(): void {
      this._fuseMockApiService
        .onGet('publicacoes')
        .reply(() => {
          return [201, [this._publicacao]];
        });
    }
}
