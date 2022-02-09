import { Component, Input, OnInit } from '@angular/core';
import { SessaoDeJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface';

@Component({
  selector: 'app-dados-da-sessao',
  templateUrl: './dados-da-sessao.component.html',
  styleUrls: ['./dados-da-sessao.component.scss']
})
export class DadosDaSessaoComponent implements OnInit {

  @Input() sessao: SessaoDeJulgamento = {} as SessaoDeJulgamento;
  @Input() isExibirStatus: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
