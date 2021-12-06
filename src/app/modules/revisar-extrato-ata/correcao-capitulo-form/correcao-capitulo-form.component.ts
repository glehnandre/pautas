import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CapitulosParaPublicacao } from 'app/modules/acervo/model/interfaces/capitulo.interface';

@Component({
  selector: 'app-correcao-capitulo-form',
  templateUrl: './correcao-capitulo-form.component.html',
  styleUrls: ['./correcao-capitulo-form.component.scss']
})
export class CorrecaoCapituloFormComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<CorrecaoCapituloFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: CapitulosParaPublicacao[],
  ) { }

  correcaoCapitulosForm: FormGroup = this._formBuilder.group({
    correcoes: this._formBuilder.array([]),
  });
  capitulos: CapitulosParaPublicacao[];


  ngOnInit(): void {
    this.capitulos = this.data;
    this.capitulos.forEach( capitulo => this.addcorrecao(capitulo));
    console.log(this.correcoes.controls);
  }

  get correcoes(): FormArray {
    return this.correcaoCapitulosForm.controls['correcoes'] as FormArray;
  }

  addcorrecao(capitulo) {
    const correcaoForm = this._formBuilder.group({
      marcado: [false, Validators.nullValidator],
      correcao: ['', Validators.nullValidator],
      capitulo: [capitulo.numero, Validators.nullValidator],
    });
    this.correcoes.push(correcaoForm);
  }

  apagaCorrecao(index: number): void {
    const correcao = this.correcoes.controls[index];
    const { marcado, capitulo } = correcao.value
    correcao.setValue({ marcado, correcao: '', capitulo });
  }

  enviarCorrecao(): void {
    console.log(this.correcaoCapitulosForm.getRawValue());
    this._dialogRef.close();
  }
}
