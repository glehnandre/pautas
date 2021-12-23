import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Classe } from 'app/modules/acervo/model/interfaces/classe.interface';
import { classes as classeData } from './data';

@Injectable({
    providedIn: 'root'
})
export class ClasseMockApi {
    private _classes: Classe[] = classeData;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this._classes = classeData;
        this.registerHandlers();
    }

    registerHandlers(): void {
      console.log("ENTROU NO MOCK");
      this._fuseMockApiService.onGet('classes')
        .reply(() => {
          return [200, this._classes];
        });
    }
}
