import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { ITask } from 'app/modules/acervo/model/interfaces/itask.interface';
import { tasks } from './data';

@Injectable({
    providedIn: 'root'
})
export class TaskMockApi {
    private _tasks: ITask[] = tasks;

    constructor(private _fuseMockApiService: FuseMockApiService) {
      this.registerHandlers();
    }

    registerHandlers(): void {
      this._fuseMockApiService
        .onGet('/tasks')
        .reply(({request}) => {
            const { params } = request;
            const page = +params.get('page');
            const itens = +params.get('itensPorPagina');

            const gruposDeTasks = this.sliceIntoChunks(this._tasks, itens);

            return [200, {
                data: gruposDeTasks[page],
                totalDeItens: this._tasks.length,
            }];
        });
    }

    private sliceIntoChunks(arr: Array<any>, chunkSize: number): Array<any> {
        const res = [];

        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }

        return res;
    }
}
