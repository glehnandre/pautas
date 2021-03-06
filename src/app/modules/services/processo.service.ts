import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY, Subject, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TipoCapitulo } from '../acervo/model/enums/tipoCapitulo.enum';
import { Destaque } from '../acervo/model/interfaces/destaque.interface';
import { Documento } from '../acervo/model/interfaces/documento.interface';
import { Impedimento } from '../acervo/model/interfaces/impedimento.interface';
import { Manifestacao } from '../acervo/model/interfaces/manifestacao.interface';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { Tag } from '../acervo/model/interfaces/tag.interface';
import { Vista } from '../acervo/model/interfaces/vista.interface';
import { Voto } from '../acervo/model/interfaces/voto.interface';
import { StatusProcesso } from '../acervo/tabela/status/situacaoProcesso';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  // Informa se os processos precisam ser carregados novamente
  private isCarregarProcessos: Subject<boolean> = new Subject<boolean>();
  private processosSelecionados = new BehaviorSubject<Processo[]>([]);

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public listarProcessos(params?: HttpParams): Observable<Processo[]> {
    return this._httpClient.get<Processo[]>('processos', {
      params
    }).pipe(
      catchError((error) => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public reanalizarProcesso(id: number, body: {descricao: string; data: string}): Observable<void> {
    return this._httpClient.post<void>(`/processos/${id}/reanalisar`, body);
  }

  public obterStatusDoProcesso(id: number): Observable<StatusProcesso> {
    return this._httpClient.get<StatusProcesso>(`processos/${id}/situacao`)
      .pipe(
        catchError((error) => {
          console.log(error);
          return EMPTY;
        })
      );
  }

  public obterDocumentosDoProcesso(id: number): Observable<Documento[]> {
    return this._httpClient.get<Documento[]>(`julgamento/processos/${id}/documentos`)
      .pipe(
        catchError((error) => {
          console.log(error);
          return EMPTY;
        })
      );
  }

  public obterImpedimentosDoMinistro(processo: number, ministro: string): Observable<Impedimento[]> {
    return this._httpClient.get<Impedimento[]>(`processos/${processo}/impedimentos/${ministro}`)
      .pipe(
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      );
  }

  public recuperarTagsDaApi(): Observable<Tag[]> {
    return this._httpClient.get<Tag[]>('tags').pipe(
      catchError((error) => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public obterVotosDoProcesso(processo: number): Observable<Voto[]> {
    return this._httpClient.get<Voto[]>(`processos/${processo}/votos`).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public definirRelatorDoProcesso(idProcesso: number, idRelator: number): Observable<void> {
    return this._httpClient.post<void>(`processos/${idProcesso}/relator`, idRelator).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public obterTiposDoProcesso(): Observable<string[]> {
    return this._httpClient.get<string[]>(`processos/tipos`).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public salvarVistaDoProcesso(id: number, vista: Vista): Observable<void> {
    return this._httpClient.post<void>(`processos/${id}/vista`, vista).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public salvarDestaqueDoProcesso(id: number, destaque: Destaque): Observable<void> {
    return this._httpClient.post<void>(`processos/${id}/destaque`, destaque).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public setCarregarProcessos(carregarProcessos: boolean): void {
    this.isCarregarProcessos.next(carregarProcessos);
  }

  public isCarregarProcesso(): Subject<boolean> {
    return this.isCarregarProcessos;
  }

  public obterProcessosSelecionados(): Observable<Processo[]> {
    return this.processosSelecionados.asObservable();
  }

  public setProcessosSelecionados(processos: Processo[]): void {
    this.processosSelecionados.next(processos);
  }

  public exibeDescricaoDosProcessos(processos: Processo[]): string {
    let descricoes = '';

    processos.forEach((processo) => {
      descricoes += `${processo.classe} ${processo.numero} ${processo.nome}\n`;
    });

    return descricoes;
  }

}
