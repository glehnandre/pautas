import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentoInteiroTeor } from 'app/shared/model/interfaces/documento-inteiro-teor.interface';
import { Observable } from 'rxjs';
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
    });
  }

  public atualizarDocumentoDoInteiroTeor(id: number, documentos: DocumentoInteiroTeor[]): Observable<RevisaoInteiroTeor> {
    let params = new HttpParams();
    params = params.set('id', id);

    return this._httpClient.put<RevisaoInteiroTeor>('/inteiro-teor', documentos, {
      params,
    });
  }

  public incluirDocumentosDoInteiroTeorDoProcesso(id: number, idsDocumentos: number[]): Observable<void> {
    return this._httpClient.post<void>(`/inteiro-teor/${id}`, idsDocumentos);
  }

  public removerDocumentosDoInteiroTeorDoProcesso(id: number, idsDocumentos: number[]): Observable<void> {
    let params = new HttpParams();
    params = params.set('processos', idsDocumentos.toString());

    return this._httpClient.delete<void>(`/inteiro-teor/${id}`, {
      params,
    });
  }

  public publicarInteiroTeorDoAcordao(id: number, idsDocumentos: number[]): Observable<void> {
    return this._httpClient.post<void>(`/inteiro-teor/${id}/publicar`, idsDocumentos);
  }

}
