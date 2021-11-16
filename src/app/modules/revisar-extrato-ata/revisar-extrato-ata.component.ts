import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { SituacaoDoProcesso } from '../acervo/model/enums/situacaoDoProcesso.enum'
import { SessaoJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';
import { JulgamentoService } from '../services/julgamento.service';
import { ResultadoJulgamentoService } from '../services/resultado-julgamento.service';
import { Decisao, DecisoesResultadoJulgamento } from '../acervo/model/interfaces/decisao.interface';
import { Ata } from '../acervo/model/interfaces/ata.interface';
import { Capitulo, CapitulosParaPublicacao } from '../acervo/model/interfaces/capitulo.interface';
import { MinistroService } from '../services/ministro.service';
import { Ministro } from '../acervo/model/interfaces/ministro.interface';
import { MatDialog } from '@angular/material/dialog';
import { PublicarFormComponent } from './publicar-form/publicar-form.component';
import { Genero } from '../acervo/model/enums/genero.enum';
import { Frase } from '../acervo/model/interfaces/frase-genero-plural.interface';

interface Parametros {
    numero: number;
    ano: number;
}

@Component({
  selector: 'app-revisar-extrato-ata',
  templateUrl: './revisar-extrato-ata.component.html',
  styleUrls: ['./revisar-extrato-ata.component.scss']
})
export class RevisarExtratoAtaComponent implements OnInit {

  parametros: Parametros;

  sessao: SessaoJulgamento;
  data_fim: Date;
  ata: Ata;
  publicacoes: CapitulosParaPublicacao[];
  tags: string[];

  FraseImpedidos: Frase = {
    F:'Ministra que se declara impedida: ',
    M: 'Ministro que se declara impedido: ',
    PF:'Ministras que se declaram impedidas: ',
    PM:'Ministros que se declaram impedidos: ',
  };

  FraseSuspeitos: Frase = {
    F:'Ministra que se declara suspeita: ',
    M: 'Ministro que se declara suspeito: ',
    PF:'Ministras que se declaram suspeitas: ',
    PM:'Ministros que se declaram vencidos: ',
  };

  FraseVencidos: Frase = {
    F:'Ministra que se declara vencida: ',
    M: 'Ministro que se declara vencido: ',
    PF:'Ministras que se declaram vencidas: ',
    PM:'Ministros que se declaram vencidos: ',
  };

  FraseCondutor: Frase = {
      F: 'Ministro Condutor',
      M: 'Ministra Condutora',
  }

  constructor(
      private _julgamentoService: JulgamentoService,
      private _resultadoJulgamento: ResultadoJulgamentoService,
      private _ministroService: MinistroService,
      private _matDialog: MatDialog,
      private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.parametros = this._route.snapshot.queryParams as Parametros;

    this._julgamentoService
      .listarSessoesDeJulgamento(this.parametros.numero, this.parametros.ano)
      .subscribe({
        next: (sessao) => {
            this.sessao = sessao;
            console.log(this.sessao);
            this.data_fim = new Date(sessao.data_fim);
            this.tags = [sessao.colegiado, sessao.tipo];

            this._resultadoJulgamento
              .getAta(sessao.numero, sessao.ano)
              .subscribe({
                next: (ata) => {
                  this.ata = ata;
                  console.log(this.ata);
                  this.publicacoes = ata['capitulos para publicacao'];
                }
              });
        }
      });
  }

  /**
   * recebe lista de Ministro e retorna o(s) nome(s)
   * @param ministros Ministro[]
   * @returns string
  **/
  nomesMinistros(ministros: Ministro[]): string {
    return this._ministroService.ministrosString(ministros);
  }

  /**
   * Abre o Formulário para Publicar Extrato
  **/
  publicar(): void {
    const dialogRef = this._matDialog
      .open(PublicarFormComponent, { maxHeight: '560px', data: this.sessao });

    dialogRef.afterClosed().subscribe({
      next: (form) => {
        console.log(form);
      }
    });
  }
}
