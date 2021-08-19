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

  listarColegiados(
    merito?: string,
    sessao?: string,
    recurso?: string,
    cadeira?: string,
  ): Observable<Colegiado[]> {
    let params = new HttpParams();
    params = params.set('merito', merito);
    params = params.set('recurso', recurso);
    params = params.set('cadeira', cadeira);
    params = params.set('sessao', sessao);
    
    return this._httpClient.get<Colegiado[]>('/colegiado', {
      params,
    }).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      }),
    )
  }

  criarColegiado(value: any): Observable<any[]> {
    return this._httpClient.post<any[]>('/colegiado', value).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

}
