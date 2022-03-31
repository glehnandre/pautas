import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentoInteiroTeor } from 'app/shared/model/interfaces/documento-inteiro-teor.interface';

@Component({
  selector: 'digital-dialogo-incluir-documento',
  templateUrl: './dialogo-incluir-documento.component.html',
  styleUrls: ['./dialogo-incluir-documento.component.scss']
})
export class DialogoIncluirDocumentoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public documentos: DocumentoInteiroTeor,
  ) { }

  ngOnInit(): void {
    console.log(this.documentos)
  }

}
