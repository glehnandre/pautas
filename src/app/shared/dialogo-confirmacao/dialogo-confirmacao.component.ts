import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-confirmacao',
  templateUrl: './dialogo-confirmacao.component.html',
  styleUrls: ['./dialogo-confirmacao.component.scss']
})
export class DialogoConfirmacaoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _dialogRef: MatDialogRef<DialogoConfirmacaoComponent>,
  ) { }

  ngOnInit(): void {
  }

  public confirmar(): void {
    this._dialogRef.close(true);
  }

}
