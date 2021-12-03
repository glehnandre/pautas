import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DecisoesResultadoJulgamento } from '../acervo/model/interfaces/decisao.interface';
import { Ministro } from '../acervo/model/interfaces/ministro.interface';
import { Voto } from '../acervo/model/interfaces/voto.interface';
import { MinistroService } from '../services/ministro.service';
import { ProcessoService } from '../services/processo.service';
import { ResultadoJulgamentoService } from '../services/resultado-julgamento.service';

interface Parametros {
    processo: number;
    colegiado: string;
}

@Component({
  selector: 'app-informar-redator',
  templateUrl: './informar-redator.component.html',
  styleUrls: ['./informar-redator.component.scss']
})
export class InformarRedatorComponent implements OnInit {

  dados: DecisoesResultadoJulgamento;
  parametros: Parametros;
  processo: string;
  descrissaoSessao: string;
  data_fim: Date;
  votos: Voto[] = [];

  redatorForm: FormGroup;
  nomeRedator: string;
  redator: Ministro;
  relator: Ministro;
  acompanharamRelator: Ministro[];

  constructor(
      private _formBuilder: FormBuilder,
      private _processoService: ProcessoService,
      private _resultadoJulgamento: ResultadoJulgamentoService,
      private _ministroService: MinistroService,
      private _route: ActivatedRoute,
  ) {
    this.redatorForm = this._formBuilder.group({
        redator: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.parametros = this._route.snapshot.queryParams as Parametros;

    this._resultadoJulgamento
      .listarDecisoes(this.parametros.processo)
      .subscribe({
        next: (data) => {
          this.dados = data;
          console.log(this.dados);
        }
    });

    this._processoService
      .listarProcessos(new HttpParams().set('processo', this.parametros.processo))
      .subscribe({
        next: ([ processo ]) => {
          const { nome, classe, numero } = processo;
          this.processo = `${classe} ${numero} ${nome}`;
          this.descrissaoSessao = `${this.dados.sessao?.numero}/${this.dados.sessao?.ano}`;
          this.data_fim = new Date(this.dados.sessao?.data_fim);
          this.relator = processo.relator;
          this.nomeRedator = processo.redator?.nome;

          this._processoService
            .obterVotosDoProcesso(this.parametros.processo)
            .subscribe({
              next: (votos) => {
                this.votos = votos;
                this.acompanharamRelator = votos
                    .find(voto => voto.autor?.id == this.relator.id)
                    .acompanharam;
                console.log(this.votos);
            }
          });
        }
    });
  }

  relatorDiverge(): Voto[] {
    const relatorDiverge = this.votos
        .filter(voto => !voto.acompanharam
            .filter(({ id }) => id === this.relator.id)
            .length
        );
    return relatorDiverge;
  }

  autorEAcompanhante(voto: Voto): Ministro[] {
      return [voto.autor, ...voto.acompanharam];
  }

  ministrosString(ministros: Ministro[]): string {
    return ministros.length ? this._ministroService.ministrosString(ministros) +
          (ministros.length == 1 ? ' acompanha': ' acompanham'): '';
  }

  selecionarRedator(): void {
      const form = {
          redator: this.redator
      };
      this.redatorForm.setValue(form);
  }

  informarRedator(): void {
      console.log(this.redator);
  }
}
