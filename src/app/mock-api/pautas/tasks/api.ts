import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { Filtro } from 'app/modules/minhas-tarefas/tabela/tabela.component';
import { ITask, ITaskTag } from 'app/shared/model/interfaces/itask.interface';
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
                const obj = {};

                for (let key of params.keys()) {
                    if (params.get(key)) {
                        obj[key] = params.get(key);
                    }
                }

                if (Object.keys(obj).length > 0) {
                    return [200, this._filtrarListaDeTarefas(this._tasks, obj)];
                } else {
                    return [200, this._tasks];
                }
            });

        this._fuseMockApiService
            .onGet('/tasks/tags.json')
            .reply(() => {
                return [200, this._taskTags];
            });
        
        this._fuseMockApiService
            .onPost('/tasks/notes')
            .reply(({request}) => {
                const body = request.body as { taskId: number; notes: string; };
                const index = this._tasks.findIndex(t => t.id === body.taskId);

                if (index !== -1) {
                    this._tasks[index].notes = body.notes;
                    return [200, this._tasks[index]];
                }

                return [404, {msg: 'Task não encontrada.'}];
            });
    }

    private _filtrarListaDeTarefas(tarefas: ITask[], filtros: Filtro): ITask[] {
        let tarefasFiltradas = [...tarefas];

        // Filtrar por data de inicio e fim
        if (filtros?.data_inicio && filtros?.data_fim) {
            const { data_inicio, data_fim } = filtros;

            const dataInicioDoFiltro = new Date(data_inicio);
            dataInicioDoFiltro.setHours(0,0,0,0);

            const dataFimDoFiltro = new Date(data_fim);
            dataFimDoFiltro.setHours(0,0,0,0);

            
            tarefasFiltradas = tarefasFiltradas.filter(t => {
                const dataInicioDaTarefa = new Date(t.startDate);
                dataInicioDaTarefa.setHours(0,0,0,0);

                const dataFimDaTarefa = new Date(t.completedDate);
                dataFimDaTarefa.setHours(0,0,0,0);

                if (dataInicioDaTarefa.getTime() >= dataInicioDoFiltro.getTime()) {
                    if (dataFimDaTarefa.getTime() > 0) {
                        if (dataFimDaTarefa.getTime() <= dataFimDoFiltro.getTime()) {
                            return true;
                        }
                    } else {
                        if (dataInicioDaTarefa.getTime() <= dataFimDoFiltro.getTime()) {
                            return true;
                        }
                    }
                }

                return false;
            });

            delete filtros.data_inicio;
            delete filtros.data_fim;
        }


        // Filtrar por número do processo
        if (filtros?.numeroProcesso) {
            const { numeroProcesso } = filtros;
            
            tarefasFiltradas = tarefasFiltradas.filter(t => {
                const numero = t.searchableId.split(' ')[1];
                return (+numeroProcesso === +numero);
            });

            delete filtros.numeroProcesso;
        }


        // Filtrar por demais atributos
        for (const task of Object.values(filtros)) {
            tarefasFiltradas = tarefasFiltradas.filter(t => {
                return (t?.etags && t.etags.includes(task));
            });
        }

        if (filtros?.tags && filtros.tags.length > 0) {
            const { tags } = filtros;

            for (const tag of tags) {
                for (const task of tag.tasks) {
                    tarefasFiltradas = tarefasFiltradas.filter(t => {
                        return (t?.etags && t.etags.includes(task));
                    });
                }
            }
        }

        return tarefasFiltradas;
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
