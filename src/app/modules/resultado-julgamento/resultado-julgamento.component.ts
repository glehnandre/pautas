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
  vistaSelecionada: Vista = null;
  destaqueSelecionado: Destaque = null;
  modelo: ModeloDecisao;
  exibirListaDeDecisoes = false;
  exibirChips = true;
  chips: Array<{ id?: number; nome: string }> = [];
  data = {
    titulo: 'Informar Vista',
    tipo: 'vista',
    dados: this._obterDadosDaVistaNaListaDeDecisoes(null),
  };

  alerta: Alerta = {} as Alerta;

  readonly FORM_CADASTRO_DECISAO = 'formulario-de-cadastro-de-decisao';
  readonly FORM_VISTA_DESTAQUE = 'vistaDestaqueDrawer';

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
  removerTagsHTML(html: string): string{
    const data = new DOMParser().parseFromString(html, 'text/html');
    return data.body.textContent || "";
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

  public obterResultadoDaAcao(resultado: {titulo:string;mensagem:string;tipo:'success' | 'error'}) {
    this.alerta = {
      ...resultado,
      nome: 'ResultadoDaAcaoFormDecisao',
    }
    this._alertaService.exibirAlerta(this.alerta.nome);
  }

  /**
   * @public Método público
   * @param drawerName Nome do drawer a ser exibido
   * @description Método para exibir ou esconder a gaveta com conteúdo
   * @author Douglas da Silva Monteles
   */
     public fecharGaveta(drawerName: string): void {
       console.log(drawerName);
       
      //Limpa as informações da gaveta.
      this.vistaSelecionada=null;
      this.destaqueSelecionado=null;
      
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

  private alertaVistaEDestaque(tipo: string, ministro: Ministro): void {
    if (ministro) {
      this.mostrarAlerta('success', 'Sucesso', `
          ${tipo}
          ${this._ministroService.generoEPlural([ministro],
        { F: 'da Ministra', M: 'do Ministro' })}
          ${ministro.nome}
          incluíd${tipo == 'Vista' ? 'a' : 'o'} com sucesso!
        `);
    } else {
      this.mostrarAlerta('error', `Erro ao Cadastrar ${tipo}`, 'Tente Novamente Mais Tarde');
    }
  }


  retornoVistaDestaqueDrawer(data){
    if(data.vistas !=null){
      this.mostrarAlerta('success', 'Sucesso!', `Vista incluída com sucesso.`);
    }else if (data.destaques !=null){
      this.mostrarAlerta('success', 'Sucesso!', `Destaque incluído com sucesso.`);
    }else this.mostrarAlerta('error', 'Erro!', `Ocorreu um erro ao salvar a vista ou destaque.`);
  }


  editarVista(vista:Vista){
    this.vistaSelecionada = vista;
    this.destaqueSelecionado = null;
    this.abrirGaveta(this.FORM_VISTA_DESTAQUE)
    this.cd.detectChanges();
  }

  editarDestaque(destaque:Destaque){
    this.destaqueSelecionado = destaque;
    this.vistaSelecionada = null;
    this.abrirGaveta(this.FORM_VISTA_DESTAQUE)
    this.cd.detectChanges();
  }
  
  novaVista(){
    this.vistaSelecionada = {} as Vista;
    this.destaqueSelecionado = null;
    this.abrirGaveta(this.FORM_VISTA_DESTAQUE)
  }

    
  novoDestaque(){
    this.destaqueSelecionado = {} as Destaque;
    this.vistaSelecionada = null;
    this.abrirGaveta(this.FORM_VISTA_DESTAQUE)
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
  public getDadosDoProcesso(): string {
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

  public excluirVista(vista: Vista): void {
    console.log(vista);
    
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
                  this.cd.detectChanges();
                },
                error: (error) => {
                  console.log(error);
                  this.mostrarAlerta("error", "Error", error.message);
                  this.cd.detectChanges();
                }
          });
        }
      });
  }

  public excluirDestaque(destaque: Destaque): void {
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
                this.cd.detectChanges();
              },
              error: (error) => {
                console.log(error);
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
        this._criarChips();

        this._processoService.obterVotosDoProcesso(this.processo.id).subscribe({
          next: (votos) => {
            this.votos = votos;
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
    tipo: 'primary' | 'accent' | 'warn' | 'basic' | 'info' | 'success' | 'warning' | 'error',
    titulo: string,
    mensagem: string,
    nome: string = 'ResultadoJulgamentoAlerta',
  ): void {
    this.alerta = {
      nome,
      tipo,
      titulo,
      mensagem,
    }
    this._alertaService.exibirAlerta(this.alerta.nome);
  }
}
