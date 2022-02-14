import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComposicaoColegiado } from 'app/shared/model/interfaces/colegiado.interface';
import { Ministro } from 'app/shared/model/interfaces/ministro.interface';

@Component({
  selector: 'app-card-ministro',
  templateUrl: './card-ministro.component.html',
  styleUrls: ['./card-ministro.component.scss']
})
export class CardMinistroComponent implements OnInit {

  formCriacaoColegiado: FormGroup;
  voto = {incluir_voto: false, ja_votou: false, pode_votar: false}
  minsitro: Ministro;

  @Input() composicao: ComposicaoColegiado;
  @Input() colegiado: string = '';
  @Input() disabled: boolean = false;
  @Output() statusVotacao = new EventEmitter<ComposicaoColegiado>();

  constructor() { 
    
  }

  ngOnInit(): void {
    this.minsitro = this.composicao.ministro;

    
  }

  emiteVoto(): void {
    this.statusVotacao.emit({
      ...this.composicao,
      ...this.voto,
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
