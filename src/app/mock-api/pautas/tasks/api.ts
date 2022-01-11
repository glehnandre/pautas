import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Tarefa } from 'app/modules/acervo/model/interfaces/tarefa.interface';
import { tasks } from './data';

@Injectable({
    providedIn: 'root'
})
export class TaskMockApi {
    private _tasks: Tarefa[] = tasks;

    constructor(private _fuseMockApiService: FuseMockApiService) {
      this.registerHandlers();
    }

    registerHandlers(): void {
      this._fuseMockApiService
        .onGet('/tasks')
        .reply(() => {
          return [200, this._tasks];
        });
    }
}
