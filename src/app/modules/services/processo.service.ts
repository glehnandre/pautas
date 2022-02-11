import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Capitulo } from '../acervo/model/interfaces/capitulo.interface';
import { Destaque } from '../acervo/model/interfaces/destaque.interface';
import { Documento } from '../acervo/model/interfaces/documento.interface';
import { Impedimento } from '../acervo/model/interfaces/impedimento.interface';
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

  public obterTiposDoProcesso(): Observable<string[]> {
    return this._httpClient.get<string[]>(`processos/tipos`);
  }

  public definirRelatorDoProcesso(numero: number, ano: number, idProcesso: number, idRelator: number): Observable<string> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.post<string>(`sessao-de-julgamento/${numeroAno}/processos/${idProcesso}/relator`, idRelator);
  }

  public salvarVistaDoProcesso(numero: number, ano: number, id: number, vista: Vista): Observable<void> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.post<void>(`sessao-de-julgamento/${numeroAno}/processos/${id}/vistas`, vista);
  }

  public salvarDestaqueDoProcesso(numero: number, ano: number, id: number, destaque: Destaque): Observable<void> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.post<void>(`sessao-de-julgamento/${numeroAno}/processos/${id}/destaques`, destaque);
  }

  public salvarImpedimentos(numero: number, ano: number, id: number, obj: any): Observable<void> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.post<void>(`sessao-de-julgamento/${numeroAno}/processos/${id}/impedimentos`, obj);
  }

  public excluirVistaDoProcesso(numero: number, ano: number, id: number, idVista: number): Observable<void> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.delete<void>(`sessao-de-julgamento/${numeroAno}/processos/${id}/vistas/${idVista}`);
  }

  
  public atualizarVistasDoProcesso(numero: number, ano: number, id: number, idVista: number, vista: Vista): Observable<void> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.put<void>(`sessao-de-julgamento/${numeroAno}/processos/${id}/vistas/${idVista}`, vista);
  }

  public finalizarJulgamentoProcesso(numero: number, ano: number, processo: Processo): Observable<string> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.post<string>(`sessao-de-julgamento/${numeroAno}/processos/${processo.id}/finalizar-julgamento`, processo);
  }

  
  public finalizarSessaoDeJulgamento(numero: number, ano: number, dadosDaSessaoJulgamento: any): Observable<void> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.put<void>(`sessoes-de-julgamento/${numeroAno}/finalizar`, dadosDaSessaoJulgamento);
  }

  public listarProcessoJulgamento(processo: number, numero: number, ano: number): Observable<Processo> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.get<Processo>(`sessao-de-julgamento/${numeroAno}/processos/${processo}`);
  }

  public atualizarDestaquesDoProcesso(numero: number, ano: number, id: number, idDestaque: number, destaque: Destaque): Observable<void> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.put<void>(`sessao-de-julgamento/${numeroAno}/processos/${id}/destaques/${idDestaque}`, destaque);
  }


  public excluirDestaqueDoProcesso(numero: number, ano: number, id: number, idDestaque: number): Observable<void> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.delete<void>(`sessao-de-julgamento/${numeroAno}/processos/${id}/destaques/${idDestaque}`);
  }

  
  public salvarCapitulo(numero: number, ano: number, id: number, {capitulo, processos_mesma_decisao}): Observable<Capitulo[]> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.post<Capitulo[]>(`sessao-de-julgamento/${numeroAno}/processos/${id}/capitulos`, {
      capitulo,
      processos_mesma_decisao,
    });
  }

  public excluirCapitulo(numero: number, ano: number, id: number, id_capitulo: number): Observable<Capitulo[]> {
    const numeroAno = `${numero}-${ano}`;
    return this._httpClient.delete<Capitulo[]>(`sessao-de-julgamento/${numeroAno}/processos/${id}/capitulos/${id_capitulo}`);
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

  public salvarModeloDecisao(modelo: ModeloDecisao): Observable<ModeloDecisao> {
    return this._httpClient.post<ModeloDecisao>(`modelo-decisao`, modelo);
  }

  public obterModeloDecisao(classe: string, tipoCapitulo: string, dispositivo: number, recurso: number): Observable<ModeloDecisao> {
    const params = new HttpParams()
      .set('classe', classe)
      .set('tipo_capitulo', tipoCapitulo)
      .set('dispositivo', dispositivo)
      .set('recurso', recurso);
    console.log("PARAMS PARA MODELO DE DECISAO");
    console.log(params);
    return this._httpClient.get<ModeloDecisao>(`modelo-decisao`, {
      params,
    });
  }

  public atualizarModeloDecisao(id: number, modelo: ModeloDecisao): Observable<ModeloDecisao> {
    return this._httpClient.put<ModeloDecisao>(`modelo-decisao/${id}`, modelo);
  }

  public enviarCorrecaoCapitulo(id: number, correcao: any) {
    return this._httpClient.post<any>(`ata/${id}`, correcao);
  }

}
