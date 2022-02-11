import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DjeDto } from '../acervo/model/interfaces/djeDto.interface';
import { SessaoDeJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService {

  constructor(private _httpClient: HttpClient,) { 
  }

  recuperarDje(): Observable<any> {
    return this._httpClient.get<any>('publicacoes');
  }

  abrirPeca(id: number): Observable<string>{
    return this._httpClient.get<string>(`publicacoes/peca/${id}`);
  }

  public publicarAta(data: string, sessao: SessaoDeJulgamento): Observable<void> {
    return this._httpClient.post<void>('publicar', {data, sessao});
  }
}
