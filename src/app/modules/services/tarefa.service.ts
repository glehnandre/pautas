import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public obterTaferas(): Observable<Task[]> {
    return this._httpClient.get<Task[]>('/tasks').pipe(
        catchError(error => {
            console.log(error);
            return EMPTY;
        }),
    );
  }

}
