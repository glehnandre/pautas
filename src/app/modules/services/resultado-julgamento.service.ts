import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadoJulgamentoService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public listarDecisoes(processo: string = 'ADI100'): Observable<any[]> {
    return this._httpClient.get<any[]>(`/decisao/${processo}`);
  }

}
