import { Component, Input, OnInit } from '@angular/core';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { Voto } from 'app/modules/acervo/model/interfaces/voto.interface';

@Component({
  selector: 'app-ministros-que-acompanharam',
  templateUrl: './ministros-que-acompanharam.component.html',
  styleUrls: ['./ministros-que-acompanharam.component.scss']
})
export class MinistrosQueAcompanharamComponent implements OnInit {

  @Input() votos: Voto[];
  @Input() pdf: string;
  ministrosQueAcompanharam: Ministro[] = [];

  constructor() { }

  ngOnInit(): void {
    if (this.pdf) {
      console.log(this.pdf)
    }
  }

  public getVotosQueAcompanharam(start: number, end: number): Ministro[] {
    if (this.votos.length > 0) {
      const index = this.votos.findIndex(({autor}) => this.pdf.includes(autor.abreviacao));
      
      if (index !== -1) {
        this.ministrosQueAcompanharam = this.votos[index].acompanharam;
        const votos = [...this.ministrosQueAcompanharam].slice(start, end);
        return votos;
      } else {
        return [];
      }
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
