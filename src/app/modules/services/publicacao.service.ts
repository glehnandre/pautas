import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Publicacao } from '../acervo/model/interfaces/publicacao.interface';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService {

  constructor(private _httpClient: HttpClient,) { }

  listarPublicacoes(): Observable<Publicacao[]> {
    return this._httpClient.get<Publicacao[]>('publicacoes').pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }
}
