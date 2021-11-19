import { Component, Input, OnInit } from '@angular/core';
import { CapitulosParaPublicacao } from 'app/modules/acervo/model/interfaces/capitulo.interface';
import { Frase } from 'app/modules/acervo/model/interfaces/frase-genero-plural.interface';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { SessaoJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface';
import { MinistroService } from 'app/modules/services/ministro.service';

@Component({
  selector: 'app-extrato-ata',
  templateUrl: './extrato-ata.component.html',
  styleUrls: ['./extrato-ata.component.scss']
})
export class ExtratoAtaComponent implements OnInit {
  @Input() sessao: SessaoJulgamento;
  @Input() publicacoes: CapitulosParaPublicacao[];
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
    F:'Se declara vencida a Ministra ',
    M: 'Se declara vencido o Ministro ',
    PF:'Se declararam vencidas as Ministras, ',
    PM:'Se declararam vencidos os Ministros, ',
  };

  FraseCondutor: Frase = {
    F: 'Voto Condutor da Ministra ',
    M: 'Voto Condutor do Ministro ',
  }

  FrasePresentes: Frase = {
    F: 'Estava Presente a Ministra ',
    M: 'Estava Presente o Ministro ',
    PF: 'Estavam Presentes as Ministras ',
    PM: 'Estavam Presentes os Ministros ',
  }

  constructor(
    private _ministroService: MinistroService,
  ) { }

  ngOnInit(): void {
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
   fraseEMinistros(ministros: Ministro[], frase: Frase): string {
    return ministros.length?
        `<span> ${ this._ministroService.generoEPlural(ministros, frase) }</span>
        <span class="font-medium">${ this._ministroService.ministrosString(ministros) }</span>`:
        '';
  }

}
