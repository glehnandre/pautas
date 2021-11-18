import { DataSource } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { BehaviorSubject, Observable } from 'rxjs';
import { DocumentoInteiroTeor } from '../acervo/model/interfaces/documento-inteiro-teor.interface';
import { Documento } from '../acervo/model/interfaces/documento.interface';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { SessaoJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';
import { Tag } from '../acervo/model/interfaces/tag.interface';
import { AlertaService } from '../services/alerta.service';
import { ProcessoService } from '../services/processo.service';
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
  animations: fuseAnimations
})
export class RevisarInteiroTeorComponent implements OnInit {

  @ViewChild(MatSort) private _sort: MatSort;

  idProcesso: number = 0;
  colegiado: string = '';
  processo: Processo;
  documentosDoProcesso: Documento[];
  revisoes: RevisaoInteiroTeor;
  link: SafeResourceUrl;
  nomesDasSessoes: string[] = [];
  editarDocumentoForm: FormGroup;
  documentoSelecionado: DocumentoInteiroTeor | null = null;

  displayedColumns: string[] = ['autor', 'responsavel', 'comentarios', 'documento', 'data', 'situacao', 'arquivo'];
  dataSource = new DataSourceInteiroTeor([]);
  linhasSelecionadas: DocumentoInteiroTeor[] = [];
  todosOsCheckboxSelecionados = false;

  readonly NOME_DO_ALERTA_DESTA_CLASSE = 'alerta_revisar_inteiro_teor';

  constructor(
    private _route: ActivatedRoute,
    private _inteiroTeorService: RevisarInteiroTeorService,
    private _processoService: ProcessoService,
    private _sanitize: DomSanitizer,
    private _formBuilder: FormBuilder,
    private _alertaService: AlertaService,
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
        console.log(this.revisoes);
      }
    });

    this._processoService.obterDocumentosDoProcesso(this.idProcesso).subscribe({
      next: (documentos) => {
        this.documentosDoProcesso = documentos;
        console.log(this.documentosDoProcesso);
      }
    });

    this.editarDocumentoForm = this._formBuilder.group({
        situacao             : [''],
        nome                 : [''],
        comentario           : [''],
        observacao           : [''],
    });
  }

    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    ordenar(sort: Sort) {
        const data = this.revisoes.documentos;

        if (!sort.active || sort.direction === '') {
            this.dataSource = new DataSourceInteiroTeor(data);
            return;
        }

        this.dataSource = new DataSourceInteiroTeor(this.revisoes.documentos.sort((a, b) => {
            const isAsc = sort.direction === 'asc';

            switch (sort.active) {
                case 'autor':
                    return this.compare(a.ordem, b.ordem, isAsc);
                case 'responsavel':
                    return this.compare(a.responsavel.abreviacao, b.responsavel.abreviacao, isAsc);
                case 'comentarios':
                    return this.compare(a.comentario, b.comentario, isAsc);
                case 'documento':
                    return this.compare(a.nome, b.nome, isAsc);
                case 'data':
                    return this.compare(a.data_criacao, b.data_criacao, isAsc);
                case 'situacao':
                    return this.compare(a.situacao, b.situacao, isAsc);
                default:
                    return 0;
            }
    }));
    }

    drop(event: CdkDragDrop<DataSourceInteiroTeor[]>) {
        moveItemInArray(this.revisoes.documentos, event.previousIndex, event.currentIndex);
        this.dataSource = new DataSourceInteiroTeor(this.revisoes.documentos)
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
    * Alternar edição do documento
    *
    * @param documento
    */
    alternarEdicaoDocumento(documento: DocumentoInteiroTeor): void {
        if (this.documentoSelecionado && this.documentoSelecionado.ordem === documento.ordem) {
            this.fecharEdicaoDocumento();
            return;
        }

        this.documentoSelecionado = documento;
        this.editarDocumentoForm.patchValue(documento);
    }

    fecharEdicaoDocumento(): void {
        this.documentoSelecionado = null;
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
   * @public
   * @description Publicar o(s) inteiro(s) teor(es) que foram selecionados
   * @author
   */
   public publicarInteiroTeor(): void {
    if (this._isAlgumaLinhaSelecionada()) {
      console.log('remover');
    }
  }

  /**
   * @public
   * @description Remove o(s) inteiro(s) teor(es) que foram selecionados
   * @author
   */
  public removerInteiroTeor(): void {
    if (this._isAlgumaLinhaSelecionada()) {
      console.log('remover');
    }
  }

  /**
   * @public
   * @description Inclue no(s) inteiro(s) teor(es) que foram selecionados novos
   *              documentos
   * @author
   */
   public incluirNovoDocumento(): void {
    if (this._isAlgumaLinhaSelecionada()) {
      console.log('incluir novo doc');
    }
  }

  /**
   * @public
   * @description Inclue no(s) inteiro(s) teor(es) que foram selecionados novos
   *              comentários
   * @author
   */
   public incluirComentario(): void {
    if (this._isAlgumaLinhaSelecionada()) {
      console.log('incluir comentários');
    }
  }

  /**
   * @public
   * @description Registra o(s) inteiro(s) teor(es) que foram selecionados como
   *              revisados
   * @author
   */
   public revisar(): void {
    if (this._isAlgumaLinhaSelecionada()) {
      console.log('revisado');
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

  /**
   * @private Método privado
   * @description Verifica se a lista de DocumentoInteiroTeor possui algum elemento
   * @returns true caso a lista de DocumentoInteiroTeor tenha tamanho maior que
   *          0 e false caso contrário
   * @author Douglas da Silva Monteles
   */
  private _isAlgumaLinhaSelecionada(): boolean {
    if (this.linhasSelecionadas.length > 0) {
      return true;
    } else {
      this._alertaService.exibirAlerta(this.NOME_DO_ALERTA_DESTA_CLASSE);
      return false;
    }
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
