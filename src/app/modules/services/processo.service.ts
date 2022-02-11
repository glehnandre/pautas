import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { TipoCapitulo } from '../acervo/model/enums/tipoCapitulo.enum';
import { Capitulo } from '../acervo/model/interfaces/capitulo.interface';
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

  public listarProcessos(processo?: number): Observable<Processo[]> {
    let params = new HttpParams();
    
    if (processo) {
      params = params.set("processo", processo);
    }

    return this._httpClient.get<Processo[]>('processos', {
      params
    });
  }

  public reanalizarProcesso(id: number, body: {descricao: string; data: string}): Observable<void> {
    return this._httpClient.post<void>(`/processos/${id}/reanalisar`, body);
  }

  public obterStatusDoProcesso(id: number): Observable<StatusProcesso> {
    return this._httpClient.get<StatusProcesso>(`processos/${id}/situacao`);
  }

  public obterDocumentosDoProcesso(id: number): Observable<Documento[]> {
    return this._httpClient.get<Documento[]>(`julgamento/processos/${id}/documentos`);
  }

  public obterImpedimentosDoMinistro(processo: number, ministro: string): Observable<Impedimento[]> {
    return this._httpClient.get<Impedimento[]>(`processos/${processo}/impedimentos/${ministro}`);
  }

  public recuperarTagsDaApi(): Observable<Tag[]> {
    return this._httpClient.get<Tag[]>('tags');
  }

  public obterVotosDoProcesso(processo: number): Observable<Voto[]> {
    return this._httpClient.get<Voto[]>(`processos/${processo}/votos`);
  }

  public definirRelatorDoProcesso(idProcesso: number, idRelator: number): Observable<string> {
    return this._httpClient.post<string>(`processos/${idProcesso}/relator`, idRelator);
  }

  public obterTiposDoProcesso(): Observable<string[]> {
    return this._httpClient.get<string[]>(`processos/tipos`);
  }

  public salvarVistaDoProcesso(id: number, vista: Vista): Observable<void> {
    return this._httpClient.post<void>(`processos/${id}/vistas`, vista);
  }

  public salvarDestaqueDoProcesso(id: number, destaque: Destaque): Observable<void> {
    return this._httpClient.post<void>(`processos/${id}/destaques`, destaque);
  }

  public salvarImpedimentos(id: number, obj: any): Observable<void> {
    return this._httpClient.post<void>(`processos/${id}/impedimentos`, obj);
  }

  public excluirVistaDoProcesso(id: number, idVista: number): Observable<void> {
    return this._httpClient.delete<void>(`processos/${id}/vistas/${idVista}`);
  }

  
  public atualizarVistasDoProcesso(id: number, idVista: number, vista: Vista): Observable<void> {
    return this._httpClient.put<void>(`processos/${id}/vistas/${idVista}`, vista);
  }

  
  public finalizarSessaoDeJulgamento(numero: number, ano: number, dadosDaSessaoJulgamento: any): Observable<void> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.put<void>(`sessoes-de-julgamento/${numeroAno}/finalizar`, dadosDaSessaoJulgamento);
  }

  public atualizarDestaquesDoProcesso(id: number, idDestaque: number, destaque: Destaque): Observable<void> {
    return this._httpClient.put<void>(`processos/${id}/destaques/${idDestaque}`, destaque);
  }


  public excluirDestaqueDoProcesso(id: number, idDestaque: number): Observable<void> {
    return this._httpClient.delete<void>(`processos/${id}/destaques/${idDestaque}`);
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

  public salvarCapitulo(id: number, {capitulo, processos_mesma_decisao}): Observable<Capitulo[]> {
    return this._httpClient.post<Capitulo[]>(`processo/${id}/capitulos`, {
      capitulo,
      processos_mesma_decisao,
    });
  }

  public excluirCapitulo(id: number, id_capitulo: number): Observable<Capitulo[]> {
    return this._httpClient.delete<Capitulo[]>(`processo/${id}/capitulos/${id_capitulo}`);
  }

  public salvarModeloDecisao(modelo: ModeloDecisao): Observable<void> {
    return this._httpClient.post<void>(`modelo-decisao`, modelo);
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
    return this._httpClient.put<void>(`modelo-decisao/${id}`, modelo);
  }

  public enviarCorrecaoCapitulo(id: number, correcao: any) {
    return this._httpClient.post<any>(`ata/${id}`, correcao);
  }

}
