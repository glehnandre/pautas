import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Colegiado, NomeDoColegiado } from '../acervo/model/interfaces/colegiado.interface';
import { Ministro } from '../acervo/model/interfaces/ministro.interface';

@Injectable({
  providedIn: 'root'
})
export class MinistroService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  listarMinistros(): Observable<Ministro[]> {
    return this._httpClient.get<Ministro[]>('/ministro').pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  listarColegiado(processo?: string, data?: string, colegiado: NomeDoColegiado = NomeDoColegiado['Primeira Turma']): Observable<Colegiado> {
    let params = new HttpParams();
    params = params.set('processo', processo);
    params = params.set('data', data);
    params = params.set('colegiado', colegiado);

    return this._httpClient.get<Colegiado>('/colegiado', {
      params,
    }).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      }),
    )
  }

}
