import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SituacaoDoProcesso } from 'app/modules/acervo/model/enums/situacaoDoProcesso.enum';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { AlertaService } from 'app/modules/services/alerta.service';
import { SessaoDeJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface';
import { SessaoDeJulgamentoService } from 'app/modules/services/sessao-de-julgamento.service';

@Component({
  selector: 'app-processos-solicitacao-extraordinaria',
  templateUrl: './processos-solicitacao-extraordinaria.component.html',
  styleUrls: ['./processos-solicitacao-extraordinaria.component.scss']
})
export class ProcessosSolicitacaoExtraordinariaComponent implements OnInit, OnChanges {

  @Input() sessao: SessaoDeJulgamento;
  @Input() ngClass: string;

  processos: Processo[] = [];

  errorMessage: string;

  constructor(
    private _alertaService: AlertaService,
    private _sessaoDeJulgamentoService: SessaoDeJulgamentoService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.sessao) {
        const { numero, ano, data_inicio, data_fim } = this.sessao;
        this._sessaoDeJulgamentoService.listarProcessosPautadosNasSessoes(
            numero,
            ano,
            SituacaoDoProcesso.Pautado,
            data_inicio,
            data_fim
        ).subscribe({
            next: (processos) => {
                this.processos = processos;
            },
            error: (error) => {
              console.log(error);
              this.errorMessage = error.message
              this._alertaService.exibirAlerta("Error");
            }
        });
    }
  }

}
