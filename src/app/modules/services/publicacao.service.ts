import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DjeDto } from '../acervo/model/interfaces/djeDto.interface';
import { SessaoJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService {

  constructor(private _httpClient: HttpClient,) { 
  }

  recuperarDje(): Observable<any> {
    return this._httpClient.get<any>('publicacoes').pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  abrirPeca(id: number): Observable<string>{
    return this._httpClient.get<string>(`publicacoes/peca/${id}`).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public publicarAta(data: string, sessao: SessaoJulgamento): Observable<void> {
    return this._httpClient.post<void>('publicar', {data, sessao}).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }
}
