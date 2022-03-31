import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacaoComponent } from 'app/shared/dialogo-confirmacao/dialogo-confirmacao.component';

@Component({
  selector: 'digital-dialogo-adicionar-documento',
  templateUrl: './dialogo-adicionar-documento.component.html',
  styleUrls: ['./dialogo-adicionar-documento.component.scss']
})
export class DialogoAdicionarDocumentoComponent implements OnInit {

  formDialogAddDocumento: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialog: MatDialog,
  ) { 
    this.formDialogAddDocumento = this._fb.group({
      tipo: [null, Validators.required],
      autor: ['', Validators.required],
      nome: ['', Validators.required],
      tipo_manifestacao: ['', Validators.required],
      observacao: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  public salvar(): void {
    if (this.formDialogAddDocumento.valid) {
      const dialogRef = this._dialog.open(DialogoConfirmacaoComponent, {
        data: {
          titulo: `Confirmar criação do documento`,
          mensagem: `Deseja criar o documento para o Gabinete do Ministro ${this.formDialogAddDocumento.get('autor').value}?`,
        }
      });
  
      dialogRef.afterClosed().subscribe(resultado => {
        if (resultado) {
          // chamar o método http
        }
      });
    }
  }

}
