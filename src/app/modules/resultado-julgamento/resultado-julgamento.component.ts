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
import { FormIndicacaoImpedimentosComponent } from './form-indicacao-impedimentos/form-indicacao-impedimentos.component';

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
  processo: Processo;
  votos: Voto[] = [];
  dispositivos: Manifestacao[] = [];
  decisoesAdicionadas: Array<Decisao> = [];
  decisaoSelecionada: Decisao = null;
  modelo: ModeloDecisao;
  show = false;
  chips: string[] = [];

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
   * @public Método público
   * @param drawerName Nome do drawer a ser exibido
   * @description Método para exibir ou esconder a gaveta com conteúdo
   * @author Douglas da Silva Monteles
   */
  public abrirGavetaDeFormularioDeDecisao(drawerName: string): void {
    const drawer = this._fuseDrawerService.getComponent(drawerName);
    drawer.toggle();
  }

  /**
   * @public Método público
   * @param largura Tamanho da largura da tela para ser comparado
   * @default largura Valor padrão da largura é 720px
   * @description Método para verificar se a largura atual da tela estar maior 
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
   * @public Método público
   * @param largura Tamanho da largura da tela para ser comparado
   * @default largura Valor padrão da largura é 720px
   * @description Método para atualizar o estilo de gaveta a ser axibido
   * @returns boolean
   * @author Douglas da Silva Monteles
   */
  @HostListener('window:resize', ['$event'])
  public verificarModoDaTela(largura: number = 720): string {
    const larguraAtual = window.innerWidth;
    return (larguraAtual <= largura) ? 'over' : 'side';
  }

  /**
   * @public Método público
   * @param event Evento com os dados que foram arrastados e soltados
   * @description Método para atualizar a ordem da lista de Decisões
   * @author Douglas da Silva Monteles
   */
  public dropped(event: CdkDragDrop<any[]>): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  /**
   * @public Método público
   * @param obj1 Objeto javascript contendo os dados de Capitulo
   * @param obj2 Objeto javascript contendo os dados de Capitulo
   * @description Método para comparar objetos do tipo Capitulo
   * @returns boolean
   * @author Douglas da Silva Monteles
   */
  public marcaDecisaoSelecionada(obj1: Capitulo, obj2: Capitulo): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  /**
   * @public Método público
   * @description Método para obter a lista de Decisoes cadastradas
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
   * @public Método público
   * @param decisao Objeto javascript com os dados de uma decisão
   * @description Método para adicionar uma decisão a lista de decisões
   * @author Douglas da Silva Monteles
   */
  public setDecisaoAdicionada(decisao: Decisao): void {
    this.decisoesAdicionadas.push(decisao);
  }

  /**
   * @public Método público
   * @param decisao Objeto javascript com os dados de uma decisão
   * @description Método para atualizar a decisão que foi selecionada
   * @author Douglas da Silva Monteles
   */
  public setDecisaoSelecionada(decisao: Decisao): void {
    this.decisaoSelecionada = decisao;
  }

  /**
   * @public Método público
   * @param decisao Objeto javascript com os dados de uma decisão
   * @description Método para verificar se uma dada decisão é igual a decisão 
   *              selecionada atualmente
   * @returns boolean
   * @author Douglas da Silva Monteles
   */
  public isMarcarDecisao(decisao: Decisao): boolean {
    return JSON.stringify(decisao) === JSON.stringify(this.decisaoSelecionada);
  }

  /**
   * @public Método público
   * @param isRemoverDecisao Informa se uma decisão deve ser removida da lista
   * @description Método para remover uma decisão da lista de decisões
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
   * @public Método público
   * @description Método para verificar se uma decisão já foi salva via POST, como
   *              critério, é verificado se a decisão possui um capitulo com id
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
   * @public Método público
   * @description Método para recarregar um componente filho sempre que for chamado
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
   * @public Método público
   * @description Método para exibir modal de alteração de modelo de decisão
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
      maxHeight: '90vh',
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
            this._carregarDecisoes(); // atualiza a lista de Vistas
          }
        });
      }
    });
  }

  public exibirModalDeDestaque(): void {
    const dialogfRef = this._dialog.open(FormVistaEDestaqueComponent, {
      maxHeight: '90vh',
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
            this._carregarDecisoes(); // atualiza a lista de Destaque
          }
        });
      }
    });
  }

  public exibirModalDeIndicacaoDeImpedimentos(): void {
    const dialogRef = this._dialog.open(FormIndicacaoImpedimentosComponent, {
      maxHeight: '90vh',
      data: {
        idProcesso: +this.parametros.processo,
      }
    });
    
    dialogRef.afterClosed().subscribe(data => {
      if (data && data === 'ok') {
        console.log(data);
        this._carregarProcessos(); // atualiza os chips de ministros suspeitos e impedidos
      }
    });
  }

  public getDadosDoProcesso(): string {
    if (this.processo) {
      const { classe, numero, nome } = this.processo;
      return `${classe} ${numero} ${nome}`;
    }

    return '';
  }

  public obterChipRemovido(chip: string): void {
    console.log(chip)
  }

  /**
   * @public Método público
   * @description Método para finanizar a tafera de ResultadoJulgamento
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
   * @private Método privado
   * @description Método para carregar todas as decisões salvas via requisão GET
   * @author Douglas da Silva Monteles
   */
  private _carregarDecisoes(): void {
    this._resultadoJulgamento.listarDecisoes(this.parametros.processo).subscribe({
      next: (data) => {
        this.dados = data;
        console.log(this.dados)
      }
    });
  }

  /**
   * @private Método privado
   * @description Método para carregar todos os processos salvos via requisão GET
   * @author Douglas da Silva Monteles
   */
  private _carregarProcessos(): void {
    this._processoService.listarProcessos(new HttpParams().set('processo', this.parametros.processo)).subscribe({
      next: ([processo]) => {
        this.processo = processo;
        console.log(this.processo)

        this._processoService.obterVotosDoProcesso(this.processo.id).subscribe({
          next: (votos) => {
            this.votos = votos;
          }
        });

        this._criarChips();
      }
    });
  }

  private _criarChips(): void {
    this.chips = [];

    const { 
      ministros_impedidos, 
      ministros_suspeitos, 
    } = this.processo;

    ministros_impedidos.forEach(({abreviacao}) => {
      const str = `${abreviacao} - Impedido(a)`;
      this.chips.push(str);
    });

    ministros_suspeitos.forEach(({abreviacao}) => {
      const str = `${abreviacao} - Suspeito(a)`;
      this.chips.push(str);
    });
  }

}
