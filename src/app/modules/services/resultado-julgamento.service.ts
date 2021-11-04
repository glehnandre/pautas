import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ata } from '../acervo/model/interfaces/ata.interface';
import { Decisao, DecisoesResultadoJulgamento } from '../acervo/model/interfaces/decisao.interface';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { SessaoJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';

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

  public getAta(num: number, ano:number): Observable<Ata> {
    return this._httpClient.get<Ata>(`ata/${num}&${ano}`).pipe(
      catchError(error => {
          console.error(error);
          return EMPTY;
      })
    );
  }
}
