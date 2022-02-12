import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Documento } from 'app/shared/model/interfaces/documento.interface';


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
