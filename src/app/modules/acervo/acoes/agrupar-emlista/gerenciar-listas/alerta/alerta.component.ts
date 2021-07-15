import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Alerta {
  titulo: string;
  mensagem: string;
}

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alerta,
  ) { }

  ngOnInit(): void {
  }

  public confirmar(): void {
    this.dialogRef.close('ok');
  }

  public fechar(): void {
    this.dialogRef.close('');
  }

}
