import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Processo } from 'app/shared/model/interfaces/processo.interface';
import { ProcessoService } from 'app/modules/services/processo.service';
import { StatusProcesso } from 'app/modules/acervo/tabela/status/situacaoProcesso';

@Component({
  selector: 'digital-tabela-processos',
  templateUrl: './tabela-processos.component.html',
  styleUrls: ['./tabela-processos.component.scss']
})
export class TabelaProcessosComponent implements OnInit, OnChanges {

  @Input() processos: Processo[] = [];

  @Output() processosSelecionados = new EventEmitter<Processo[]>();

  displayedColumns: string[] = ['checkbox', 'processo', 'relator', 'indicacao', 'situacao'];
  dataSource = new MatTableDataSource<Processo>([]);
  selection = new SelectionModel<Processo>(true, []);

  constructor (
    private _processoService: ProcessoService,
  ) {}

  ngOnInit(): void { 
    this.selection.changed.subscribe(() => {
      this.processosSelecionados.emit(this.selection.selected);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.processos) {
      this.getSituacao();
      this.dataSource = new MatTableDataSource<Processo>(this.processos);
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Processo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  public getSituacao(): void {
    this.processos?.map(p => {
      this._processoService.obterStatusDoProcesso(p.id).subscribe({
        next: (status) => {
          p.situacao = status as any;
        }
      });
    });
  }

}
