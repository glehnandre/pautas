import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertaService } from '../../services/alerta.service';
import { DocumentoInteiroTeor } from '../../acervo/model/interfaces/documento-inteiro-teor.interface';
import { SessaoJulgamento } from '../../acervo/model/interfaces/sessao-julgamento.interface';
import { Tag } from '../../acervo/model/interfaces/tag.interface';
import { Documento } from '../../acervo/model/interfaces/documento.interface';
import { RevisarInteiroTeorService } from '../../services/revisar-inteiro-teor.service';
import { IncluirDocumentoComponent } from './incluir-documento/incluir-documento.component';

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
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.scss']
})
export class AcoesComponent implements OnInit {

  @Input() linhasSelecionadas: DocumentoInteiroTeor[];
  @Input() idProcesso: number;
  @Input() documentosDoProcesso: Documento[];
  @Input() documentosInteiroTeor: DocumentoInteiroTeor[];
  @Output() todosOsCheckboxSelecionados = new EventEmitter();
  @Output() revisoesAlteradas = new EventEmitter();

  readonly NOME_DO_ALERTA_DESTA_CLASSE = 'alerta_revisar_inteiro_teor';

  constructor(
    private _matDialog: MatDialog,
    private _alertaService: AlertaService,
    private _inteiroTeorService: RevisarInteiroTeorService,
  ) { }

  ngOnInit(): void {
  }

  public visualizarInteiroTeor(): void {
    console.log("visualizar");
  }

  /**
   * @public Método público
   * @description Seleciona ou deseleciona todas as linhas da tabela e as regista
   *              na lista
   * @author Douglas da Silva Monteles
   */
   public selecionarOuDeselecionarTodosOsCheckbox(): void {
    this.todosOsCheckboxSelecionados.emit();
   }

    /**
   * @public
   * @description Remove o(s) inteiro(s) teor(es) que foram selecionados
   * @author
   */
  public removerInteiroTeor(): void {
    if (this._isAlgumaLinhaSelecionada()) {
      const ids = this.linhasSelecionadas.map((linha) => linha.id)

      this._inteiroTeorService.removerDocumentosDoInteiroTeorDoProcesso(this.idProcesso, ids).subscribe({
          next: (data) => {
            this.revisoesAlteradas.emit(data);
          }
      })
    }
  }

  /**
   * @public
   * @description Inclue no(s) inteiro(s) teor(es) que foram selecionados novos
   *              documentos
   * @author
   */
   public incluirNovoDocumento(): void {
      const idsDocumentosInteiroTeor = this.documentosInteiroTeor.map(documento => documento.id);

      const documentosNaoIncluidos = this.documentosDoProcesso.filter(documento => !idsDocumentosInteiroTeor.includes(documento.id));

      const dialogRef = this._matDialog.open(IncluirDocumentoComponent, {
          maxHeight: '560px',
          data: documentosNaoIncluidos,
      });

      dialogRef.afterClosed().subscribe((data: number[]) => {
        this._inteiroTeorService.incluirDocumentosDoInteiroTeorDoProcesso(this.idProcesso, data).subscribe({
            next: (data) => {
                this.revisoesAlteradas.emit(data);
            }
        })
      });
  }

  /**
   * @public
   * @description Registra o(s) inteiro(s) teor(es) que foram selecionados como
   *              revisados
   * @author
   */
  public revisar(): void {
    if (this._isAlgumaLinhaSelecionada()) {
        const idsDocumentosSelecionados = this.linhasSelecionadas.map(documento => documento.id);

        const documentosModificados = this.documentosInteiroTeor.map(documento => {
            if (idsDocumentosSelecionados.includes(documento.id)) {
                documento.revisado = !documento.revisado;
            }

            return documento;
        })

        this._inteiroTeorService.atualizarDocumentoDoInteiroTeor(this.idProcesso, documentosModificados).subscribe({
            next: (data) => {
                this.revisoesAlteradas.emit(data);
            }
        });
    }
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
