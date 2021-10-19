import { Component, Input, OnInit } from '@angular/core';
import { Voto } from 'app/modules/acervo/model/interfaces/voto.interface';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';

@Component({
  selector: 'app-icones-votos',
  templateUrl: './icones-votos.component.html',
  styleUrls: ['./icones-votos.component.scss']
})
export class IconesVotosComponent implements OnInit {

  @Input() ministros: Ministro[];
  @Input() quantidade: number;

  constructor() { }

  ngOnInit(): void {

  }

  public getIconesMinistros(): Ministro[] {
    if (this.ministros) {
      const votos = [...this.ministros].slice(0, this.quantidade);

      return votos;
    }

    return [];
  }

  public getNomesDosMinistrosQueAcompanharam(): string {
    let nomes: string = '';

    this.ministros
      .forEach(({nome}, index) => nomes += `${(index + 1)}º que acompanhou: ${nome}\n`);

    return nomes;
  }

}
