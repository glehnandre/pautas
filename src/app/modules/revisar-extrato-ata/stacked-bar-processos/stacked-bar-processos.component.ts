import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'digital-stacked-bar-processos',
  templateUrl: './stacked-bar-processos.component.html',
  styleUrls: ['./stacked-bar-processos.component.scss']
})
export class StackedBarProcessosComponent implements OnInit {

  @Input() julgados;
  @Input() nao_julgados;
  @Input() suspensos;

  constructor() { }

  ngOnInit(): void {
  }

  getPorcentagem(num: number): number {
    return (num/(this.julgados + this.nao_julgados + this.suspensos))*100;
  }

}
