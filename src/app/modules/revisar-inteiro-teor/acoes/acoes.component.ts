import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AlertaService } from '../../services/alerta.service';
import { DocumentoInteiroTeor } from '../../acervo/model/interfaces/documento-inteiro-teor.interface';
import { SessaoJulgamento } from '../../acervo/model/interfaces/sessao-julgamento.interface';
import { Tag } from '../../acervo/model/interfaces/tag.interface';
import { RevisarInteiroTeorService } from '../../services/revisar-inteiro-teor.service';

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
  @Output() todosOsCheckboxSelecionados = new EventEmitter();
  @Output() revisoesAlteradas = new EventEmitter();

  readonly NOME_DO_ALERTA_DESTA_CLASSE = 'alerta_revisar_inteiro_teor';

  constructor(
    private _alertaService: AlertaService,
    private _inteiroTeorService: RevisarInteiroTeorService,
  ) { }

  ngOnInit(): void {
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
