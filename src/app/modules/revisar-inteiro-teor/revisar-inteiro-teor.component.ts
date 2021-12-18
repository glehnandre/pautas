import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { DocumentoInteiroTeor } from '../acervo/model/interfaces/documento-inteiro-teor.interface';
import { Documento } from '../acervo/model/interfaces/documento.interface';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { SessaoJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';
import { Tag } from '../acervo/model/interfaces/tag.interface';
import { ProcessoService } from '../services/processo.service';
import { AlertaService } from '../services/alerta.service';
import { RevisarInteiroTeorService } from '../services/revisar-inteiro-teor.service';

export interface RevisaoInteiroTeor {
  id_processo: number;
  status: 'Aberto' | 'Em elaboração' | 'Apto a ser publicado' | 'Publicado' | 'Alterado' | 'Republicado';
  classe: string;
  numero: number;
  nome: string;
  tags: Array<Tag>;
  sessoes: Array<SessaoJulgamento>;
  documentos: Array<DocumentoInteiroTeor>;
}

@Component({
  selector: 'app-revisar-inteiro-teor',
  templateUrl: './revisar-inteiro-teor.component.html',
  styleUrls: ['./revisar-inteiro-teor.component.scss'],
})
export class RevisarInteiroTeorComponent implements OnInit {
  idProcesso: number = 0;
  colegiado: string = '';
  processo: Processo;
  documentosDoProcesso: Documento[];
  revisoes: RevisaoInteiroTeor;
  link: SafeResourceUrl;
  nomesDasSessoes: string[] = [];
  documentoSelecionado: DocumentoInteiroTeor | null = null;

  displayedColumns: string[] = ['autor', 'responsavel', 'comentarios', 'documento', 'data', 'situacao', 'arquivo'];
  dataSource = new DataSourceInteiroTeor([]);
  linhasSelecionadas: DocumentoInteiroTeor[] = [];
  todosOsCheckboxSelecionados = false;

  readonly NOME_DO_ALERTA_DESTA_CLASSE = 'alerta_revisar_inteiro_teor';
  MENSAGEM_SUCESSO = '';

  constructor(
    private _route: ActivatedRoute,
    private _inteiroTeorService: RevisarInteiroTeorService,
    private _processoService: ProcessoService,
    private _alertaService: AlertaService,
    private _sanitize: DomSanitizer,
  ) {
    this.link = this._sanitize.bypassSecurityTrustResourceUrl('');
  }

  ngOnInit(): void {
    this.idProcesso = +this._route.snapshot.queryParamMap.get('id');
    this.colegiado = this._route.snapshot.queryParamMap.get('colegiado')

    this._inteiroTeorService.obterInteiroTeorDoAcordao(this.idProcesso).subscribe({
      next: (revisoes) => {
        this.revisoes = revisoes;
        this.dataSource = new DataSourceInteiroTeor(this.revisoes.documentos);
        this.obterNomesDasSessoes();
        this.MENSAGEM_SUCESSO = `O Inteiro Teor do julgamento do ${this.revisoes?.nome} remontam da ${this.revisoes?.classe} ${this.revisoes?.numero} foi liberado para publicação`;
        console.log(this.revisoes);
      }
    });

    this._processoService.obterDocumentosDoProcesso(this.idProcesso).subscribe({
      next: (documentos) => {
        this.documentosDoProcesso = documentos;
        console.log(this.documentosDoProcesso);
      }
    });
  }

  /**
   * @public
   * @description Publicar o(s) inteiro(s) teor(es) que foram selecionados
   * @author
   */
   public publicarInteiroTeor(): void {
        const ids = this.revisoes.documentos.map((documento) => documento.id);

        this._inteiroTeorService.publicarInteiroTeorDoAcordao(this.idProcesso, ids).subscribe({
            next: (data) => {
                this._alertaService.exibirAlertaDeSucesso();
            }
        });
    }

  atualizarConteudo(revisao: RevisaoInteiroTeor): void {
    this.revisoes = revisao;

    this.dataSource = new DataSourceInteiroTeor(this.revisoes.documentos);
  }

  /**
   * @public Método público
   * @description Atualiza o valor do link para acionar o visualizador pdf
   * @param link String que contém o link referente ao PDF
   * @author Douglas da Silva Monteles
   */
  public abrirPdf(link: string): void {
    this.link = this._sanitize.bypassSecurityTrustResourceUrl(link);
  }

  /**
   * @public Método público
   * @description Percorre a lista de sessões, criando uma nova lista de string
   *              com os nomes das sessões formatados
   * @author Douglas da Silva Monteles
   */
  public obterNomesDasSessoes(): void {
    const nomes: string[] = [];

    this.revisoes.sessoes.forEach(({tipo, numero, ano, data_fim}) => {
      let dadosDaSessao: string;
      let dataFim = new Date(data_fim);

      if (this._comparaDatas(new Date(), dataFim)) {
        dadosDaSessao = `Sessão ${tipo} ${numero}/${ano}`;
      } else {
        dadosDaSessao = `Sessão ${tipo} ${numero}/${ano} - Finalizada dia ${dataFim.toLocaleDateString()}`;
      }

      nomes.push(dadosDaSessao);
    });

    this.nomesDasSessoes = nomes;
  }

  /**
   * @public Método público
   * @description Método para registar os dados de uma linha da tabela que foi
   *              selecionada via checkbox em uma lista ou remove-lo da  lista
   *              caso já tenha sido selecionado
   * @param linha Possui os dados da linha da tabela
   * @author Douglas da Silva Monteles
   */
  public selecionarOuDeselecionarLinha(linha: DocumentoInteiroTeor): void {
    const index = this.linhasSelecionadas
      .findIndex(documento => this._converterObjParaString(documento) === this._converterObjParaString(linha));

    if (index === -1) { // Se a linha ainda não foi selecionada
      this.linhasSelecionadas.push(linha);
    } else {
      this.linhasSelecionadas.splice(index, 1);
    }
  }

  /**
   * @public Método público
   * @description Seleciona ou deseleciona todas as linhas da tabela e as regista
   *              na lista
   * @author Douglas da Silva Monteles
   */
  public selecionarOuDeselecionarTodosOsCheckbox(): void {
    this.todosOsCheckboxSelecionados = !this.todosOsCheckboxSelecionados;
    this.linhasSelecionadas = [];

    if (this.todosOsCheckboxSelecionados) {
      this.linhasSelecionadas = [...this.revisoes.documentos];
    }
  }

  /**
   * @private
   * @description Recebe um objeto e o converte para string
   * @param obj
   * @returns Retorna objeto convertido em string
   * @author Douglas da Silva Monteles
   */
  private _converterObjParaString(obj: any): string {
    return JSON.stringify(obj);
  }

  /**
   * @private Método privado
   * @description Verifica se a data final é maior que a data inicial
   * @param dataInicial
   * @param dataFinal
   * @returns Retorna true caso a dataFinal seja maior que a dataInicial e
   *          false, caso contrário
   * @author Douglas da Silva Monteles
   */
  private _comparaDatas(dataInicial: Date, dataFinal: Date): boolean {
    return dataFinal > dataInicial;
  }
}

export class DataSourceInteiroTeor extends DataSource<DocumentoInteiroTeor> {
  data: BehaviorSubject<DocumentoInteiroTeor[]>;

  constructor(
    private readonly ELEMENT_DATA: DocumentoInteiroTeor[],
  ) {
    super();
    this.data = new BehaviorSubject<DocumentoInteiroTeor[]>(this.ELEMENT_DATA);
  }

  /**
   * @public Método público
   * @description Monitora as mudanças que ocorrem no data
   * @returns Retorna uma lista de DocumentoInteiroTeor
   * @author Douglas da Silva Monteles
   */
  public connect(): Observable<DocumentoInteiroTeor[]> {
    return this.data;
  }

  /**
   * @public Método público
   * @description Para de monitorar as mudanças na lista
   * @author Douglas da Silva Monteles
   */
  public disconnect() {
    this.data.unsubscribe();
  }
}
