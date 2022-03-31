import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Documento } from 'app/shared/model/interfaces/documento.interface';
import { Ministro } from 'app/shared/model/interfaces/ministro.interface';

@Component({
  selector: 'digital-tabela-documento',
  templateUrl: './tabela-documento.component.html',
  styleUrls: ['./tabela-documento.component.scss']
})
export class TabelaDocumentoComponent implements OnInit, OnChanges {

  @Input() documentos: Documento[] = [];

  displayedColumns: string[] = ['checkbox', 'nome', 'tipo', 'data_criacao', 'autor', 'status'];
  
  dataSource = new MatTableDataSource<Documento>([]);
  selection = new SelectionModel<Documento>(true, []);

  constructor () {}

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource<Documento>(this.documentos);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
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
  checkboxLabel(row?: Documento): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  public getNomeDosAutores(ministros: Ministro[]): string {
    let nomes = ``;

    for (let i = 0; i < ministros.length; i++) {
      nomes += `${(i+1)}º ${ministros[i].nome}\n`;
    }

    return nomes;
  }
}
