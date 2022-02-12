import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseDrawerService } from '@fuse/components/drawer';
import { Alerta } from 'app/shared/alerta/alerta.component';
import { Capitulo } from 'app/shared/model/interfaces/capitulo.interface';
import { Destaque } from 'app/shared/model/interfaces/destaque.interface';
import { Manifestacao } from 'app/shared/model/interfaces/manifestacao.interface';
import { Ministro } from 'app/shared/model/interfaces/ministro.interface';
import { ModeloDecisao } from 'app/shared/model/interfaces/modeloDecisao.interface';
import { Processo } from 'app/shared/model/interfaces/processo.interface';
import { SessaoDeJulgamento } from 'app/shared/model/interfaces/sessao-julgamento.interface';
import { Vista } from 'app/shared/model/interfaces/vista.interface';
import { Voto } from 'app/shared/model/interfaces/voto.interface';
import { AlertaService } from '../services/alerta.service';
import { MinistroService } from '../services/ministro.service';
import { ProcessoService } from '../services/processo.service';
import { SessaoDeJulgamentoService } from '../services/sessao-de-julgamento.service';
import { FormIndicacaoImpedimentosComponent } from './form-indicacao-impedimentos/form-indicacao-impedimentos.component';
import { FormModeloDecisaoComponent } from './form-modelo-decisao/form-modelo-decisao.component';
import { FormRelatorComponent } from './form-relator/form-relator.component';
import { FormVistaEDestaqueComponent } from './form-vista-e-destaque/form-vista-e-destaque.component';






interface Parametros {
  processo: number;
  colegiado: string;
  numero: number;
  ano: number;
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

  parametros: Parametros;
  processo: Processo;
  sessao: SessaoDeJulgamento;
  votos: Voto[] = [];
  dispositivos: Manifestacao[] = [];
  todosCapitulos: Capitulo[] = [];
  capituloSelecionado: Capitulo = null;
  modelo: ModeloDecisao;
  exibirListaDeDecisoes = false;
  exibirChips = true;
  chips: Array<{id?: number; nome: string}> = [];

  alerta: Alerta = {} as Alerta;

  readonly FORM_CADASTRO_DECISAO = 'formulario-de-cadastro-de-decisao';

  constructor(
    private _ministroService: MinistroService,
    private _processoService: ProcessoService,
    private _sessaoDeJulgamentoService: SessaoDeJulgamentoService,
    private _route: ActivatedRoute,
    private _alertaService: AlertaService,
    private _fuseDrawerService: FuseDrawerService,
    private _dialog: MatDialog,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._route.queryParams.subscribe((params: Parametros) => {
      this.parametros = params;
    });

    this._carregarDadosProcessos();

    this._carregarSessaoDeJulgamento(this.parametros.numero, this.parametros.ano);
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
   * @param decisao Objeto javascript com os dados de uma decisão
   * @description Método para adicionar uma decisão a lista de decisões
   * @author Douglas da Silva Monteles
   */
  public adicionarCapitulo(capitulo: Capitulo): void {
    this.todosCapitulos.push(capitulo);
  }

  /**
   * @public Método público
   * @param decisao Objeto javascript com os dados de uma decisão
   * @description Método para atualizar a decisão que foi selecionada
   * @author Douglas da Silva Monteles
   */
  public setCapituloSelecionado(capitulo: Capitulo): void {
    this.capituloSelecionado = capitulo;
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
    return JSON.stringify(decisao) === JSON.stringify(this.capituloSelecionado);
  }

  /**
   * @public Método público
   * @param isRemoverDecisao Informa se uma decisão deve ser removida da lista
   * @description Método para remover uma decisão da lista de decisões
   * @author Douglas da Silva Monteles
   * TODO andre.glehn falta remover do servidor
   */
  public atualizarCapitulos(capitulos: Capitulo[]): void {
       this.todosCapitulos = capitulos;
       this.setCapituloSelecionado(null);
  }

  /**
   * @public Método público
   * @description Método para verificar se uma decisão já foi salva via POST, como
   *              critério, é verificado se a decisão possui um capitulo com id
   * @returns boolean
   * @author Douglas da Silva Monteles
   */
  public habilitarUpdate(): boolean {
    if (this.capituloSelecionado.id !== undefined && this.capituloSelecionado.id > 0) {
      return false;
    }
    return true;
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
    interface Retorno { modelo: ModeloDecisao, dispositivo: string, recurso: string }
    dialogRef.afterClosed().subscribe(({ modelo, dispositivo, recurso } : Retorno ) => {
      if(modelo) {
        this.modelo = modelo;
        this.mostrarAlerta('success', 'Modelo Cadastrado com Sucesso',
          `O modelo de texto para
          ${ modelo.classe },
          ${ modelo.tipoCapitulo },
          ${ dispositivo} e
          ${ recurso } foi incluída com sucesso.\n
          ${ modelo.texto }`);
      }
      else {
        this.mostrarAlerta('error', 'Erro ao cadastrar modelo', 'Tente Novamente Mais Tarde');
      }
    });
  }

  private alertaVistaEDestaque(tipo: string, ministro: Ministro): void {
    if(ministro) {
        this.mostrarAlerta('success', 'Sucesso', `
          ${ tipo }
          ${ this._ministroService.generoEPlural([ministro],
            { F: 'da Ministra', M: 'do Ministro' })}
          ${ ministro.nome }
          incluíd${ tipo == 'Vista'? 'a': 'o'} com sucesso!
        `);
    } else {
        this.mostrarAlerta('error', `Erro ao Cadastrar ${ tipo }`, 'Tente Novamente Mais Tarde');
    }
  }

  /**
   * @public Método público
   * @description Método para exibir modal de cadastro de Vista
   * @author Douglas da Silva Monteles
   */
  public exibirModalDeVista(id?: number): void {
    const ministro = this._obterDadosDaVistaNaListaDeDecisoes(id)?.ministro || null;

    const dialogfRef = this._dialog.open(FormVistaEDestaqueComponent, {
      maxHeight: '180vh',
      data: {
        titulo: 'Informar Vista',
        tipo: 'vista',
        dados: this._obterDadosDaVistaNaListaDeDecisoes(id),
      }
    });

    dialogfRef.afterClosed().subscribe(data => {
      if (data === 'excluir') {
        this._processoService.excluirVistaDoProcesso(this.parametros.numero, this.parametros.ano, this.parametros.processo, id)
          .subscribe({
            next: () => {
              this.mostrarAlerta('success', 'Sucesso!', `A Vista - ${ministro['nome']} foi excluída com sucesso.`);
              this._carregarDadosProcessos(); // atualiza a lista de Destaque
            },

            error: () => {
              this.mostrarAlerta('error', 'Erro!', 'Ocorreu um erro no processamento de sua solicitação.');
            },
        });
      } else if (data) {
        console.log(this.sessao)
        const vista: Vista = {
          ...data,
          processo: +this.parametros.processo,
          sessao: this.sessao.id,
        };

        this._processoService.salvarVistaDoProcesso(this.parametros.numero, this.parametros.ano, this.parametros.processo, vista).subscribe({
          next: (vistaSalva) => {
            this._carregarDadosProcessos(); // atualiza a lista de Vistas
            console.log("VISTA SALVA:");
            console.log(vistaSalva);
            this.alertaVistaEDestaque('Vista', vistaSalva['ministro']);
          },
          error: (error) => {
            console.log(error);
            this.mostrarAlerta("error", "Error", error.message);
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
    const ministro = this._obterDadosDoDestaqueNaListaDeDecisoes(id)?.ministro || null;

    const dialogfRef = this._dialog.open(FormVistaEDestaqueComponent, {
      maxHeight: '90vh',
      data: {
        titulo: 'Informar Destaque',
        tipo: 'destaque',
        dados: this._obterDadosDoDestaqueNaListaDeDecisoes(id),
      }
    });

    dialogfRef.afterClosed().subscribe(data => {
      console.log(data)
      if (data === 'excluir') {
        this._processoService.excluirDestaqueDoProcesso(this.parametros.numero, this.parametros.ano, this.parametros.processo, id)
          .subscribe({
            next: () => {
              this.mostrarAlerta('success', 'Sucesso!', `O Destaque - ${ministro['nome']} foi excluído com sucesso.`);
              this._carregarDadosProcessos(); // atualiza a lista de Destaque
            },
            
            error: () => {
              this.mostrarAlerta('error', 'Erro!', 'Ocorreu um erro no processamento de sua solicitação.');
            },
          });
      } else if (data) {
        const destaque: Destaque = {
          ...data,
          processo: +this.parametros.processo,
          sessao: this.sessao.id,
        };

        this._processoService.salvarDestaqueDoProcesso(this.parametros.numero, this.parametros.ano, this.parametros.processo, destaque).subscribe({
          next: (destaqueSalvo) => {
            this._carregarDadosProcessos(); // atualiza a lista de Destaque

            this.alertaVistaEDestaque('Destaque', destaqueSalvo['ministro']);
          },
          error: (error) => {
            console.log(error);
            this.mostrarAlerta("error", "Error", error.message);
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
        sessao: this.sessao,
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
        this._carregarDadosProcessos();  // Atualiza os chips de ministros suspeitos e impedidos
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
      const { classe, numero, cadeia } = this.processo;
      return `${classe} ${numero} ${cadeia}`;
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
          this._processoService.excluirVistaDoProcesso(this.parametros.numero, this.parametros.ano, this.parametros.processo, id)
            .subscribe({
              next: () => {
                this.mostrarAlerta('success', 'Sucesso!', `A ${chip.nome} foi excluída com sucesso.`);
              },
              error: (error) => {
                console.log(error);
                this.mostrarAlerta("error", "Error", error.message);
              }
            });
        } else { // destaque
          this._processoService.excluirDestaqueDoProcesso(this.parametros.numero, this.parametros.ano, this.parametros.processo, id)
            .subscribe({
              next: () => {
                this.mostrarAlerta('success', 'Sucesso!', `O ${chip.nome} foi excluído com sucesso.`);
              },
              error: (error) => {
                console.log(error);
                this.mostrarAlerta("error", "Error", error.message);
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

    if(this.processo.capitulos.length>0){
      const dialogRef = this._dialog.open(FormRelatorComponent, {
        data: { 
          sessao: this.sessao,       
          processo: this.processo
        }
      });
  
      dialogRef.afterClosed().subscribe(data => {
        console.log("POS SALVAMENTO RELATOR");
        console.log(data);
        if(data.status){
          console.log("MOSTRA ALERTA");
          this.mostrarAlerta('success', 'Sucesso',
            `O Resultado da Sessão de Julgamento foi lançada com sucesso`);
        }else{
          this.mostrarAlerta('error','Erro ao finalizar a publicação', data.mensagem_tratada);
        }
      });
    }else{
      this._processoService.finalizarJulgamentoProcesso(this.parametros.numero, this.parametros.ano, this.processo).subscribe({
        next: (data) => {
          this.mostrarAlerta('success','Sucesso', data);
        },
        error: (data) => {
          console.log(data);
        }
      });
    }
    
  }

  /**
   * @private Método privado
   * @description Método para carregar todos os processos salvos via requisão GET
   * @author Douglas da Silva Monteles
   */
  private _carregarDadosProcessos(): void {
    this._processoService.listarProcessoJulgamento(this.parametros.processo, this.parametros.numero, this.parametros.ano).subscribe({
      next: (processo) => {
        this.processo = processo;
        this.todosCapitulos = processo.capitulos;
        this.cd.detectChanges();
        console.log("ESSES SAO OS DADOS DO PROCESSO CARREGADOS NO PROCESSO...");
        console.log(processo);
        this._criarChips();

        this._processoService.obterVotosDoProcesso(this.processo.id).subscribe({
          next: (votos) => {
            this.votos = votos;
            console.log(this.votos)
          },
          error: (error) => {
            console.log(error);
            this.mostrarAlerta("error", "Error", error.message);
          }
        });
      },
      error: (error) => {
        console.log(error);
        this.mostrarAlerta("error", "Error", error.message);
      }
      
    });
  }

    /**
   * @private Método privado
   * @description Método para carregar as informações da Sessao de julgamento
   * @author Douglas da Silva Monteles
   */
     private _carregarSessaoDeJulgamento(numero: number, ano: number): void {
      this._sessaoDeJulgamentoService.listarSessoesDeJulgamento(numero, ano).subscribe({
        next: (SessaoDeJulgamento) => {
          this.sessao = SessaoDeJulgamento;
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
    const chips = [];

    if (this.processo) {
      if(this.processo.vistas){
        this.processo.vistas.forEach(({id, ministro}) => {
          const str = `Vista - ${ministro['abreviacao']}`;
          chips.push({ id, nome: str });
        });
      }

      if(this.processo.destaques){
        this.processo.destaques.forEach(({id, ministro}) => {
          const str = `Destaque - ${ministro['abreviacao']}`;
          chips.push({ id, nome: str });
        });
      }

      if(this.processo.ministros_impedidos){
        this.processo.ministros_impedidos.forEach(({abreviacao}) => {
          const str = `Impedido(a) - ${abreviacao}`;
          chips.push({nome: str});
        });
      }

      if(this.processo.ministros_suspeitos){
        this.processo.ministros_suspeitos.forEach(({abreviacao}) => {
          const str = `Suspeito(a) - ${abreviacao}`;
          chips.push({nome: str});
        });
      }
    }

    this.chips = chips;
    this.cd.detectChanges();
  }

  private _obterDadosDaVistaNaListaDeDecisoes(id: number): Vista {
    let vista: Vista = null;

    if (this.processo.vistas) {
      vista = this.processo.vistas.find(v => v.id === id);
    }

    return vista;
  }

  private _obterDadosDoDestaqueNaListaDeDecisoes(id: number): Destaque {
    let destaque: Destaque = null;
    
    if (this.processo.destaques) {
      destaque = this.processo.destaques.find(d => d.id === id);
    }

    return destaque;
  }

  /**
   * @private Método Privado
   *
   * @description Método criado para gerar os alertar da página Resultado Julgamento
   *
   * @param tipo Recebe os tipos aceitos no fuseAlert, que são
   * `'primary'|'accent'|'warn'|'basic'|'info'|'success'|'warning'|'error`
   *
   * @param titulo Recebe um título para ser apresentado no Alerta
   *
   * @param mensagem Recebe a mensagem para ser apresentado no Alerta
   *
   * @author Rodrigo Carvalho dos Santos
   */
  private mostrarAlerta(
    tipo: 'primary'|'accent'|'warn'|'basic'|'info'|'success'|'warning'|'error',
    titulo: string,
    mensagem: string,
  ): void {
    this.alerta = {
      nome: "Error", 
      tipo: tipo, 
      titulo: titulo,
      mensagem: mensagem
    }
    this._alertaService.exibirAlerta('Error')
  }
}
