import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CapitulosParaPublicacao } from 'app/modules/acervo/model/interfaces/capitulo.interface';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { ProcessoService } from 'app/modules/services/processo.service';

@Component({
  selector: 'app-correcao-capitulo-form',
  templateUrl: './correcao-capitulo-form.component.html',
  styleUrls: ['./correcao-capitulo-form.component.scss']
})
export class CorrecaoCapituloFormComponent implements OnInit {

  processos: Processo[];


  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<CorrecaoCapituloFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      processos:Processo[],
      id_sessao: number;
    },
    private _processoService: ProcessoService,
  ) { }

  correcaoCapitulosForm: FormGroup = this._formBuilder.group({
    correcoes: this._formBuilder.array([]),
  });

  ngOnInit(): void {
    this.processos = this.data.processos;
    this.processos.forEach( processo => this.addcorrecao(processo));
  }

  get correcoes(): FormArray {
    return this.correcaoCapitulosForm.controls['correcoes'] as FormArray;
  }

  addcorrecao(processo) {
    const correcaoForm = this._formBuilder.group({
      marcado: [false, Validators.nullValidator],
      correcao: ['', Validators.nullValidator],
      processo: [processo, Validators.nullValidator],
    });
    this.correcoes.push(correcaoForm);
  }

  apagaCorrecao(index: number): void {
    const correcao = this.correcoes.controls[index];
    const { marcado, processo } = correcao.value
    correcao.setValue({ marcado, correcao: '', processo });
  }

  get marcadoCorrecao(): Array<any> {
    return this.correcaoCapitulosForm.getRawValue()
      .correcoes.filter( ({ marcado }) => marcado == true);
  }

  get marcadoECorrigido(): boolean {
    const corrigidos = this.correcaoCapitulosForm.getRawValue()
      .correcoes.filter( ({ correcao }) => correcao != '');

    return corrigidos.length == this.marcadoCorrecao.length && corrigidos.length != 0;
  }

  enviarCorrecao(): void {
    let correcoes = [];
    for(let correcao of this.marcadoCorrecao)
      correcoes.push({ processo: correcao.processo, correcao: correcao.correcao });

    this._processoService.enviarCorrecaoCapitulo(this.data.id_sessao, correcoes);
    this._dialogRef.close();
  }
}
