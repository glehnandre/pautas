import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pauta } from '../acervo/model/interfaces/pauta.interface';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { SessaoJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';

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

  public socilitarSessaoExtraordinaria(sessaoExtraordinaria: any): Observable<SessaoJulgamento> {
    let params = new HttpParams();
    params = params.set('extraordinaria', true);

    return this._httpClient.post<SessaoJulgamento>('sessoes-de-julgamento', sessaoExtraordinaria, {
      params,
    });
  }

  public listarSessoesDeJulgamento(numero: number, ano: number): Observable<SessaoJulgamento> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.get<SessaoJulgamento>(`sessoes-de-julgamento/${numeroAno}`).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      }),
    );
  }

  public listarProcessosPautadosNasSessoes(numero: number, ano: number,
      situacao: number, inicio: string, fim: string): Observable<Processo[]> {
    const numeroAno = `${numero}-${ano}`;
    let params = new HttpParams();
    params = params.set('situacao', situacao);
    params = params.set('inicio', inicio);
    params = params.set('fim', fim);

    return this._httpClient.get<Processo[]>(`sessoes-de-julgamento/${numeroAno}/pauta`, {
      params,
    }).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      }),
    );
  }

  public aprovarSessaoDeJulgamento(numero: number, ano: number, resposta: string): Observable<SessaoJulgamento> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.put<SessaoJulgamento>(`sessoes-de-julgamento/${numeroAno}/aprovar`, resposta).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      }),
    );
  }

  public rejeitarSessaoDeJulgamento(numero: number, ano: number, resposta: string): Observable<SessaoJulgamento> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.put<SessaoJulgamento>(`sessoes-de-julgamento/${numeroAno}/rejeitar`, {numeroAno, resposta}).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      }),
    );
  }

}
