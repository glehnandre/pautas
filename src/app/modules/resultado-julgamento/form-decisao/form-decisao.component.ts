import { T } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Capitulo } from 'app/modules/acervo/model/interfaces/capitulo.interface';
import { Dispositivo } from 'app/modules/acervo/model/interfaces/dispositivo.interface';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { DispositivoService } from 'app/modules/services/dispositivo.service';
import { MinistroService } from 'app/modules/services/ministro.service';
import { ProcessoService } from 'app/modules/services/processo.service';
import { ResultadoJulgamentoService } from 'app/modules/services/resultado-julgamento.service';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';

@Component({
  selector: 'app-form-decisao',
  templateUrl: './form-decisao.component.html',
  styleUrls: ['./form-decisao.component.scss']
})
export class FormDecisaoComponent implements OnInit, OnChanges, OnDestroy {

  formDecisao: FormGroup;
  ministros$: Observable<Ministro []>
  tipos$: Observable<string[]>;
  idsDosProcessos: number[] = [];
  limparProcessosSelecionados: boolean = false;
  dispositivos: Dispositivo[] = [];

  @Input() idProcesso: number = 0;
  @Input() processo: Processo;
  @Input() isDesabilitarForm: boolean = false;
  @Input() isExibirBtnAdicionarDecisao: boolean = false;
  @Input() isExibirBtnSalvarDecisao: boolean = false;
  @Input() isExibirBtnExcluirCapitulo: boolean = false;
  @Input() isExibirBtnModeloDecisao: boolean = false;
  @Input() capitulo: Capitulo = {
    id: 0,
    descricao: "",
    dispositivo: null,
    ministro_condutor: null,
    ministros_acordam: [],
    ministros_divergem: [],
    texto: '',
    tipo: null,
    sessao: null,
    processos_mesma_decisao: []
  };

  @Output() dadosDoCapitulo = new EventEmitter<{
    capitulo: Capitulo;
    processos_mesma_decisao: number[];
  }>();

  @Output() excluirDadosDoCapitulo = new EventEmitter<boolean>();

  constructor(
    private _fb: FormBuilder,
    private _resultadoJulgamento: ResultadoJulgamentoService,
    private _ministroService: MinistroService,
    private _dispositivoService: DispositivoService,
    private _processoService: ProcessoService,
    private _cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._recarregarOsDados();
    this.formDecisao = this._fb.group({
      descricao: [this.capitulo.descricao, Validators.required],
      tipo: [this.capitulo.tipo, Validators.required],
      dispositivo: [this.capitulo.dispositivo, Validators.required],
      ministros_acordam: [this.capitulo.ministros_acordam, Validators.required],
      ministro_condutor: [this.capitulo.ministro_condutor, Validators.required],
      texto: [this.capitulo.texto, Validators.required],
      processos_mesma_decisao: [this.capitulo.processos_mesma_decisao]
    });
    console.log(this.formDecisao);
  }

  ngOnChanges(): void {
    this._recarregarOsDados();
  }

  ngOnDestroy(): void {
    this.capitulo = null;
  }

  /**
   * @public Método público
   * @param event Evento contendo o tipo de dispositivo a ser buscado via
   *              requisição GET
   * @description Método para obter a lista de dispositivos pelo tipo
   * @author Douglas da Silva Monteles
   */
  public buscarDispositivos(event: EventEmitter<MatSelectChange>): void {
    const tipo: string = event['value'];

    this._dispositivoService.obterDispositivos(this.idProcesso, tipo).subscribe({
      next: (dispositivos) => {
        this.dispositivos = dispositivos;
      }
    });
  }

  /**
   * @public Método público
   * @description Método para atualizar os ids dos processos selecionados
   * @author Douglas da Silva Monteles
   */
  public setIdsDosProcessosSelecionados(idsProcessos: number[]): void {
    this.idsDosProcessos = idsProcessos;
  }

  public carregarModeloDeDecisao(): void {
    const { tipo, dispositivo } = this.formDecisao.value;
    const idDispositivo = this.dispositivos.find(d => d.nome === dispositivo)?.id;

    if (tipo && dispositivo && this.processo && this.processo.id_tipo_recurso) {
      this._resultadoJulgamento.obterModeloDecisao(this.processo.classe, tipo, idDispositivo, this.processo.id_tipo_recurso).subscribe({
        next: (modelo) => {
          this.formDecisao.controls.texto.setValue(modelo.texto);
        },

        error: (error) => {
          console.log(error)
          this.formDecisao.controls.texto.setValue('');
        }
      });
    }
  }

  public getMinistrosSuspeitosOuImpedidos(): Ministro[] {
    if (this.processo) {
      const {
        ministros_suspeitos,
        ministros_impedidos,
      } = this.processo;

      return [...ministros_suspeitos, ...ministros_impedidos ];
    }

    return [];
  }

  /**
   * @public Método público
   * @description Método para adicionar uma Decisão a lista de decisões
   * @author Douglas da Silva Monteles
   */
  public adicionarDecisao(): void {
    this._emitirOsDadosDoCapitulo();
    this.formDecisao.reset();
    this.limparProcessosSelecionados = true;
  }

  /**
   * @public Método público
   * @description Método para emitir um evento autorizando a exclusão de uma Decisão
   * @author Douglas da Silva Monteles
   */
  public excluirCapitulo(): void {
    this.excluirDadosDoCapitulo.emit(true);
  }

  /**
   * @public Método público
   * @description Método para salvar uma Decisão via requisição POST
   * @author Douglas da Silva Monteles
   */
  public salvarDecisao(): void {
    if (this.formDecisao.valid) {
      this._resultadoJulgamento.salvarCapitulo(this.idProcesso, {
        capitulo: this.formDecisao.value,
        processos_mesma_decisao: this.idsDosProcessos,
      }).subscribe({
        next: (data) => {
          this.excluirCapitulo();
          this.formDecisao.reset();
        }
      });
    }
  }

  /**
   * @private Método privado
   * @description Método para recarregar os dados da decisão e atualizar o formulário
   * @author Douglas da Silva Monteles
   */
  private _recarregarOsDados(): void {

    this.ministros$ = this._ministroService.listarMinistros().pipe(
      map(ministros => this._filtrarMinistros(ministros)),
    );

    this.tipos$ = this._processoService.obterTiposDoProcesso();

    if(this.capitulo){  
      if (this.capitulo.dispositivo) {
        const e: EventEmitter<MatSelectChange> = {} as EventEmitter<MatSelectChange>;
        e['value'] = this.capitulo.tipo;
        this.buscarDispositivos(e);
      }
      this.capitulo.processos_mesma_decisao.forEach(id => this.idsDosProcessos.push(+id));
    }
    this.idsDosProcessos = [];
    
  }

  private _filtrarMinistros(ministros: Ministro[]): Ministro[] {
    const ministrosSuspeitosOuImpedidos = this.getMinistrosSuspeitosOuImpedidos();
    return ministros.filter(m => ministrosSuspeitosOuImpedidos.findIndex(({id}) => id === m.id) === -1);
  }

  /**
   * @private Método privado
   * @description Método para emitir um evento contendo os dados de Decisao
   * @author Douglas da Silva Monteles
   */
  private _emitirOsDadosDoCapitulo(): void {
    this.dadosDoCapitulo.emit(this.formDecisao.value);
  }

}
