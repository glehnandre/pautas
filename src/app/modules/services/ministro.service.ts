import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Frase } from '../acervo/model/interfaces/frase-genero-plural.interface';
import { Genero } from '../acervo/model/enums/genero.enum'
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

  listarMinistrosDoColegiado(colegiado: string): Observable<Ministro[]> {
    return this._httpClient.get<Ministro[]>(`/colegiado/${colegiado}/composicao`).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  listarColegiados(
    colegiado?: string,
    processo?: string,
    data?: string,
  ): Observable<Colegiado[]> {
    let params = new HttpParams();
    params = params.set('processo', processo);
    params = params.set('data', data);
    params = params.set('colegiado', colegiado);

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

  ministrosString(ministros: Ministro[]): string {
    if(ministros.length == 1) return ministros[0].nome;
    let nomesMinistros = [], ultimoMinistro;
    ministros.forEach(ministro => nomesMinistros.push(ministro.nome));
    ultimoMinistro = nomesMinistros.pop();
    return [nomesMinistros.join(', '), ultimoMinistro].join(' e ');
   }

   generoEPlural(ministros: Ministro[], frase: Frase): string {
    return ministros.length == 1?
            ministros[0].genero == Genero.F ?
              frase?.F:
              frase?.M:
            ministros.filter(({ genero }) => genero == Genero.M).length?
              frase?.PM:
              frase?.PF;
  }
}
