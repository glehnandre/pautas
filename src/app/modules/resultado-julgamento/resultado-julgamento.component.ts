import { HttpParams } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterContentChecked, AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnChanges, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuseDrawerService } from '@fuse/components/drawer';
import { DecisoesResultadoJulgamento } from '../acervo/model/interfaces/decisao.interface';
import { Manifestacao } from '../acervo/model/interfaces/manifestacao.interface';
import { Voto } from '../acervo/model/interfaces/voto.interface';
import { ProcessoService } from '../services/processo.service';
import { ResultadoJulgamentoService } from '../services/resultado-julgamento.service';
import { Capitulo } from '../acervo/model/interfaces/capitulo.interface';
import { Processo } from '../acervo/model/interfaces/processo.interface';
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
export class ResultadoJulgamentoComponent implements OnInit, OnDestroy, AfterContentChecked {

  dados: DecisoesResultadoJulgamento;
  parametros: Parametros;
  processo: Processo;
  votos: Voto[] = [];
  dispositivos: Manifestacao[] = [];
  decisoesAdicionadas: Array<Decisao> = [];
  todasAsDecisoes: Decisao[] = [];
  decisaoSelecionada: Decisao = null;
  modelo: ModeloDecisao;
  exibirListaDeDecisoes = false;
  exibirChips = true;
  chips: Array<{id?: number; nome: string}> = [];

  readonly FORM_CADASTRO_DECISAO = 'formulario-de-cadastro-de-decisao';

  constructor(
    private _resultadoJulgamento: ResultadoJulgamentoService,
    private _processoService: ProcessoService,
    private _route: ActivatedRoute,
    private _fuseDrawerService: FuseDrawerService,
    private _dialog: MatDialog,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.parametros = this._route.snapshot.queryParams as Parametros;
    this._carregarProcessos();
    this._carregarDecisoes();
    //this.cd.detectChanges();
  }

  ngAfterContentChecked(): void {
    //this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    //this.cd.detectChanges();
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
    console.log(event.container.data)
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
   * @author Douglas da Silva Monteles
   */
  public getDecisoes(): void {
    if (this.dados && this.dados.decisoes) {
      this.todasAsDecisoes = [ ...this.decisoesAdicionadas, ...this.dados.decisoes ];
    } else {
      this.todasAsDecisoes = [ ...this.decisoesAdicionadas ];
    }
  }

  /**
   * @public Método público
   * @param decisao Objeto javascript com os dados de uma decisão
   * @description Método para adicionar uma decisão a lista de decisões
   * @author Douglas da Silva Monteles
   */
  public addDecisao(decisao: Decisao): void {
    this.todasAsDecisoes.push(decisao);
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
  public excluirDecisao(decisao: Decisao): void {
     const index = this.todasAsDecisoes
       .findIndex(d => JSON.stringify(d) === JSON.stringify(this.decisaoSelecionada));
     console.log("EXCLUIR UMA DECISAO")
     console.log(index);
     if (index !== -1) {
       this.todasAsDecisoes.splice(index, 1);
       this.setDecisaoSelecionada(null);
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
   * @param show Atributo que controla a exibição do componente
   * @description Método para recarregar um componente filho sempre que for chamado
   * @returns boolean
   * @author Douglas da Silva Monteles
   */
  public recarregarListaDeDecisoes(): void {
    this.exibirListaDeDecisoes = false;

    setTimeout(() => {
      this.exibirListaDeDecisoes = true;
    }, 500);
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

  /**
   * @public Método público
   * @description Método para exibir modal de cadastro de Vista
   * @author Douglas da Silva Monteles
   */
  public exibirModalDeVista(id?: number): void {
    const dialogfRef = this._dialog.open(FormVistaEDestaqueComponent, {
      maxHeight: '90vh',
      data: {
        titulo: 'Informar Vista',
        dados: this._obterDadosDaVistaNaListaDeDecisoes(id),
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

  /**
   * @public Método público
   * @description Método para exibir modal de cadastro de Destaque
   * @author Douglas da Silva Monteles
   */
  public exibirModalDeDestaque(id?: number): void {
    const dialogfRef = this._dialog.open(FormVistaEDestaqueComponent, {
      maxHeight: '90vh',
      data: {
        titulo: 'Informar Destaque',
        dados: this._obterDadosDoDestaqueNaListaDeDecisoes(id),
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

  /**
   * @public Método público
   * @description Método para exibir modal de cadastro de Indicação de Impedimentos
   * @author Douglas da Silva Monteles
   */
  public exibirModalDeIndicacaoDeImpedimentos(): void {
    const dialogRef = this._dialog.open(FormIndicacaoImpedimentosComponent, {
      maxHeight: '90vh',
      data: {
        idProcesso: +this.parametros.processo,
        resultado: {
          ministrosImpedidos: this.processo.ministros_impedidos,
          ministrosSuspeitos: this.processo.ministros_suspeitos,
        }
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data && data === 'ok') {
        this.processo = null;       // A mudança no valor do processo força uma nova renderização do componente
        this._carregarProcessos();  // Atualiza os chips de ministros suspeitos e impedidos
      }
    });
  }

  /**
   *
   * @param event
   */
  public abrirModal(event: {click: boolean, chip: {id?:number; nome: string}}): void {
    const str = event.chip.nome.toLocaleLowerCase();

    if (event.click) {
      const id: number = +event.chip.id;

      if (str.includes('vista')) {
        this.exibirModalDeVista(id);
      } else if (str.includes('destaque')) {
        this.exibirModalDeDestaque(id);
      } else {
        this.exibirModalDeIndicacaoDeImpedimentos();
      }
    }
  }

  /**
   * @public Método público
   * @description Método para concatenar algumas informações sobre o processo
   * @author Douglas da Silva Monteles
   */
  public getDadosDoProcesso(): string {
    if (this.processo) {
      const { classe, numero, nome } = this.processo;
      return `${classe} ${numero} ${nome}`;
    }

    return '';
  }

  /**
   * @public Método público
   * @param chip Conteúdo exibido no chip
   * @description Método que recebe a string do chip e separa o tipo (Vista ou
   *              Destaque) e o seu respectivo id.
   * @author Douglas da Silva Monteles
   */
  public obterChipRemovido(chip: {id?:number; nome: string}): void {
    try {
      const tipo: string = chip.nome.split(' ')[0].toLocaleLowerCase();
      const id: number = +chip.id;

      if (tipo === 'vista') {
        this._processoService.excluirVistaDoProcesso(this.parametros.processo, id)
          .subscribe({
            next: () => {
              console.log(`Vista ${id} excluida`);
            }
          });
      } else { // destaque
        this._processoService.excluirDestaqueDoProcesso(this.parametros.processo, id)
          .subscribe({
            next: () => {
              console.log(`Destaque ${id} excluida`);
            }
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

	/**
   * @public Método público
   * @description Método obter os nomes dos chips
   * @author Douglas da Silva Monteles
   */
  public obterNomeDosChips(): string[] {
		return this.chips.map(chip => chip.nome);
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
        this.getDecisoes();
        this._criarChips();
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
        this.cd.detectChanges();
        this._criarChips();
        console.log(this.processo)

        this._processoService.obterVotosDoProcesso(this.processo.id).subscribe({
          next: (votos) => {
            this.votos = votos;
          }
        });
      }
    });
  }

  /**
   * @private Método privado
   * @description Método que cria uma lista de chips com os dados dos ministros
   *              impedidos ou suspeitos e com os dados de vistas e destaques.
   * @author Douglas da Silva Monteles
   */
  private _criarChips(): void {
    this.chips = [];

    if (this.dados) {
      this.dados.decisoes.forEach(({vistas, destaques}) => {
        vistas.forEach(({id, ministro}) => {
          const str = `Vista - ${ministro['abreviacao']}`;
          this.chips.push({ id, nome: str });
        });

        destaques.forEach(({id, ministro}) => {
          const str = `Destaque - ${ministro['abreviacao']}`;
          this.chips.push({ id, nome: str });
        });
      });
    }

    if (this.processo) {
      const {
        ministros_impedidos,
        ministros_suspeitos,
      } = this.processo;

      ministros_impedidos.forEach(({abreviacao}) => {
        const str = `Impedido(a) - ${abreviacao}`;
        this.chips.push({nome: str});
      });

      ministros_suspeitos.forEach(({abreviacao}) => {
        const str = `Suspeito(a) - ${abreviacao}`;
        this.chips.push({nome: str});
      });
    }

    this.cd.detectChanges();
  }

  private _obterDadosDaVistaNaListaDeDecisoes(id: number): Vista {
    let vista: Vista = null;

    this.dados.decisoes.forEach(dec => {
      vista = dec.vistas.find(v => v.id === id);
    });

    return vista;
  }

  private _obterDadosDoDestaqueNaListaDeDecisoes(id: number): Vista {
    let destaque: Destaque = null;

    this.dados.decisoes.forEach(dec => {
      destaque = dec.destaques.find(d => d.id === id);
    });

    return destaque;
  }

}
