import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessaoJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface';
import { Colegiado } from 'app/modules/acervo/acoes/pautar/pautar.component';

@Component({
  selector: 'app-pautar-form',
  templateUrl: './pautar-form.component.html',
  styleUrls: ['./pautar-form.component.scss']
})

export class PautarFormComponent implements OnInit {

  @Input() sessoes: SessaoJulgamento[] = [];
  @Output() statusPautarForm = new EventEmitter<any>();

  sessao: string = '';
  data_inicio: string = '';
  data_fim: string = '';

  colegiados: Colegiado[] = [
    { value: 'primeira-turma', viewValue: 'Primeira Turma' },
    { value: 'segunda-turma', viewValue: 'Segunda Turma' },
    { value: 'colegiado-pleno', viewValue: 'Pleno' }
  ];

  modalidades = [
    {value: 'Virtual'},
    {value: 'Presencial'}
  ];

  modalidadeEscolhida: string = this.modalidades[0].value;
  colegiadoEscolhido: string = this.colegiados[0].viewValue;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  emiteObjeto(){
    this.statusPautarForm.emit({
      sessao: this.sessao,
      colegiado: this.colegiadoEscolhido,
      modalidade: this.modalidadeEscolhida,
      data_inicio: this.data_inicio,
      data_fim: this.data_fim,
    })
  }

  setSessao(){
    this.sessao = '';
  }

}
