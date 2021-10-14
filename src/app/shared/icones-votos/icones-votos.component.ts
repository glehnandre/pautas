import { Component, Input, OnInit } from '@angular/core';
import { Voto } from 'app/modules/acervo/model/interfaces/voto.interface';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';

@Component({
  selector: 'app-icones-votos',
  templateUrl: './icones-votos.component.html',
  styleUrls: ['./icones-votos.component.scss']
})
export class IconesVotosComponent implements OnInit {

  @Input() voto: Voto;
  @Input() quantidade: number;

  constructor() { }

  ngOnInit(): void {

  }

  public getVotosQueAcompanharam(start: number, end: number): Ministro[] {
    if (this.voto && this.voto.acompanharam) {
      const votos = [...this.voto.acompanharam].slice(start, end);

      return votos;
    }

    return [];
  }

  public getNomesDosMinistrosQueAcompanharam(): string {
    let nomes: string = '';

    this.voto.acompanharam
      .forEach(({nome}, index) => nomes += `${(index + 1)}º que acompanhou: ${nome}\n`);

    return nomes;
  }

}
