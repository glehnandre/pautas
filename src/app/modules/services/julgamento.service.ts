import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pauta } from '../acervo/model/interfaces/pauta.interface';

@Injectable({
  providedIn: 'root'
})
export class JulgamentoService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public pautarProcesso(pauta: any): Observable<void> {
    return this._httpClient.post<void>('pautas', pauta);
  }

  public obterDadosDaPautaPeloProcesso(id: number): Observable<Pauta> {
    return this._httpClient.get<Pauta>(`pautas/${id}`).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

}
