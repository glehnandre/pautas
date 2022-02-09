import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { Capitulo, Envolvido } from 'app/modules/acervo/model/interfaces/capitulo.interface';
import { Frase } from 'app/modules/acervo/model/interfaces/frase-genero-plural.interface';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { SessaoJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface';
import { MinistroService } from 'app/modules/services/ministro.service';
import { Ata } from 'app/modules/acervo/model/interfaces/ata.interface';

registerLocaleData(localePt);

@Component({
  selector: 'app-extrato-ata',
  templateUrl: './extrato-ata.component.html',
  styleUrls: ['./extrato-ata.component.scss'],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
})
export class ExtratoAtaComponent implements OnInit {
  @Input() ata: Ata;
  @Input() sessao: SessaoJulgamento;
  @Input() form: any;

  tiposCapitulo: string[] = ['Preliminar', 'Mérito', 'Modulação', 'Questão de Ordem', 'Tese'];
  descreveTipo: { [tipo: string]: string } = {
    'Preliminar': 'ª Decisão Preliminar',
    'Mérito': 'ª Decisão Mérito',
    'Modulação': 'ª Modulação',
    'Questão de Ordem': 'ª Questão de Ordem',
    'Tese': 'ª Tese'
  };

  FraseImpedidos: Frase = {
    F:'Se declara impedida a Ministra ',
    M: 'Se declara impedido o Ministro ',
    PF:'Se declararam impedidas as Ministras, ',
    PM:'Se declararam impedidos os Ministros, ',
  };

  FraseSuspeitos: Frase = {
    F:'Se declara suspeita a Ministra ',
    M: 'Se declara suspeito o Ministro ',
    PF:'Se declararam suspeitas as Ministras, ',
    PM:'Se declararam suspeitos os Ministros, ',
  };

  FraseAcompanham: Frase = {
    F:'Acompanha a Ministra ',
    M: 'Acompanha o Ministro ',
    PF:'Acompanham as Ministras, ',
    PM:'Acompanham os Ministros, ',
  };

  FraseDivergem: Frase = {
    F:'Vencida a Ministra ',
    M: 'Vencido o Ministro ',
    PF:'Vencidas as Ministras, ',
    PM:'Vencidos os Ministros, ',
  };

  FraseCondutor: Frase = {
    F: 'Voto Condutor da Ministra ',
    M: 'Voto Condutor do Ministro ',
  }

  FrasePresidente: Frase = {
    F: 'Presidente Ministra ',
    M: 'Presidente Ministro ',
  }

  FrasePresentes: Frase = {
    F: 'Estava presente a Senhora Ministra ',
    M: 'Estava presente o Senhor Ministro ',
    PF: 'Estavam presentes as Senhoras Ministras ',
    PM: 'Estavam presentes os Senhores Ministros ',
  }

  FraseAusentes: Frase = {
    F: 'Estava ausente a Senhora Ministra ',
    M: 'Estava ausente o Senhor Ministro ',
    PF: 'Estavam ausentes as Senhoras Ministras ',
    PM: 'Estavam ausentes os Senhores Ministros ',
  }

  constructor(
    private _ministroService: MinistroService,
  ) { }

  ngOnInit(): void {
    console.log('%cCarregando Elementos Internos', "font-size:15px;color:red");
    console.log(this.ata);
    console.log(this.sessao);
  }

  /**
   * @private
   * @description Recebe lista de Ministro e  Frase
   * retorna a frase correspondente com validação de
   * plural e genêro em um span e o(s) nome(s) dos
   * Ministro em outro span com text-medium
   *
   * @params (ministros Ministro[], frase: Frase)
   *
   * @return string innerHtml contendo span com a
   * frase validando plural e gênero e outro span
   * com o nome de todos ministros da lista.
   *
   * @author Rodrigo Carvalho dos Santos
  **/
   fraseEMinistros(ministros: Ministro[] = {} as Ministro[], frase: Frase): string {
    return ministros.length?
        `<span> ${ this._ministroService.generoEPlural(ministros, frase) }</span>
        <span class="font-medium">${ this._ministroService.ministrosString(ministros) }</span>
        <br>`:
        '';
  }

  /**
   * @description a função recebe um número em formato de string
   * e retorna ele com um ponto a cada 3 casas numéricas.
   * @param num uma string do número de processo
   * @returns o número com um ponto a cada 3 casas numéricas
   * @author Rodrigo Carvalho dos Santos
  **/
  addPontoNumero(num: string): string {
    return  num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  /**
   * @description recebe os envolvidos e filtros para categoria e polo, então
   * retorna os envolvidos pertecentes aos que começam com os filtros escolhidos.
   * @param envolvidos Envolvido[]
   * @param filtroCategoria string com a categoria que você procura
   * @param filtroPolo string opcional com o polo que você procura
   * @returns todos envolvidos com categoria x e polo y se filtroPolo existir
   * @author Rodrigo Carvalho dos Santos
   */
  filtraEnvolvidos(envolvidos: Envolvido[], filtroCategoria: string, filtroPolo?: string): Envolvido[] {
    return filtroPolo?
      envolvidos.filter(({ polo, categoria }) => polo.startsWith(filtroPolo) && categoria.startsWith(filtroCategoria)):
      envolvidos.filter(({ categoria }) => categoria.startsWith(filtroCategoria));
  }

  filtraTipos(tipoCapitulo, capitulos: Capitulo[]) {
    return capitulos.filter(({ tipo }) => tipo == tipoCapitulo);
  }
}
