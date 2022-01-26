import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITask, ITaskTag } from '../acervo/model/interfaces/itask.interface';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public obterTaferas(itensPorPagina: number = 30, page: number = 0): Observable<ITask[]> {
    let params = new HttpParams();
    params = params.set('itensPorPagina', itensPorPagina);
    params = params.set('page', page);

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

}
