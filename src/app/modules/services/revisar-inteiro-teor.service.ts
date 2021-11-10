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

  public atualizarDocumentoDoInteiroTeor(id: number, documentos: DocumentoInteiroTeor[]): Observable<void> {
    let params = new HttpParams();
    params = params.set('id', id);

    return this._httpClient.put<void>('/inteiro-teor', documentos, {
      params,
    }).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

}
