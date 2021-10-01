import { Component, Input, OnInit } from '@angular/core';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { Voto } from 'app/modules/acervo/model/interfaces/voto.interface';

@Component({
  selector: 'app-conteudo-voto-ministro',
  templateUrl: './conteudo-voto-ministro.component.html',
  styleUrls: ['./conteudo-voto-ministro.component.scss']
})
export class ConteudoVotoMinistroComponent implements OnInit {

  @Input() voto: Voto;

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

  public converterDeBase64ParaHtml(): string {
    if (this.voto && this.voto.conteudo) {
      return window.atob(this.voto.conteudo);
    }
    
    return 'aguarde...';
  }

  public getNomesDosMinistrosQueAcompanharam(): string {
    let nomes: string = '';

    this.voto.acompanharam
      .forEach(({nome}, index) => nomes += `${(index + 1)}º que acompanhou: ${nome}\n`);

    return nomes;
  }

}
