import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseDrawerService } from '@fuse/components/drawer';
import { Alerta } from 'app/shared/alerta/alerta.component';
import { DialogoConfirmacaoComponent } from 'app/shared/dialogo-confirmacao/dialogo-confirmacao.component';
import { Capitulo } from 'app/shared/model/interfaces/capitulo.interface';
import { Destaque } from 'app/shared/model/interfaces/destaque.interface';
import { Manifestacao } from 'app/shared/model/interfaces/manifestacao.interface';
import { ModeloDecisao } from 'app/shared/model/interfaces/modeloDecisao.interface';
import { Processo } from 'app/shared/model/interfaces/processo.interface';
import { SessaoDeJulgamento } from 'app/shared/model/interfaces/sessao-julgamento.interface';
import { Suspensao } from 'app/shared/model/interfaces/suspensao.interface';
import { Vista } from 'app/shared/model/interfaces/vista.interface';
import { Voto } from 'app/shared/model/interfaces/voto.interface';
import { AlertaService } from '../services/alerta.service';
import { MinistroService } from '../services/ministro.service';
import { ProcessoService } from '../services/processo.service';
import { SessaoDeJulgamentoService } from '../services/sessao-de-julgamento.service';
import { FormIndicacaoImpedimentosComponent } from './form-indicacao-impedimentos/form-indicacao-impedimentos.component';
import { FormModeloDecisaoComponent } from './form-modelo-decisao/form-modelo-decisao.component';
import { FormRelatorComponent } from './form-relator/form-relator.component';


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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultadoJulgamentoComponent implements OnInit {

  parametros: Parametros;
  processo: Processo = {} as Processo;
  sessao: SessaoDeJulgamento;
  votos: Voto[] = [];
  dispositivos: Manifestacao[] = [];
  todosCapitulos: Capitulo[] = [];
  capituloSelecionado: Capitulo = null;
  vistaOuDestaqueSelecionado: any = null;
  suspensaoSelecionada: Suspensao = null;
  modelo: ModeloDecisao;
  exibirChips = true;
  chips: Array<{ id?: number; nome: string }> = [];
  vistasEDestaques: any[];

  alerta: Alerta = {} as Alerta;

  readonly FORM_CADASTRO_DECISAO = 'formulario-de-cadastro-de-decisao';
  readonly FORM_VISTA_DESTAQUE = 'vistaDestaqueDrawer';
  readonly DRAWER_SUSPENSAO = 'suspensaoDrawer';

  constructor(
    private _ministroService: MinistroService,
    private _processoService: ProcessoService,
    private _sessaoDeJulgamentoService: SessaoDeJulgamentoService,
    private _route: ActivatedRoute,
    private _alertaService: AlertaService,
    private _fuseDrawerService: FuseDrawerService,
    private _dialog: MatDialog,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe((params: Parametros) => {
      this.parametros = params;
    });
    this._carregarDadosProcessos();
    this._carregarSessaoDeJulgamento(this.parametros.numero, this.parametros.ano);
  }

  /**
   * transforma um string com tags html em uma string padrão
   * @param html string com tags html
   */
  removerTagsHTML(html: string): string {
    const data = new DOMParser().parseFromString(html, 'text/html');
    return data.body.textContent || "";
  }



  public obterResultadoDaAcao(resultado: {titulo:string;mensagem:string;tipo:'success' | 'error'}) {
    this.alerta = {
      ...resultado,
      nome: 'ResultadoDaAcaoFormDecisao',
    }
    this._alertaService.exibirAlerta(this.alerta.nome);
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
    dialogRef.afterClosed().subscribe(({ modelo, dispositivo, recurso }: Retorno) => {
      if (modelo) {
        this.modelo = modelo;
        this.mostrarAlerta('success', 'Modelo Cadastrado com Sucesso',
          `O modelo de texto para
          ${modelo.classe},
          ${modelo.tipoCapitulo},
          ${dispositivo} e
          ${recurso} foi incluída com sucesso.\n
          ${modelo.texto}`);
      }
      else {
        this.mostrarAlerta('error', 'Erro ao cadastrar modelo', 'Tente Novamente Mais Tarde');
      }
    });
  }

  pedirSuspensao(): void {
    this.suspensaoSelecionada = {} as Suspensao;
    this.abrirGaveta(this.DRAWER_SUSPENSAO);
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
   * @public Método público
   * @description Método para concatenar algumas informações sobre o processo
   * @author Douglas da Silva Monteles
   */
  public getNomeCompletoProcesso(): string {
    if (this.processo) {
      const { classe, numero, cadeia } = this.processo;
      return `${classe} ${numero} ${cadeia}`;
    }

    return '';
  }

  public excluirCapitulo(capitulo: Capitulo): void {
    const descricao = `${capitulo.tipo} - ${capitulo.dispositivo?.nome || capitulo.dispositivo}`;

    const dialogRef = this._dialog.open(DialogoConfirmacaoComponent, {
      data: {
        titulo: 'EXCLUSÃO DE CAPÍTULO',
        mensagem: `Confirma a exclusão do capítulo ${descricao}?`,
      }
    });

    dialogRef.afterClosed().subscribe(resposta => {
      const { numero, ano, processo } = this.parametros;

      if (resposta) {
        this._processoService.excluirCapitulo(
          numero,
          ano,
          processo,
          capitulo.id,
        ).subscribe({
          next: () => {
            this.mostrarAlerta(
              'success',
              'Sucesso!',
              `O Capítulo foi excluído com sucesso.`,
              'ExcluirCapitulo',
            );
            this.cd.detectChanges();
          }
        });
      }
    });
  }

  /**
   * @public Método público
   * @param drawerName Nome do drawer a ser exibido
   * @description Método para exibir ou esconder a gaveta com conteúdo
   * @author Douglas da Silva Monteles
   */
  public fecharGaveta(drawerName: string): void {
    //Limpa as informações da gaveta.
    this.vistaOuDestaqueSelecionado = null;
    const drawer = this._fuseDrawerService.getComponent(drawerName);
    drawer.toggle();
  }

  /**
   * @public Método público
   * @param drawerName Nome do drawer a ser exibido
   * @description Método para exibir ou esconder a gaveta com conteúdo
   * @author Douglas da Silva Monteles
   */
  public abrirGaveta(drawerName: string): void {
    const drawer = this._fuseDrawerService.getComponent(drawerName);
    drawer.toggle();
  }



  retornoVistaDestaqueDrawer(data) {
    this._carregarDadosProcessos();
    if (data.type == 'vista') {
      this.mostrarAlerta('success', 'Sucesso!', `Vista incluída com sucesso.`);
    } else if (data.type == 'destaque') {
      this.mostrarAlerta('success', 'Sucesso!', `Destaque incluído com sucesso.`);
    } else this.mostrarAlerta('error', 'Erro!', `Ocorreu um erro ao salvar a vista ou destaque.`);
  }

  editarVistaOuDestaque(item: any) {
    this.abrirGaveta(this.FORM_VISTA_DESTAQUE)
    this.vistaOuDestaqueSelecionado = item;
    this.cd.detectChanges();
  }


  novaVista() {
    this.vistaOuDestaqueSelecionado = new Vista();
    this.abrirGaveta(this.FORM_VISTA_DESTAQUE)
  }


  novoDestaque() {
    this.vistaOuDestaqueSelecionado = new Destaque();
    this.abrirGaveta(this.FORM_VISTA_DESTAQUE)
  }

  public excluirVistaOuDestaque(item: any): void {
    if (item.type == 'vista') {
      this.excluirVista(item);
    } else if (item.type == 'destaque') {
      this.excluirDestaque(item);
    }
  }

  private excluirVista(vista: Vista): void {
    console.error(vista);

    const dialogRef = this._dialog.open(DialogoConfirmacaoComponent, {
      data: {
        titulo: 'EXCLUSÃO DE VISTA',
        mensagem: `Confirma a exclusão da Vista do(a) Ministro(a) ${vista.ministro.nome}?`
      },
    });
    dialogRef.afterClosed().subscribe(confirmacao => {
      if (confirmacao) {
        this._processoService.excluirVistaDoProcesso(this.parametros.numero, this.parametros.ano, this.parametros.processo, vista.id)
          .subscribe({
            next: () => {
              this.mostrarAlerta('success', 'Sucesso!', `A vista do Ministro(a) ${vista.ministro.nome} foi excluída com sucesso.`);
              this._carregarDadosProcessos();
            },
            error: (error) => {
              console.error(error);
              this.mostrarAlerta("error", "Error", error.message);
            }
          });
      }
    });
  }

  private excluirDestaque(destaque: Destaque): void {
    const dialogRef = this._dialog.open(DialogoConfirmacaoComponent, {
      data: {
        titulo: 'EXCLUSÃO DE DESTAQUE',
        mensagem: `Confirma a exclusão do Destaque do(a) Ministro(a) ${destaque.ministro.nome}?`
      },
    });

    dialogRef.afterClosed().subscribe(confirmacao => {
      if (confirmacao) {
        this._processoService.excluirDestaqueDoProcesso(this.parametros.numero, this.parametros.ano, this.parametros.processo, destaque.id)
          .subscribe({
            next: () => {
              this.mostrarAlerta('success', 'Sucesso!', `O Destaque do Ministro(a) ${destaque.ministro.nome} foi excluída com sucesso.`);
              this._carregarDadosProcessos();
            },
            error: (error) => {
              console.error(error);
              this.mostrarAlerta("error", "Error", error.message);
            }
          });
      }
    });
  }

  public excluirSuspensao(suspensao: Suspensao): void {
    const dialogRef = this._dialog.open(DialogoConfirmacaoComponent, {
      data: {
        titulo: 'EXCLUSÃO DE SUSPENSÃO',
        mensagem: `Confirma a exclusão da Suspensão: ${suspensao.texto}?`
      },
    });

    dialogRef.afterClosed().subscribe(confirmacao => {
      if (confirmacao) {
        this._processoService.excluirSuspensao(
          this.parametros.numero, 
          this.parametros.ano, 
          this.parametros.processo, 
          suspensao.id
        )
            .subscribe({
              next: () => {
                this.mostrarAlerta('success', 'Sucesso!', `A Suspensão foi excluída com sucesso.`);
                this.cd.detectChanges();
              },
              error: (error) => {
                console.error(error);
                this.mostrarAlerta("error", "Error", error.message);
                this.cd.detectChanges();
              }
        });
      }
    });
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

    if (this.processo.capitulos.length > 0) {
      const dialogRef = this._dialog.open(FormRelatorComponent, {
        data: {
          sessao: this.sessao,
          processo: this.processo
        }
      });

      dialogRef.afterClosed().subscribe(data => {
        if (data.status) {
          this.mostrarAlerta('success', 'Sucesso',
            `O Resultado da Sessão de Julgamento foi lançada com sucesso`);
        } else {
          this.mostrarAlerta('error', 'Erro ao finalizar a publicação', data.mensagem_tratada);
        }
      });
    } else {
      this._processoService.finalizarJulgamentoProcesso(this.parametros.numero, this.parametros.ano, this.processo).subscribe({
        next: (data) => {
          this.mostrarAlerta('success', 'Sucesso', data);
        },
        error: (data) => {
          console.error(data);
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
        console.error(processo?.suspensoes)
        this.processo = processo;
        this.todosCapitulos = processo.capitulos;
        this.cd.detectChanges();
        this._criarChips();
        this._carregarSuspensoesVistaEDestaque();

        this._processoService.obterVotosDoProcesso(this.processo.id).subscribe({
          next: (votos) => {
            this.votos = votos;
          },
          error: (error) => {
            console.error(error);
            this.mostrarAlerta("error", "Error", error.message);
          }
        });
      },
      error: (error) => {
        console.error(error);
        this.mostrarAlerta("error", "Error", error.message);
      }

    });
  }

  private _carregarSuspensoesVistaEDestaque(): void {
    this.vistasEDestaques = [];
    if (this.processo != null) {
      this.vistasEDestaques = [...this.processo.destaques, ...this.processo.vistas];
      this.vistasEDestaques.sort((a, b) => { if (a.data < b.data) return 1; if (a.data > b.data) return -1 });
    }
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
      if (this.processo.ministros_impedidos) {
        this.processo.ministros_impedidos.forEach(({ abreviacao }) => {
          const str = `Impedido(a) - ${abreviacao}`;
          chips.push({ nome: str });
        });
      }

      if (this.processo.ministros_suspeitos) {
        this.processo.ministros_suspeitos.forEach(({ abreviacao }) => {
          const str = `Suspeito(a) - ${abreviacao}`;
          chips.push({ nome: str });
        });
      }
    }

    this.chips = chips;
    this.cd.detectChanges();
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
    tipo: 'primary' | 'accent' | 'warn' | 'basic' | 'info' | 'success' | 'warning' | 'error',
    titulo: string,
    mensagem: string,
    nome: string = 'ResultadoJulgamentoAlerta',
  ): void {
    this.alerta = {
      nome,
      titulo,
      mensagem,
      tipo,
    };

    this._alertaService.exibirAlerta(this.alerta.nome);
  }
}
