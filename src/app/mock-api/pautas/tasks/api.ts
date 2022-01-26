import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { ITask, ITaskTag } from 'app/modules/acervo/model/interfaces/itask.interface';
import { tasks, taskTags } from './data';

@Injectable({
    providedIn: 'root'
})
export class TaskMockApi {
    private _tasks: ITask[] = tasks;
    private _taskTags: ITaskTag[] = taskTags;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this.registerHandlers();
    }

    registerHandlers(): void {
        this._fuseMockApiService
            .onGet('/tasks')
            .reply(({ request }) => {
                const { params } = request;
                const page = +params.get('page');
                const itens = +params.get('itensPorPagina');

                const gruposDeTasks = this.sliceIntoChunks(this._tasks, itens);

                return [200, this._tasks];
            });

        this._fuseMockApiService
            .onGet('/tasks/tags.json')
            .reply(() => {
                return [200, this._taskTags];
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
