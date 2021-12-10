import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Documento } from '../../../acervo/model/interfaces/documento.interface';

@Component({
  selector: 'app-incluir-documento',
  templateUrl: './incluir-documento.component.html',
  styleUrls: ['./incluir-documento.component.scss']
})
export class IncluirDocumentoComponent implements OnInit {
  dataSource: MatTableDataSource<Documento>;
  documentosSelecionados: number[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private _documentos: Documento[],
    public dialogRef: MatDialogRef<IncluirDocumentoComponent>,
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this._documentos);
  }

  abrirPdf(url: string): void {
    this.dialogRef.close(url);
  }

  marcarOuDesmarcarDocumento(documento: Documento): void {
    const index = this.documentosSelecionados.findIndex(m => m === documento.id);

    if (index !== -1) {
        this.documentosSelecionados.splice(index, 1);
    } else {
        this.documentosSelecionados.push(documento.id);
    }
  }

  incluirDocumentos(): void {
    this.dialogRef.close(this.documentosSelecionados);
  }
}
