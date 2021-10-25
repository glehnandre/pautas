import { HttpParams } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuseDrawerService } from '@fuse/components/drawer';
import { TipoCapitulo } from '../acervo/model/enums/tipoCapitulo.enum';
import { Decisao, DecisoesResultadoJulgamento } from '../acervo/model/interfaces/decisao.interface';
import { Manifestacao } from '../acervo/model/interfaces/manifestacao.interface';
import { Processo } from '../acervo/model/interfaces/processo.interface';
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

  dados: DecisoesResultadoJulgamento;
  parametros: Parametros;
  processo: string;

  processosMesmaDecisoes: Processo[] = [];
  aplicarMesmasDecisoesAosProcessos: Processo[] = [];
  votos: Voto[] = [];
  dispositivos: Manifestacao[] = [];
  decisoes: Array<{decisao: Decisao, processos_mesma_decisao: number[]}> = [];
  decisoesSalvasViaPost: Decisao[] = [];
  decisaoSelecionada: {decisao: Decisao, processos_mesma_decisao: number[]};

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
        console.log(this.dados)
        this.processosMesmaDecisoes = [];
        this.dados.decisoes.forEach(({processos_mesma_decisao}) => this.processosMesmaDecisoes.push(...processos_mesma_decisao));
      }
    });

    this._processoService.listarProcessos(new HttpParams().set('processo', this.parametros.processo)).subscribe({
      next: ([processo]) => {
        const { id, nome, classe, numero, abreviacao } = processo;
        this.processo = `${classe} ${numero} ${nome}`;

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

  public obterDadosDaDecisao({decisao, processos_mesma_decisao}): void {
    this.decisoes.push({decisao, processos_mesma_decisao});
  }

  public removerDecisao(decisao: Decisao): void {
    const index = this.decisoes
      .findIndex(dec => JSON.stringify(dec.decisao) === JSON.stringify(decisao));
    
    if (index !== -1) {
      this.decisoes.splice(index, 1);
    }
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

  public alterarDadosDoFormulario(item: {decisao: Decisao, processos_mesma_decisao: number[]}): void {
    this.decisaoSelecionada = item;
  }

  public limparDecisaoSelecionada() {
    this.decisaoSelecionada = null;
  }

  public decisaoSalvaViaPost({decisao}): void {
    const index = this.decisoesSalvasViaPost
      .findIndex(dec => Object.values(dec).toString() === Object.values(decisao).toString());
    
    if (index === -1) {
      this.decisoesSalvasViaPost.push(decisao);
    }

    this.limparDecisaoSelecionada();
  }

  public isDecisaoJaSalva(): boolean {
    const index = this.decisoesSalvasViaPost
      .findIndex(dec => Object.values(dec).toString() === Object.values(this.decisaoSelecionada.decisao).toString());

    return (index !== -1);
  }

}
