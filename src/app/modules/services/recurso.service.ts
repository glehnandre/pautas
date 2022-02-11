import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TipoRecursoDto } from '../acervo/model/interfaces/tipoRecursoDto';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public obterListaDeRecursos(id?: number): Observable<TipoRecursoDto[]> {
    let params = new HttpParams();
    params = params.set('id', id);

    return this._httpClient.get<TipoRecursoDto[]>(`recursos`, {
      params,
    });
  }

}
