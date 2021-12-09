import { Component, Input, OnInit } from '@angular/core';
import { SessaoJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface';

@Component({
  selector: 'app-dados-da-sessao',
  templateUrl: './dados-da-sessao.component.html',
  styleUrls: ['./dados-da-sessao.component.scss']
})
export class DadosDaSessaoComponent implements OnInit {

  @Input() sessao: SessaoJulgamento = {} as SessaoJulgamento;

  constructor() { }

  ngOnInit(): void {
  }

}
