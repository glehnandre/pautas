import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSelectChange } from "@angular/material/select";
import { AlertaService } from "app/modules/services/alerta.service";
import { RevisarInteiroTeorService } from "app/modules/services/revisar-inteiro-teor.service";
import { DocumentoInteiroTeor } from "app/shared/model/interfaces/documento-inteiro-teor.interface";
import { Documento } from "app/shared/model/interfaces/documento.interface";
import { SessaoDeJulgamento } from "app/shared/model/interfaces/sessao-julgamento.interface";
import { Tag } from "app/shared/model/interfaces/tag.interface";
import { IncluirDocumentoComponent } from "./incluir-documento/incluir-documento.component";


export interface RevisaoInteiroTeor {
    id_processo: number;
    status: 'Aberto' | 'Em elaboração' | 'Apto a ser publicado' | 'Publicado' | 'Alterado' | 'Republicado';
    classe: string;
    numero: number;
    nome: string;
    tags: Array<Tag>;
    sessoes: Array<SessaoDeJulgamento>;
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
  @Output() publicacao = new EventEmitter();

  errorMessage: string;

  readonly NOME_DO_ALERTA_DESTA_CLASSE = 'alerta_revisar_inteiro_teor';

  constructor(
    private _matDialog: MatDialog,
    private _alertaService: AlertaService,
    private _inteiroTeorService: RevisarInteiroTeorService,
  ) { }

  ngOnInit(): void {
  }

  public selecionarAcaoCorrespondente(event: MatSelectChange): void {
    const { value } = event;

    switch (value) {
        case 'visualizar':
            this.visualizarInteiroTeor();
            break;
        case 'incluir':
            this.incluirNovoDocumento();
            break;
        case 'remover':
            this.removerInteiroTeor();
            break;
        case 'revisar':
            this.revisar();
            break;
    }
  }

  public visualizarInteiroTeor(): void {
    this.publicacao.emit();
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
      const idsDocumentosRemovidos = this.linhasSelecionadas.map((linha) => {
          if (linha.documento.status === "Removido") {
            return linha.id;
          }
      });

      const idsDocumentosAssinados = this.linhasSelecionadas.map((linha) => {
          if (linha.documento.status !== "Removido") {
              return linha.id;
          }
      })

      const documentosModificados = this.documentosInteiroTeor.map(documento => {
            if (idsDocumentosRemovidos.includes(documento.id)) {
                documento.documento.status = "Assinado";
            }

            return documento;
      })

      this._inteiroTeorService.atualizarDocumentoDoInteiroTeor(this.idProcesso, documentosModificados).subscribe({
            next: (data) => {
                this.revisoesAlteradas.emit(data);
            },
            error: (error) => {
            console.log(error);
            this.errorMessage = error.message
            this._alertaService.exibirAlerta("Error");
            }
        });

      this._inteiroTeorService.removerDocumentosDoInteiroTeorDoProcesso(this.idProcesso, idsDocumentosAssinados).subscribe({
          next: (data) => {
            this.revisoesAlteradas.emit(data);
          },
          error: (error) => {
            console.log(error);
            this.errorMessage = error.message
            this._alertaService.exibirAlerta("Error");
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
      const idsDocumentosInteiroTeor = this.documentosInteiroTeor?.map(documento => documento.id);

      const documentosNaoIncluidos = this.documentosDoProcesso?.filter(documento => !idsDocumentosInteiroTeor?.includes(documento.id));

      const dialogRef = this._matDialog.open(IncluirDocumentoComponent, {
          maxHeight: '560px',
          data: documentosNaoIncluidos,
      });

      dialogRef.afterClosed().subscribe((data: number[]) => {
          if (data) {
            this._inteiroTeorService.incluirDocumentosDoInteiroTeorDoProcesso(this.idProcesso, data).subscribe({
                next: (data) => {
                    this.revisoesAlteradas.emit(data);
                },
                error: (error) => {
                  console.log(error);
                  this.errorMessage = error.message
                  this._alertaService.exibirAlerta("Error");
                }
            })
          }
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
            },
            error: (error) => {
              console.log(error);
              this.errorMessage = error.message
              this._alertaService.exibirAlerta("Error");
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
