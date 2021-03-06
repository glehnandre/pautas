import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DocumentoInteiroTeor } from '../acervo/model/interfaces/documento-inteiro-teor.interface';
import { RevisaoInteiroTeor } from '../revisar-inteiro-teor/revisar-inteiro-teor.component';

@Injectable({
  providedIn: 'root'
})
export class RevisarInteiroTeorService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public obterInteiroTeorDoAcordao(id: number): Observable<RevisaoInteiroTeor> {
    let params = new HttpParams();
    params = params.set('id', id);

    return this._httpClient.get<RevisaoInteiroTeor>('/inteiro-teor', {
      params,
    }).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public atualizarDocumentoDoInteiroTeor(id: number, documentos: DocumentoInteiroTeor[]): Observable<RevisaoInteiroTeor> {
    let params = new HttpParams();
    params = params.set('id', id);

    return this._httpClient.put<RevisaoInteiroTeor>('/inteiro-teor', documentos, {
      params,
    }).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public incluirDocumentosDoInteiroTeorDoProcesso(id: number, idsDocumentos: number[]): Observable<void> {
    return this._httpClient.post<void>(`/inteiro-teor/${id}`, idsDocumentos)
      .pipe(
        catchError(error => {
          console.log(error);
          return EMPTY;
        }),
      );
  }

  public removerDocumentosDoInteiroTeorDoProcesso(id: number, idsDocumentos: number[]): Observable<void> {
    let params = new HttpParams();
    params = params.set('processos', idsDocumentos.toString());

    return this._httpClient.delete<void>(`/inteiro-teor/${id}`, {
      params,
    })
      .pipe(
        catchError(error => {
          console.log(error);
          return EMPTY;
        }),
      );
  }

  public publicarInteiroTeorDoAcordao(id: number, idsDocumentos: number[]): Observable<void> {
    return this._httpClient.post<void>(`/inteiro-teor/${id}/publicar`, idsDocumentos)
      .pipe(
        catchError(error => {
          console.log(error);
          return EMPTY;
        }),
      );
  }

}
