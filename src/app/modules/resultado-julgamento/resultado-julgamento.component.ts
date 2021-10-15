import { HttpParams } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseDrawerService } from '@fuse/components/drawer';
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

  dados: any;
  parametros: Parametros;

  aplicarMesmasDecisoesAosProcessos: Processo[] = [];
  votos: Voto[] = [];
  dispositivos: Manifestacao[] = [];
  decisoes: Decisao[] = [];

  readonly FORM_CADASTRO_DECISAO = 'formulario-de-cadastro-de-decisao';

  constructor(
    private _resultadoJulgamento: ResultadoJulgamentoService,
    private _processoService: ProcessoService,
    private _route: ActivatedRoute,
    private _fuseDrawerService: FuseDrawerService,
  ) { 
    
  }

  ngOnInit(): void {
    this.parametros = this._route.snapshot.queryParams as Parametros;

    this._resultadoJulgamento.listarDecisoes(this.parametros.processo).subscribe({
      next: (data) => {
        this.dados = data;
      }
    });

    this._processoService.listarProcessos(new HttpParams().set('processo', this.parametros.processo)).subscribe({
      next: ([processo]) => {
        const { id, classe, numero, abreviacao } = processo;

        this._processoService.obterVotosDoProcesso(`${classe}${numero}-${abreviacao}`).subscribe({
          next: (votos) => {
            this.votos = votos;
          }
        });

        this._processoService.obterDispositivosDoProcesso(id, TipoCapitulo.Merito).subscribe({
          next: (dispositivos) => {
            this.dispositivos = dispositivos;
          }
        });
      }
    });

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

  public abrirGavetaDeFormularioDeDecisao(drawerName: string): void {
      const drawer = this._fuseDrawerService.getComponent(drawerName);
      drawer.toggle();
  }

  @HostListener('window:resize', ['$event'])
  public verificaLarguraDaTela(largura: number = 720): boolean {
    const larguraAtual = window.innerWidth;
    return (larguraAtual > largura);
  }

  @HostListener('window:resize', ['$event'])
  public verificaModoDaTela(largura: number = 720): string {
    const larguraAtual = window.innerWidth;
    return (larguraAtual <= largura) ? 'over' : 'side';
  }

  public voltarAoTopo(): void {
    const menuDecisao = document.getElementById('menu-decisao');
    menuDecisao.scrollTo({top: 0});
  }

  public obterProcessos(processos: Processo[]): void {
    this.aplicarMesmasDecisoesAosProcessos = processos;
  }

}
