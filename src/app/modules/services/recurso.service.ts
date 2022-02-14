import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoRecursoDto } from 'app/shared/model/interfaces/tipoRecursoDto';
import { Observable } from 'rxjs';


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
