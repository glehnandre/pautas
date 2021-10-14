import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-resposta',
  templateUrl: './form-resposta.component.html',
  styleUrls: ['./form-resposta.component.scss']
})
export class FormRespostaComponent implements OnInit {

  resposta: string;

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<FormRespostaComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
      this._fb.group({
          resposta: [''],
          aceitar: Boolean
      })
   }

  ngOnInit(): void {
  }

  Close(): void {
      this.dialogRef.close();
  }

  aceitar(): void {
    this.dialogRef.close({ resposta: this.resposta, aceitar: true });
  }

  recusar(): void {
    this.dialogRef.close({ resposta: this.resposta, aceitar: false });
  }
}
