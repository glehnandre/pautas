import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Decisao } from '../acervo/model/interfaces/decisao.interface';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { SessaoJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';

@Injectable({
  providedIn: 'root'
})
export class ResultadoJulgamentoService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public listarDecisoes(id: number): Observable<any> {
    return this._httpClient
      .get<any>(`processo/${id}/decisoes`).pipe(
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      );
  }

  public savarDecisao(processo: number, decisao: Decisao): Observable<void> {
    return this._httpClient.post<void>(`processo/${processo}/decisoes`, {
      decisao,
    }).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public deletarDecisao(id: number): Observable<void> {
    return this._httpClient.delete<void>(`decisoes/${id}`).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

}
