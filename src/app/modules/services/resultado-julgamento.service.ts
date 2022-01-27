import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ata } from '../acervo/model/interfaces/ata.interface';
import { ModeloDecisao } from '../acervo/model/interfaces/modeloDecisao.interface';
import { Processo } from '../acervo/model/interfaces/processo.interface';

@Injectable({
  providedIn: 'root'
})
export class ResultadoJulgamentoService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public listarCapitulos(id: number): Observable<Processo> {
    return this._httpClient
      .get<Processo>(`processo/${id}/capitulos`).pipe(
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      );
  }

  public salvarCapitulo(id: number, {capitulo, processos_mesma_decisao}): Observable<void> {
    return this._httpClient.post<void>(`processo/${id}/capitulos`, {
      capitulo,
      processos_mesma_decisao,
    }).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public deletarCapitulo(id: number, id_capitulo: number): Observable<void> {
    return this._httpClient.delete<void>(`processo/${id}/capitulos/${id_capitulo}`).pipe(
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

  public obterModeloDecisao(classe: string, tipoCapitulo: string, dispositivo: number, recurso: number): Observable<ModeloDecisao> {
    const params = new HttpParams()
      .set('classe', classe)
      .set('tipo_capitulo', tipoCapitulo)
      .set('dispositivo', dispositivo)
      .set('recurso', recurso);

    return this._httpClient.get<ModeloDecisao>(`modelo-decisao`, {
      params,
    });
  }

  public atualizarModeloDecisao(id: number, modelo: ModeloDecisao): Observable<void> {
    return this._httpClient.put<void>(`modelo-decisao/${id}`, modelo).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public getAta(id: number): Observable<Ata> {
    return this._httpClient.get<Ata>(`ata/${id}`).pipe(
      catchError(error => {
          console.error(error);
          return EMPTY;
      })
    );
  }

  public enviarCorrecaoCapitulo(id: number, correcao: any) {
    return this._httpClient.post<any>(`ata/${id}`, correcao).pipe(
      catchError( error => {
        console.error(error);
        return EMPTY;
      })
    );
  }
}
