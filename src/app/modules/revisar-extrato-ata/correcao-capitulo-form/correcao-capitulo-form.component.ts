import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CapitulosParaPublicacao } from 'app/modules/acervo/model/interfaces/capitulo.interface';
import { ResultadoJulgamentoService } from 'app/modules/services/resultado-julgamento.service';

@Component({
  selector: 'app-correcao-capitulo-form',
  templateUrl: './correcao-capitulo-form.component.html',
  styleUrls: ['./correcao-capitulo-form.component.scss']
})
export class CorrecaoCapituloFormComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<CorrecaoCapituloFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      capitulos:CapitulosParaPublicacao[],
      id_sessao: number;
    },
    private _resultadoService: ResultadoJulgamentoService,
  ) { }

  correcaoCapitulosForm: FormGroup = this._formBuilder.group({
    correcoes: this._formBuilder.array([]),
  });
  capitulos: CapitulosParaPublicacao[];


  ngOnInit(): void {
    this.capitulos = this.data.capitulos;
    this.capitulos.forEach( capitulo => this.addcorrecao(capitulo));
  }

  get correcoes(): FormArray {
    return this.correcaoCapitulosForm.controls['correcoes'] as FormArray;
  }

  addcorrecao(capitulo) {
    const correcaoForm = this._formBuilder.group({
      marcado: [false, Validators.nullValidator],
      correcao: ['', Validators.nullValidator],
      capitulo: [capitulo.processo, Validators.nullValidator],
    });
    this.correcoes.push(correcaoForm);
  }

  apagaCorrecao(index: number): void {
    const correcao = this.correcoes.controls[index];
    const { marcado, capitulo } = correcao.value
    correcao.setValue({ marcado, correcao: '', capitulo });
  }

  marcadoCorrecao(): Array<any> {
    return this.correcaoCapitulosForm.getRawValue()
      .correcoes.filter( ({marcado, correcao}) => marcado == true && correcao != '');
  }

  enviarCorrecao(): void {
    console.log(this.marcadoCorrecao());
    this._resultadoService.enviarCorrecaoCapitulo(this.data.id_sessao, this.marcadoCorrecao);
    this._dialogRef.close();
  }
}
