import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentoInteiroTeor } from 'app/shared/model/interfaces/documento-inteiro-teor.interface';
import { DialogoAdicionarDocumentoComponent } from './dialogo-adicionar-documento/dialogo-adicionar-documento.component';

@Component({
  selector: 'digital-dialogo-incluir-documento',
  templateUrl: './dialogo-incluir-documento.component.html',
  styleUrls: ['./dialogo-incluir-documento.component.scss']
})
export class DialogoIncluirDocumentoComponent implements OnInit {

  constructor(
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public documentos: DocumentoInteiroTeor,
  ) { }

  ngOnInit(): void {
    console.log(this.documentos)
  }

  public modalDeAdicionarDocumento(): void {
    const dialogRef = this._dialog.open(DialogoAdicionarDocumentoComponent, {});

    dialogRef.afterClosed().subscribe(data => {});
  }

}
