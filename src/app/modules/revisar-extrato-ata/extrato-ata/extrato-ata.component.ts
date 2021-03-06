import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';
import { Envolvido, CapitulosParaPublicacao } from 'app/modules/acervo/model/interfaces/capitulo.interface';
import { Frase } from 'app/modules/acervo/model/interfaces/frase-genero-plural.interface';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { SessaoJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface';
import { MinistroService } from 'app/modules/services/ministro.service';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

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
  @Input() sessao: SessaoJulgamento;
  @Input() capitulosPublicacao: CapitulosParaPublicacao[];
  @Input() form: any;

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

  FraseVencidos: Frase = {
    F:'Vencida a Ministra ',
    M: 'Vencido o Ministro ',
    PF:'Vencidas as Ministras, ',
    PM:'Vencidos os Ministros, ',
  };

  FraseDiscordam: Frase = {
    F:'Discorda a Ministra ',
    M: 'Discorda o Ministro ',
    PF:'Discordam as Ministras, ',
    PM:'Discordam os Ministros, ',
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
    F: 'Estava Presente a Senhora Ministra ',
    M: 'Estava Presente o Senhor Ministro ',
    PF: 'Estavam Presentes as Senhoras Ministras ',
    PM: 'Estavam Presentes os Senhores Ministros ',
  }

  FraseAusentes: Frase = {
    F: 'Estava Ausente a Senhora Ministra ',
    M: 'Estava Ausente o Senhor Ministro ',
    PF: 'Estavam Ausentes as Senhoras Ministras ',
    PM: 'Estavam Ausentes os Senhores Ministros ',
  }

  constructor(
    private _ministroService: MinistroService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * @private
   * @description Recebe lista de Ministro e  Frase
   * retorna a frase correspondente com valida????o de
   * plural e gen??ro em um span e o(s) nome(s) dos
   * Ministro em outro span com text-medium
   *
   * @params (ministros Ministro[], frase: Frase)
   *
   * @return string innerHtml contendo span com a
   * frase validando plural e g??nero e outro span
   * com o nome de todos ministros da lista.
   *
   * @author Rodrigo Carvalho dos Santos
  **/
   fraseEMinistros(ministros: Ministro[], frase: Frase): string {
    return ministros.length?
        `<span> ${ this._ministroService.generoEPlural(ministros, frase) }</span>
        <span class="font-medium">${ this._ministroService.ministrosString(ministros) }</span>
        <br>`:
        '';
  }

  /**
   * @description a fun????o recebe um n??mero em formato de string
   * e retorna ele com um ponto a cada 3 casas num??ricas.
   * @param num uma string do n??mero de processo
   * @returns o n??mero com um ponto a cada 3 casas num??ricas
   * @author Rodrigo Carvalho dos Santos
  **/
  addPontoNumero(num: string): string {
    return  num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  /**
   * @description recebe os envolvidos e filtros para categoria e polo, ent??o
   * retorna os envolvidos pertecentes aos que come??am com os filtros escolhidos.
   * @param envolvidos Envolvido[]
   * @param filtroCategoria string com a categoria que voc?? procura
   * @param filtroPolo string opcional com o polo que voc?? procura
   * @returns todos envolvidos com categoria x e polo y se filtroPolo existir
   * @author Rodrigo Carvalho dos Santos
   */
  filtraEnvolvidos(envolvidos: Envolvido[], filtroCategoria: string, filtroPolo?: string): Envolvido[] {
    return filtroPolo?
      envolvidos.filter(({ polo, categoria }) => polo.startsWith(filtroPolo) && categoria.startsWith(filtroCategoria)):
      envolvidos.filter(({ categoria }) => categoria.startsWith(filtroCategoria));
  }
}
