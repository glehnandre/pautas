import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ministro } from '../acervo/model/interfaces/ministro.interface';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { Voto } from '../acervo/model/interfaces/voto.interface';
import { ProcessoService } from '../services/processo.service';
import { ResultadoJulgamentoService } from '../services/resultado-julgamento.service';

@Component({
  selector: 'app-resultado-julgamento',
  templateUrl: './resultado-julgamento.component.html',
  styleUrls: ['./resultado-julgamento.component.scss'],
})
export class ResultadoJulgamentoComponent implements OnInit {

  dados: any;

  processosPorTags: Processo[] = [];
  processosSelecioandos: Processo[] = [];
  votos: Voto[] = [];
  descrissaoSessao: string;
  data_fim: string;

  constructor(
    private _resultadoJulgamento: ResultadoJulgamentoService,
    private _processoService: ProcessoService,
  ) {

  }

  ngOnInit(): void {
    this._resultadoJulgamento.listarDecisoes().subscribe({
      next: (data) => {
        this.dados = data;
        console.log(data)

        const tags = this.dados.processo.lista.map(tag => tag.id);

        this._processoService.listarProcessos(new HttpParams().set('tag', tags)).subscribe({
          next: (processos) => {
            setTimeout(() => {
              this.processosPorTags = processos;
            }, 3000)
          }
        });

        this.descrissaoSessao = `${this.dados.sessao?.numero}/${this.dados.sessao?.ano}`;

        const data_fim = new Date(this.dados.sessao?.data_fim);
        this.data_fim = this.formatData(data_fim);

        const { classe, numero, abreviacao } = this.dados.processo;

        this._processoService.obterVotosDoProcesso(`${classe}${numero}-${abreviacao}`).subscribe({
          next: (votos) => {
            this.votos = votos;
          }
        });
      }
    });

  }

  private formatData(data: Date): string {
    const dia = ("00" + data.getDate()).slice(-2);
    const mes = ("00" + (data.getMonth() + 1)).slice(-2);
    const ano = ("00" + data.getFullYear()).slice(-4);
    return `${dia}/${mes}/${ano}`;
  }

  public aplicarAsMesmasDecisoes(processo: Processo) {
    const index = this.processosSelecioandos.findIndex(p => p.id === processo.id);

    if (index !== -1) {
      this.processosSelecioandos.splice(index, 1);
    } else {
      this.processosSelecioandos.push(processo);
    }

    console.log(this.processosSelecioandos)
  }

}
