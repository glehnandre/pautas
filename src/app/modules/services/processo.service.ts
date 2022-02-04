import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY, Subject, BehaviorSubject, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TipoCapitulo } from '../acervo/model/enums/tipoCapitulo.enum';
import { Destaque } from '../acervo/model/interfaces/destaque.interface';
import { Documento } from '../acervo/model/interfaces/documento.interface';
import { Impedimento } from '../acervo/model/interfaces/impedimento.interface';
import { Manifestacao } from '../acervo/model/interfaces/manifestacao.interface';
import { ModeloDecisao } from '../acervo/model/interfaces/modeloDecisao.interface';
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

  public definirRelatorDoProcesso(idProcesso: number, idRelator: number): Observable<string> {
    return this._httpClient.post<string>(`processos/${idProcesso}/relator`, idRelator);
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
    return this._httpClient.post<void>(`processos/${id}/vistas`, vista).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public salvarDestaqueDoProcesso(id: number, destaque: Destaque): Observable<void> {
    return this._httpClient.post<void>(`processos/${id}/destaques`, destaque).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public salvarImpedimentos(id: number, obj: any): Observable<void> {
    return this._httpClient.post<void>(`processos/${id}/impedimentos`, obj).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      }),
    );
  }

  public excluirVistaDoProcesso(id: number, idVista: number): Observable<void> {
    return this._httpClient.delete<void>(`processos/${id}/vistas/${idVista}`).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  
  public atualizarVistasDoProcesso(id: number, idVista: number, vista: Vista): Observable<void> {
    return this._httpClient.put<void>(`processos/${id}/vistas/${idVista}`, vista).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  
  public finalizarSessaoDeJulgamento(numero: number, ano: number, dadosDaSessaoJulgamento: any): Observable<void> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.put<void>(`sessoes-de-julgamento/${numeroAno}/finalizar`, dadosDaSessaoJulgamento).pipe(
      catchError((error) => {
        console.log(error);
        return EMPTY;
      }),
    );
  }

  public atualizarDestaquesDoProcesso(id: number, idDestaque: number, destaque: Destaque): Observable<void> {
    return this._httpClient.put<void>(`processos/${id}/destaques/${idDestaque}`, destaque).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }


  public excluirDestaqueDoProcesso(id: number, idDestaque: number): Observable<void> {
    return this._httpClient.delete<void>(`processos/${id}/destaques/${idDestaque}`).pipe(
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
      descricoes += `${processo.classe} ${processo.numero} ${processo.cadeia}\n`;
    });

    return descricoes;
  }

  public salvarCapitulo(id: number, {capitulo, processos_mesma_decisao}): Observable<void> {
    return this._httpClient.post<void>(`processo/${id}/capitulos`, {
      capitulo,
      processos_mesma_decisao,
    }).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public deletarCapitulo(id: number, id_capitulo: number): Observable<void> {
    return this._httpClient.delete<void>(`processo/${id}/capitulos/${id_capitulo}`).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public salvarModeloDecisao(modelo: ModeloDecisao): Observable<void> {
    return this._httpClient.post<void>(`modelo-decisao`, modelo).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public obterModeloDecisao(classe: string, tipoCapitulo: string, dispositivo: number, recurso: number): Observable<ModeloDecisao> {
    const params = new HttpParams()
      .set('classe', classe)
      .set('tipo_capitulo', tipoCapitulo)
      .set('dispositivo', dispositivo)
      .set('recurso', recurso);

    return this._httpClient.get<ModeloDecisao>(`modelo-decisao`, {
      params,
    });
  }

  public atualizarModeloDecisao(id: number, modelo: ModeloDecisao): Observable<void> {
    return this._httpClient.put<void>(`modelo-decisao/${id}`, modelo).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  public enviarCorrecaoCapitulo(id: number, correcao: any) {
    return this._httpClient.post<any>(`ata/${id}`, correcao).pipe(
      catchError( error => {
        console.error(error);
        return EMPTY;
      })
    );
  }

}
