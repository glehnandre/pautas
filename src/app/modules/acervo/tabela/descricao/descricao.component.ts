import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-descricao',
  templateUrl: './descricao.component.html',
  styleUrls: ['./descricao.component.scss']
})
export class DescricaoComponent implements OnInit {
  
  @Input() descricao: string;
  
  constructor() {}

  ngOnInit(): void {}

}
