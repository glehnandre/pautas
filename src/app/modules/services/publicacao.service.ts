import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DjeDto } from '../acervo/model/interfaces/djeDto.interface';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService {

  constructor(private _httpClient: HttpClient,) { }

  recuperarDje(): Observable<DjeDto> {
    return this._httpClient.get<DjeDto>('publicacoes').pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }
}
