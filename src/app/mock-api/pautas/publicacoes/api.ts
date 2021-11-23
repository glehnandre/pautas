import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { DjeDto } from 'app/modules/acervo/model/interfaces/djeDto.interface';
import { dje as djeData } from './data';

@Injectable({
    providedIn: 'root'
})
export class PublicacaoMockApi {
    private _dje: DjeDto = djeData;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this._dje = djeData;
        this.registerHandlers();
    }
    
    registerHandlers(): void {
      this._fuseMockApiService
        .onGet('publicacoes')
        .reply(() => {
          return [201, this._dje];
        });
    }
}
