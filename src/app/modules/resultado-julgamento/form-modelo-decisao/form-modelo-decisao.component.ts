import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ResultadoJulgamentoService } from 'app/modules/services/resultado-julgamento.service';

@Component({
  selector: 'app-form-modelo-decisao',
  templateUrl: './form-modelo-decisao.component.html',
  styleUrls: ['./form-modelo-decisao.component.scss']
})
export class FormModeloDecisaoComponent implements OnInit {

  formModeloDecisao: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _resultadoJulgamento: ResultadoJulgamentoService,
    public dialogRef: MatDialogRef<FormModeloDecisaoComponent>,
  ) { 
    this.formModeloDecisao = this._fb.group({
      classe:           ['', Validators.required],
      tipo_capitulo:    ['', Validators.required],
      recurso:          ['', Validators.required],
      texto:            ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  public salvarModeloDecisao(): void {
    if (this.formModeloDecisao.valid) {
      this._resultadoJulgamento.salvarModeloDecisao(this.formModeloDecisao.value).subscribe({
        next: () => {
          this.dialogRef.close();
        }
      });
    }
  }

}
