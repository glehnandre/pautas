import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DjeDto } from '../acervo/model/interfaces/djeDto.interface';

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

  abrirPeca(id: number, processo: string): Observable<string>{
    return this._httpClient.get<string>(`publicacoes/peca/${id}`).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }
}
