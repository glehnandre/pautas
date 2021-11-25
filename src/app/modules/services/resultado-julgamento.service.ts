import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DecisoesResultadoJulgamento } from '../acervo/model/interfaces/decisao.interface';
import { ModeloDecisao } from '../acervo/model/interfaces/modeloDecisao.interface';

@Injectable({
  providedIn: 'root'
})
export class ResultadoJulgamentoService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public listarDecisoes(id: number): Observable<DecisoesResultadoJulgamento> {
    return this._httpClient
      .get<DecisoesResultadoJulgamento>(`processo/${id}/decisoes`).pipe(
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      );
  }

  public savarDecisao(id: number, {decisao, processos_mesma_decisao}): Observable<void> {
    return this._httpClient.post<void>(`processo/${id}/decisoes`, {
      decisao,
      processos_mesma_decisao,
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

  public salvarModeloDecisao(modelo: ModeloDecisao): Observable<void> {
    return this._httpClient.post<void>(`modelo-decisao`, modelo).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public obterModeloDecisaoPeloId(idDispositivo: number): Observable<ModeloDecisao> {
    return this._httpClient.get<ModeloDecisao>(`modelo-decisao/${idDispositivo}`).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public atualizarModeloDecisao(id: number, modelo: ModeloDecisao): Observable<void> {
    return this._httpClient.put<void>(`modelo-decisao/${id}`, modelo).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

}
