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
import { SessaoJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';
import { Capitulo } from '../acervo/model/interfaces/capitulo.interface';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { RecursoService } from '../services/recurso.service';
import { MatDialog } from '@angular/material/dialog';
import { FormModeloDecisaoComponent } from './form-modelo-decisao/form-modelo-decisao.component';
import { ModeloDecisao } from '../acervo/model/interfaces/modeloDecisao.interface';
import { FormVistaEDestaqueComponent } from './form-vista-e-destaque/form-vista-e-destaque.component';
import { Vista } from '../acervo/model/interfaces/vista.interface';
import { Destaque } from '../acervo/model/interfaces/destaque.interface';
import { FormRelatorComponent } from './form-relator/form-relator.component';

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

  dados: DecisoesResultadoJulgamento;
  parametros: Parametros;
  processo: string;
  votos: Voto[] = [];
  dispositivos: Manifestacao[] = [];
  decisoesAdicionadas: Array<Decisao> = [];
  decisaoSelecionada: Decisao = null;
  modelo: ModeloDecisao;
  show = false;

  readonly FORM_CADASTRO_DECISAO = 'formulario-de-cadastro-de-decisao';

  constructor(
    private _resultadoJulgamento: ResultadoJulgamentoService,
    private _processoService: ProcessoService,
    private _route: ActivatedRoute,
    private _fuseDrawerService: FuseDrawerService,
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.parametros = this._route.snapshot.queryParams as Parametros;

    this._carregarDecisoes();
    this._carregarProcessos();
  }

  /**
   * @public M??todo p??blico
   * @param drawerName Nome do drawer a ser exibido
   * @description M??todo para exibir ou esconder a gaveta com conte??do
   * @author Douglas da Silva Monteles
   */
  public abrirGavetaDeFormularioDeDecisao(drawerName: string): void {
    const drawer = this._fuseDrawerService.getComponent(drawerName);
    drawer.toggle();
  }

  /**
   * @public M??todo p??blico
   * @param largura Tamanho da largura da tela para ser comparado
   * @default largura Valor padr??o da largura ?? 720px
   * @description M??todo para verificar se a largura atual da tela estar maior 
   *              que a largura informada
   * @returns boolean
   * @author Douglas da Silva Monteles
   */
  @HostListener('window:resize', ['$event'])
  public verificarLarguraDaTela(largura: number = 720): boolean {
    const larguraAtual = window.innerWidth;
    return (larguraAtual > largura);
  }

  /**
   * @public M??todo p??blico
   * @param largura Tamanho da largura da tela para ser comparado
   * @default largura Valor padr??o da largura ?? 720px
   * @description M??todo para atualizar o estilo de gaveta a ser axibido
   * @returns boolean
   * @author Douglas da Silva Monteles
   */
  @HostListener('window:resize', ['$event'])
  public verificarModoDaTela(largura: number = 720): string {
    const larguraAtual = window.innerWidth;
    return (larguraAtual <= largura) ? 'over' : 'side';
  }

  /**
   * @public M??todo p??blico
   * @param event Evento com os dados que foram arrastados e soltados
   * @description M??todo para atualizar a ordem da lista de Decis??es
   * @author Douglas da Silva Monteles
   */
  public dropped(event: CdkDragDrop<any[]>): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  /**
   * @public M??todo p??blico
   * @param obj1 Objeto javascript contendo os dados de Capitulo
   * @param obj2 Objeto javascript contendo os dados de Capitulo
   * @description M??todo para comparar objetos do tipo Capitulo
   * @returns boolean
   * @author Douglas da Silva Monteles
   */
  public marcaDecisaoSelecionada(obj1: Capitulo, obj2: Capitulo): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  /**
   * @public M??todo p??blico
   * @description M??todo para obter a lista de Decisoes cadastradas
   * @returns Array<Decisao>
   * @author Douglas da Silva Monteles
   */
  public getDecisoes(): Decisao[] {
    if (this.dados && this.dados.decisoes) {
      return [...this.decisoesAdicionadas, ...this.dados.decisoes];
    }

    return this.decisoesAdicionadas;
  }

  /**
   * @public M??todo p??blico
   * @param decisao Objeto javascript com os dados de uma decis??o
   * @description M??todo para adicionar uma decis??o a lista de decis??es
   * @author Douglas da Silva Monteles
   */
  public setDecisaoAdicionada(decisao: Decisao): void {
    this.decisoesAdicionadas.push(decisao);
  }

  /**
   * @public M??todo p??blico
   * @param decisao Objeto javascript com os dados de uma decis??o
   * @description M??todo para atualizar a decis??o que foi selecionada
   * @author Douglas da Silva Monteles
   */
  public setDecisaoSelecionada(decisao: Decisao): void {
    this.decisaoSelecionada = decisao;
  }

  /**
   * @public M??todo p??blico
   * @param decisao Objeto javascript com os dados de uma decis??o
   * @description M??todo para verificar se uma dada decis??o ?? igual a decis??o 
   *              selecionada atualmente
   * @returns boolean
   * @author Douglas da Silva Monteles
   */
  public isMarcarDecisao(decisao: Decisao): boolean {
    return JSON.stringify(decisao) === JSON.stringify(this.decisaoSelecionada);
  }

  /**
   * @public M??todo p??blico
   * @param isRemoverDecisao Informa se uma decis??o deve ser removida da lista
   * @description M??todo para remover uma decis??o da lista de decis??es
   * @author Douglas da Silva Monteles
   */
  public removerDecisao(isRemoverDecisao: boolean): void {
    if (isRemoverDecisao) {
      const index = this.decisoesAdicionadas
        .findIndex(d => JSON.stringify(d) === JSON.stringify(this.decisaoSelecionada));
      
      if (index !== -1) {
        this.decisoesAdicionadas.splice(index, 1);
        this.setDecisaoSelecionada(null);
      }
    }
  }

  /**
   * @public M??todo p??blico
   * @description M??todo para verificar se uma decis??o j?? foi salva via POST, como
   *              crit??rio, ?? verificado se a decis??o possui um capitulo com id
   * @returns boolean
   * @author Douglas da Silva Monteles
   */
  public isDecisaoSalva(): boolean {
    if (this.decisaoSelecionada.capitulo.id !== undefined && this.decisaoSelecionada.capitulo.id > 0) {
      return true;
    }
    return false;
  }

  /**
   * @public M??todo p??blico
   * @description M??todo para recarregar um componente filho sempre que for chamado
   * @returns boolean
   * @author Douglas da Silva Monteles
   */
  public recarregarComponenteFilho(): void {
    this.show = false;
 
    setTimeout(() => {
      this.show = true
    }, 100);
  }

  /**
   * @public M??todo p??blico
   * @description M??todo para exibir modal de altera????o de modelo de decis??o
   * @author Douglas da Silva Monteles
   */
  public exibirModalDeModeloDecisao(): void {
    const dialogRef = this._dialog.open(FormModeloDecisaoComponent, {
      maxHeight: '90vh',
      data: {
        processo: {
          id: this.processo,
        },
      }
    });

    dialogRef.afterClosed().subscribe((modelo: ModeloDecisao) => {
      this.modelo = modelo;
    });
  }

  public exibirModalDeVista(): void {
    const dialogfRef = this._dialog.open(FormVistaEDestaqueComponent, {
      data: {
        titulo: 'Informar Vista',
      }
    });

    dialogfRef.afterClosed().subscribe((data: Vista) => {
      if (data) {
        const vista: Vista = {
          ...data,
          processo: +this.parametros.processo,
          sessao: this.dados.sessao.numero,
        };

        this._processoService.salvarVistaDoProcesso(this.parametros.processo, vista).subscribe({
          next: (data) => {
            console.log(data);
          }
        });
      }
    });
  }

  public exibirModalDeDestaque(): void {
    const dialogfRef = this._dialog.open(FormVistaEDestaqueComponent, {
      data: {
        titulo: 'Informar Destaque',
      }
    });

    dialogfRef.afterClosed().subscribe((data: Destaque) => {
      if (data) {
        const destaque: Destaque = {
          ...data,
          processo: +this.parametros.processo,
          sessao: this.dados.sessao.numero,
        };

        this._processoService.salvarDestaqueDoProcesso(this.parametros.processo, destaque).subscribe({
          next: (data) => {
            console.log(data);
          }
        });
      }
    });
  }

  /**
   * @public M??todo p??blico
   * @description M??todo para finanizar a tafera de ResultadoJulgamento
   * @author Douglas da Silva Monteles
   */
  public finalizar(): void {
    const dialogRef = this._dialog.open(FormRelatorComponent, {
      data: {
        idProcesso: +this.parametros.processo,
      }
    });

    dialogRef.afterClosed().subscribe(data => {});
  }

  /**
   * @private M??todo privado
   * @description M??todo para carregar todas as decis??es salvas via requis??o GET
   * @author Douglas da Silva Monteles
   */
  private _carregarDecisoes(): void {
    this._resultadoJulgamento.listarDecisoes(this.parametros.processo).subscribe({
      next: (data) => {
        this.dados = data;
      }
    });
  }

  /**
   * @private M??todo privado
   * @description M??todo para carregar todos os processos salvos via requis??o GET
   * @author Douglas da Silva Monteles
   */
  private _carregarProcessos(): void {
    this._processoService.listarProcessos(new HttpParams().set('processo', this.parametros.processo)).subscribe({
      next: ([processo]) => {
        const { id, classe, numero, nome } = processo;
        this.processo = `${classe} ${numero} ${nome}`;

        this._processoService.obterVotosDoProcesso(id).subscribe({
          next: (votos) => {
            this.votos = votos;
          }
        });
      }
    });
  }

}
