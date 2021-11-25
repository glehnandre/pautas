import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoCapitulo } from 'app/modules/acervo/model/enums/tipoCapitulo.enum';
import { ModeloDecisao } from 'app/modules/acervo/model/interfaces/modeloDecisao.interface';
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
    @Inject(MAT_DIALOG_DATA) public modelo: ModeloDecisao,
  ) { 
    console.log(this.modelo)
    this.formModeloDecisao = this._fb.group({
      id:               [this.modelo.id],
      classe:           [this.modelo.classe, Validators.required],
      tipo_capitulo:    [this.modelo.tipoCapitulo, Validators.required],
      recurso:          [this.modelo.recurso, Validators.required],
      texto:            [this.modelo.texto, Validators.required],
      dispositivo:      [this.modelo.dispositivo],
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

  public atualizarModeloDecisao(): void {
    if (this.formModeloDecisao.valid) {
      this._resultadoJulgamento.atualizarModeloDecisao(this.modelo.id, this.formModeloDecisao.value).subscribe({
        next: () => {
          this.dialogRef.close();
        }
      });
    }
  }

}
