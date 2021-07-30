import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Julgamento } from '../acervo/acoes/pautar/pautar.component';

@Injectable({
  providedIn: 'root'
})
export class JulgamentoService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public pautarProcesso(pauta: Julgamento): Observable<void> {
    return this._httpClient.post<void>('julgamentos', pauta);
  }

}
