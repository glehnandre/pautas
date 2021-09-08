import { Component, OnInit, Input } from '@angular/core';
import { Processo } from '../../modules/acervo/model/interfaces/processo.interface';

@Component({
  selector: 'app-processo-capitulo',
  templateUrl: './processo-capitulo.component.html',
  styleUrls: ['./processo-capitulo.component.scss']
})
export class ProcessoCapituloComponent implements OnInit {
  @Input() processo: Processo;

  constructor() { }

  ngOnInit(): void {
  }
}
