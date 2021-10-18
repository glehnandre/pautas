import { Component, Input, OnInit } from '@angular/core';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';

@Component({
  selector: 'app-ministros-que-acompanharam',
  templateUrl: './ministros-que-acompanharam.component.html',
  styleUrls: ['./ministros-que-acompanharam.component.scss']
})
export class MinistrosQueAcompanharamComponent implements OnInit {

  @Input() ministrosQueAcompanharam: Ministro[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  public getVotosQueAcompanharam(start: number, end: number): Ministro[] {
    if (this.ministrosQueAcompanharam) {
      const votos = [...this.ministrosQueAcompanharam].slice(start, end);

      return votos;
    }

    return [];
  }

  public getNomesDosMinistrosQueAcompanharam(): string {
    let nomes: string = '';

    this.ministrosQueAcompanharam
      .forEach(({nome}, index) => nomes += `${(index + 1)}º que acompanhou: ${nome}\n`);

    return nomes;
  }

}
