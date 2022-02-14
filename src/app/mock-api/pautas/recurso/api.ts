import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { TipoRecursoDto } from 'app/shared/model/interfaces/tipoRecursoDto';
import { recursos } from './data';


@Injectable({
    providedIn: 'root'
})
export class RecursoMockApi {

  private _recursos: TipoRecursoDto[] = recursos;
    
  constructor(private _fuseMockApiService: FuseMockApiService) {  
    this.registerHandlers();
  }
    
  registerHandlers(): void {
    this._fuseMockApiService
      .onGet('recursos')
      .reply(({request}) => {
        const id: number = +request.params.get('id');
        const index = this._recursos.findIndex(r => r.id === id);

        if (id !== NaN && index !== -1) {
          return [200, [this._recursos[index]]];
        }

        if ((id > 0 && index === -1) || this._recursos.length === 0) {
          return [404, { description: "Nenhum recurso foi encontrado." }];
        }

        return [200, this._recursos];
      });
  }
}
