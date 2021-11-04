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

  constructor(
      private _julgamentoService: JulgamentoService,
      private _resultadoJulgamento: ResultadoJulgamentoService,
      private _ministroService: MinistroService,
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

  nomesMinistros(ministros: Ministro[]): string {
    return this._ministroService.ministrosString(ministros);
  }
}
