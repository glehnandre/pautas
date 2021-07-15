import { Component, Input, OnInit } from '@angular/core';
import { Capitulo } from '../tabela.component';

@Component({
  selector: 'app-descricao',
  templateUrl: './descricao.component.html',
  styleUrls: ['./descricao.component.scss']
})
export class DescricaoComponent implements OnInit {
  
  @Input() capitulos: Capitulo[] = [];
  
  constructor() {}

  ngOnInit(): void {}

}
