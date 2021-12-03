import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { BehaviorSubject, Observable } from 'rxjs';
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
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss'],
  animations: fuseAnimations
})
export class TabelaComponent implements OnInit {
  @Input() dataSource: DataSourceInteiroTeor;
  @Input() revisoes: RevisaoInteiroTeor;
  @Input() todosOsCheckboxSelecionados: boolean;
  @Input() idProcesso: number;
  @Input() documentosRevisados: number[];
  @Output() checked = new EventEmitter();
  @Output() link = new EventEmitter();
  displayedColumns: string[] = ['autor', 'responsavel', 'comentarios', 'documento', 'data', 'situacao', 'arquivo'];

  documentoSelecionado: DocumentoInteiroTeor | null = null;
  editarDocumentoForm: FormGroup;

  constructor(
    private _inteiroTeorService: RevisarInteiroTeorService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.editarDocumentoForm = this._formBuilder.group({
        id                   : [''],
        arquivo              : [''],
        autores              : [''],
        responsavel          : [''],
        comentario           : [''],
        nome                 : [''],
        data_criacao         : [''],
        situacao             : [''],
        revisado             : [''],
        ordem                : [''],
    });
  }

  emiteStatusDoCheckbox(documento: DocumentoInteiroTeor): void {
    this.checked.emit(documento);
  }

  emiteLink(arquivo: string): void {
    this.link.emit(arquivo);
  }

  /**
    * Alternar edição do documento
    *
    * @param documento
    */
  alternarEdicaoDocumento(documento: DocumentoInteiroTeor): void {
    if (this.documentoSelecionado && this.documentoSelecionado.id === documento.id) {
        this.fecharEdicaoDocumento();
        return;
    }

    this.documentoSelecionado = documento;
    this.editarDocumentoForm.patchValue(documento);
  }

  fecharEdicaoDocumento(): void {
    this.documentoSelecionado = null;
  }

  atualizarDocumento(): void {
      const documentoEditado = this.editarDocumentoForm.getRawValue();

      this.revisoes.documentos = this.revisoes.documentos.map((documento) => {
          if (documento.id === documentoEditado.id) {
              documento = documentoEditado;
          }
          return documento;
      })

      this._inteiroTeorService.atualizarDocumentoDoInteiroTeor(this.idProcesso, this.revisoes.documentos).subscribe({
          next: (data) => {
              this.revisoes = data;
              this.dataSource = new DataSourceInteiroTeor(this.revisoes.documentos);
          }
      });

      this.fecharEdicaoDocumento();
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

  atualizaOrdem(): void {
    for (var i = 0; i < this.revisoes?.documentos?.length; i++) {
        this.revisoes.documentos[i].ordem = i + 1;
    }
  }

  drop(event: CdkDragDrop<DataSourceInteiroTeor[]>): void {
    moveItemInArray(this.revisoes.documentos, event.previousIndex, event.currentIndex);

    this.atualizaOrdem();

    this.dataSource = new DataSourceInteiroTeor(this.revisoes.documentos);

    this._inteiroTeorService.atualizarDocumentoDoInteiroTeor(this.idProcesso, this.revisoes.documentos).subscribe();
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
