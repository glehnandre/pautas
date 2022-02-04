import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITask, ITaskTag, SetNotesTaskCommand } from '../acervo/model/interfaces/itask.interface';
import { Filtro } from '../minhas-tarefas/tabela/tabela.component';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public obterTaferas(filtros?: Filtro): Observable<ITask[]> {
    let params = new HttpParams();

    if (filtros) {
      for (const key of Object.keys(filtros)) {
        if (filtros[key]) {
          if (Array.isArray(filtros[key]) && filtros[key].length > 0) {
            const tags = [...new Set(filtros[key].map(t => t.tasks).flat())];
            params = params.set(key, tags.toString());
          } else {
            params = params.set(key, new String(filtros[key]).toString());
          }
        }
      }
    }

    return this._httpClient.get<ITask[]>('/tasks', {
      params,
    }).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      }),
    );
  }

  public obterTags(): Observable<ITaskTag[]> {
    return this._httpClient.get<ITaskTag[]>('/tasks/tags.json').pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      }),
    );
  }

  public setNotes(cmd: SetNotesTaskCommand): Observable<ITask> {
    return this._httpClient.post<ITask>(`/tasks/notes`, cmd).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      }),
    );
  }

}
