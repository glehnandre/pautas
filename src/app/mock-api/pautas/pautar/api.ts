import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Pauta } from 'app/shared/model/interfaces/pauta.interface';
import { pautas as pautaData } from './data';


@Injectable({
    providedIn: 'root'
})
export class PautaMockApi {
    private _pauta: Pauta[] = pautaData;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this._pauta = pautaData;
        this.registerHandlers();
    }
    
    registerHandlers(): void {
      this._fuseMockApiService
        .onPost('pautas')
        .reply(({request}) => {
          const pauta = request.body;

          this._pauta.push(pauta);

          return [201, [this._pauta]];
        });

      this._fuseMockApiService
        .onGet('pautas/:id')
        .reply(({urlParams}) => {
          const id = +urlParams.id;

          const pauta = this._pauta
            .find(pauta => pauta.processos
              .find(processo => processo.id === id));

          return [201, pauta];
        });
    }
}
