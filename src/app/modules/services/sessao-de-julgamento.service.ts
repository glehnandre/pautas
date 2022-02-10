import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ata } from '../acervo/model/interfaces/ata.interface';
import { Pauta } from '../acervo/model/interfaces/pauta.interface';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { SessaoDeJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';

@Injectable({
  providedIn: 'root'
})
export class SessaoDeJulgamentoService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public pautarProcesso(pauta: any): Observable<void> {
    return this._httpClient.post<void>('pautas', pauta);
  }

  public obterDadosDaPautaPeloProcesso(id: number): Observable<Pauta> {
    return this._httpClient.get<Pauta>(`pautas/${id}`);
  }

  public socilitarSessaoExtraordinaria(sessaoExtraordinaria: any): Observable<SessaoDeJulgamento> {
    let params = new HttpParams();
    params = params.set('extraordinaria', true);

    return this._httpClient.post<SessaoDeJulgamento>('sessoes-de-julgamento', sessaoExtraordinaria, {
      params,
    });
  }

  public listarSessoesDeJulgamento(numero: number, ano: number): Observable<SessaoDeJulgamento> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.get<SessaoDeJulgamento>(`sessoes-de-julgamento/${numeroAno}`);
  }

  public listarTodasAsSessoesDeJulgamento(): Observable<SessaoDeJulgamento[]> {
    return this._httpClient.get<SessaoDeJulgamento[]>('sessoes-de-julgamento');
  }

  public listarProcessosPautadosNasSessoes(numero: number, ano: number,
      situacao?: number, inicio?: string, fim?: string): Observable<Processo[]> {
    const numeroAno = `${numero}-${ano}`;
    let params = new HttpParams();
    params = params.set('situacao', situacao);
    params = params.set('inicio', inicio);
    params = params.set('fim', fim);

    return this._httpClient.get<Processo[]>(`sessoes-de-julgamento/${numeroAno}/pauta`, {
      params,
    });
  }

  public aprovarSessaoDeJulgamento(numero: number, ano: number, resposta: string): Observable<SessaoDeJulgamento> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.put<SessaoDeJulgamento>(`sessoes-de-julgamento/${numeroAno}/aprovar`, resposta);
  }

  public rejeitarSessaoDeJulgamento(numero: number, ano: number, resposta: string): Observable<SessaoDeJulgamento> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.put<SessaoDeJulgamento>(`sessoes-de-julgamento/${numeroAno}/rejeitar`, {numeroAno, resposta});
  }

  public finalizarSessaoDeJulgamento(numero: number, ano: number, dadosDaSessaoJulgamento: any): Observable<void> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.post<void>(`sessoes-de-julgamento/${numeroAno}/finalizar`, dadosDaSessaoJulgamento);
  }

  public getAta(numero: number, ano:number): Observable<Ata> {
    return this._httpClient.get<Ata>(`sessoes-de-julgamento/${numero}-${ano}/ata`);
  }

}
