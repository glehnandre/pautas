import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AlertaService } from 'app/modules/services/alerta.service';
import { SessaoDeJulgamentoService } from 'app/modules/services/sessao-de-julgamento.service';
import { SituacaoDoProcesso } from 'app/shared/model/enums/situacaoDoProcesso.enum';
import { Processo } from '../model/interfaces/processo.interface';
import { SessaoDeJulgamento } from '../model/interfaces/sessao-julgamento.interface';



@Component({
  selector: 'digital-processos-solicitacao-extraordinaria',
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
