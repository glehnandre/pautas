import { HttpParams } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { FuseDrawerService } from '@fuse/components/drawer';
import { DecisoesResultadoJulgamento } from '../acervo/model/interfaces/decisao.interface';
import { Manifestacao } from '../acervo/model/interfaces/manifestacao.interface';
import { Voto } from '../acervo/model/interfaces/voto.interface';
import { ProcessoService } from '../services/processo.service';
import { ResultadoJulgamentoService } from '../services/resultado-julgamento.service';
import { Capitulo } from '../acervo/model/interfaces/capitulo.interface';
import { Processo } from '../acervo/model/interfaces/processo.interface';

interface Parametros {
  processo: number;
  colegiado: string;
}

interface Decisao {
  capitulo: Capitulo;
  processos_mesma_decisao: Processo[];
}

@Component({
  selector: 'app-resultado-julgamento',
  templateUrl: './resultado-julgamento.component.html',
  styleUrls: ['./resultado-julgamento.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultadoJulgamentoComponent implements OnInit {

  @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

  dados: DecisoesResultadoJulgamento;
  parametros: Parametros;
  processo: string;
  votos: Voto[] = [];
  dispositivos: Manifestacao[] = [];
  decisoesAdicionadas: Array<Decisao> = [];
  decisaoSelecionada: Decisao = null;

  readonly FORM_CADASTRO_DECISAO = 'formulario-de-cadastro-de-decisao';

  constructor(
    private _resultadoJulgamento: ResultadoJulgamentoService,
    private _processoService: ProcessoService,
    private _route: ActivatedRoute,
    private _fuseDrawerService: FuseDrawerService,
  ) {}

  ngOnInit(): void {
    this.parametros = this._route.snapshot.queryParams as Parametros;

    this._carregarDecisoes();
    this._carregarProcessos();
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

  public dropped(event: CdkDragDrop<any[]>): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  public marcaDecisaoSelecionada(obj1: Capitulo, obj2: Capitulo): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  public getDecisoes(): Decisao[] {
    if (this.dados && this.dados.decisoes) {
      return [...this.decisoesAdicionadas, ...this.dados.decisoes];
    }

    return this.decisoesAdicionadas;
  }

  public setDecisaoAdicionada(decisao: Decisao): void {
    this.decisoesAdicionadas.push(decisao);
  }

  public setDecisaoSelecionada(decisao: Decisao): void {
    this.decisaoSelecionada = decisao;
  }

  public isMarcarDecisao(decisao: Decisao): boolean {
    return JSON.stringify(decisao) === JSON.stringify(this.decisaoSelecionada);
  }

  public removerDecisao(isRemoverDecisao: boolean): void {
    if (isRemoverDecisao) {
      const index = this.decisoesAdicionadas.findIndex(d => JSON.stringify(d) === JSON.stringify(this.decisaoSelecionada));
      
      if (index !== -1) {
        this.decisoesAdicionadas.splice(index, 1);
        this.setDecisaoSelecionada(null);
      }
    }
  }

  public finalizar(): void {
    alert('Tarefa finalizada');
  }

  private _carregarDecisoes(): void {
    this._resultadoJulgamento.listarDecisoes(this.parametros.processo).subscribe({
      next: (data) => {
        this.dados = data;
      }
    });
  }

  private _carregarProcessos(): void {
    this._processoService.listarProcessos(new HttpParams().set('processo', this.parametros.processo)).subscribe({
      next: ([processo]) => {
        const { nome, classe, numero, abreviacao } = processo;
        this.processo = `${classe} ${numero} ${nome}`;

        this._processoService.obterVotosDoProcesso(`${classe}${numero}-${abreviacao}`).subscribe({
          next: (votos) => {
            this.votos = votos;
          }
        });
      }
    });
  }

}
