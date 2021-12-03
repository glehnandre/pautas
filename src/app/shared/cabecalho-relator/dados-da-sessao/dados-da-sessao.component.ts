import { Component, Input, OnInit } from '@angular/core';
import { SessaoJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface';

@Component({
  selector: 'app-dados-da-sessao',
  templateUrl: './dados-da-sessao.component.html',
  styleUrls: ['./dados-da-sessao.component.scss']
})
export class DadosDaSessaoComponent implements OnInit {

  @Input() sessao: SessaoJulgamento = {
    ano: 2021,
    categoria: '',
    colegiado: '',
    data_fim: '',
    data_inicio: '',
    modalidade: '',
    numero: 1000,
    situacao: 'ABERTA',
    tipo: '',
    secretario: {
      id: 1,
      nome: 'teste',
    },
    ministros_presentes: [],
    ministros_ausentes: [],
    presidencia: null
  };

  constructor() { }

  ngOnInit(): void {
  }

}
