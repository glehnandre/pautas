import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComposicaoColegiado } from 'app/modules/acervo/model/interfaces/colegiado.interface';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { Voto, VotoDoMinistro } from 'app/modules/acervo/model/interfaces/voto.interface';

@Component({
  selector: 'app-card-ministro',
  templateUrl: './card-ministro.component.html',
  styleUrls: ['./card-ministro.component.scss']
})
export class CardMinistroComponent implements OnInit {

  formCriacaoColegiado: FormGroup;
  minsitro: Ministro;

  @Input() composicao: ComposicaoColegiado;
  @Input() colegiado: string = '';
  @Input() disabled: boolean = false;
  @Input() desativarForm: boolean = false;
  @Output() statusVotacao = new EventEmitter<ComposicaoColegiado>();

  constructor(
    private _fb: FormBuilder,
  ) { 
    
  }

  ngOnInit(): void {
    this.formCriacaoColegiado = this._fb.group({
      incluir_voto: new FormControl({value: false, disabled: this.disabled}, Validators.required),
      ja_votou: new FormControl({value: false, disabled: this.disabled}, Validators.required),
      pode_votar: new FormControl({value: false, disabled: this.disabled}, Validators.required),
    });

    this.minsitro = this.composicao.ministro;

    this.formCriacaoColegiado.valueChanges.subscribe(() => {
      this.statusVotacao.emit({
        ...this.composicao,
        ...this.formCriacaoColegiado.value,
      });
    });

    console.log(this.desativarForm)
    if (this.desativarForm) {
      this.formCriacaoColegiado.controls.incluir_voto.disable();
    }
  }

  obterDescricao(): string {
    if (this.composicao.presidente) {
      return 'Presidente';
    } else if (this.composicao.relator) {
      return 'Relator';
    } else if (this.composicao.redator) {
      return 'Redator';
    } else {
      return '';
    }
  }

}
