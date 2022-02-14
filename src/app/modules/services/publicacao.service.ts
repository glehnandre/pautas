import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessaoDeJulgamento } from "app/shared/model/interfaces/sessao-julgamento.interface";
import { Observable } from "rxjs";


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
