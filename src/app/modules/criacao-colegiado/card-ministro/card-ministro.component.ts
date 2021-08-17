import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { Voto, VotoDoMinistro } from 'app/modules/acervo/model/interfaces/voto.interface';

@Component({
  selector: 'app-card-ministro',
  templateUrl: './card-ministro.component.html',
  styleUrls: ['./card-ministro.component.scss']
})
export class CardMinistroComponent implements OnInit {

  formCriacaoColegiado: FormGroup;

  @Input() minsitro: Ministro;
  @Input() isPresidente: boolean;
  @Input() isRelator: boolean;
  @Input() isRedator: boolean;
  @Output() statusVotacao = new EventEmitter<VotoDoMinistro>();

  votoDoMinistro: VotoDoMinistro;

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
    this.formCriacaoColegiado.valueChanges.subscribe(() => {
      this.statusVotacao.emit({
        ministro: this.minsitro,
        voto: this.formCriacaoColegiado.value,
      });
    });
  }

  obterDescricao(): string {
    if (this.isPresidente) {
      return 'Presidente';
    } else if (this.isRelator) {
      return 'Relator';
    } else if (this.isRedator) {
      return 'Redator';
    } else {
      return '';
    }
  }

}
