import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoCapitulo } from '../acervo/model/enums/tipoCapitulo.enum';
import { Decisao } from '../acervo/model/interfaces/decisao.interface';
import { Manifestacao } from '../acervo/model/interfaces/manifestacao.interface';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { SessaoJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';
import { Voto } from '../acervo/model/interfaces/voto.interface';
import { ProcessoService } from '../services/processo.service';
import { ResultadoJulgamentoService } from '../services/resultado-julgamento.service';


interface Parametros {
  processo: number;
  colegiado: string;
}

@Component({
  selector: 'app-resultado-julgamento',
  templateUrl: './resultado-julgamento.component.html',
  styleUrls: ['./resultado-julgamento.component.scss'],
})
export class ResultadoJulgamentoComponent implements OnInit {

  dados: { decisoes: Decisao[], processo: Processo, sessao: SessaoJulgamento };
  parametros: Parametros;

  processosPorTags: Processo[] = [];
  processosSelecioandos: Processo[] = [];
  votos: Voto[] = [];
  dispositivos: Manifestacao[] = [];

  decisoes: Decisao[] = [];

  constructor(
    private _resultadoJulgamento: ResultadoJulgamentoService,
    private _processoService: ProcessoService,
    private _route: ActivatedRoute,
  ) { 
    
  }

  ngOnInit(): void {
    this.parametros = this._route.snapshot.queryParams as Parametros;

    this._resultadoJulgamento.listarDecisoes(this.parametros.processo).subscribe({
      next: (data) => {
        this.dados = data;
        console.log(this.dados)

        const tags = this.dados.processo.lista.map(tag => tag.id);

        this._processoService.listarProcessos(new HttpParams().set('tag', tags.toString())).subscribe({
          next: (processos) => {
            setTimeout(() => {
              this.processosPorTags = processos;
            }, 3000)
          }
        });

        const processoId = this.dados.processo.id;

        this._processoService.obterVotosDoProcesso(processoId).subscribe({
          next: (votos) => {
            this.votos = votos;
          }
        });

        this._processoService.obterDispositivosDoProcesso(processoId, TipoCapitulo.Merito).subscribe({
          next: (dispositivos) => {
            this.dispositivos = dispositivos;
          }
        });
      }
    });

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

  public obterDadosDaDecisao(decisao: Decisao): void {
    this.decisoes.push(decisao);
  }

  public removerDecisao(decisao: Decisao): void {
    const index = this.decisoes
      .findIndex(dec => JSON.stringify(dec) === JSON.stringify(decisao));
    
    if (index !== -1) {
      this.decisoes.splice(index, 1);
    }
  }

  public getDadosProcesso(): string {
    if (this.dados && this.dados.processo) {
      const { classe, numero, nome } = this.dados.processo;
      return `${classe} ${numero} ${nome}`;
    }

    return 'Aguarde...';
  }

}
