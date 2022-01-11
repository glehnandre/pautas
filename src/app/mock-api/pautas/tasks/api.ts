import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { tasks } from 'app/mock-api/apps/tasks/data';

@Injectable({
    providedIn: 'root'
})
export class TaskMockApi {
    private _tasks: any[] = tasks;

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
