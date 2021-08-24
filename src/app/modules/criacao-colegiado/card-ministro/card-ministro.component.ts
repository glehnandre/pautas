import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  @Output() statusVotacao = new EventEmitter<ComposicaoColegiado>();

  constructor(
    private _fb: FormBuilder,
  ) { 
    this.formCriacaoColegiado = this._fb.group({
      incluir_voto: [false, [Validators.required]],
      ja_votou: [false, [Validators.required]],
      pode_votar: [false, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.minsitro = this.composicao.ministro;
    this.formCriacaoColegiado.valueChanges.subscribe(() => {
      this.statusVotacao.emit({
        ...this.composicao,
        ...this.formCriacaoColegiado.value,
      });
    });
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
