import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Capitulo } from 'app/modules/acervo/model/interfaces/capitulo.interface';
import { Dispositivo } from 'app/modules/acervo/model/interfaces/dispositivo.interface';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { ModeloDecisao } from 'app/modules/acervo/model/interfaces/modeloDecisao.interface';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { TipoRecursoDto } from 'app/modules/acervo/model/interfaces/tipoRecursoDto';
import { DispositivoService } from 'app/modules/services/dispositivo.service';
import { MinistroService } from 'app/modules/services/ministro.service';
import { ProcessoService } from 'app/modules/services/processo.service';
import { RecursoService } from 'app/modules/services/recurso.service';
import { ResultadoJulgamentoService } from 'app/modules/services/resultado-julgamento.service';
import { isNull } from 'lodash';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
  @Input() isExibirBtnExcluirDecisao: boolean = false;
  @Input() isExibirBtnModeloDecisao: boolean = false;
  @Input() decisao: {
    capitulo: Capitulo;
    processos_mesma_decisao: Processo[];
  } = {
    capitulo: {
      id: 0,
      descricao: '',
      dispositivo: null,
      ministro_condutor: null,
      ministros_acordam: [],
      ministros_divergem: [],
      texto: '',
      tipo: null,
    },

    processos_mesma_decisao: [],
  };

  @Output() dadosDaDecisao = new EventEmitter<{
    capitulo: Capitulo;
    processos_mesma_decisao: number[];
  }>();

  @Output() excluirDadosDaDecisao = new EventEmitter<boolean>();

  constructor(
    private _fb: FormBuilder,
    private _resultadoJulgamento: ResultadoJulgamentoService,
    private _ministroService: MinistroService,
    private _dispositivoService: DispositivoService,
    private _processoService: ProcessoService,
  ) {}

  ngOnInit(): void {
    this._recarregarOsDados();
  }

  ngOnChanges(): void {
    this._recarregarOsDados();
  }

  ngOnDestroy(): void {
    this.decisao = null;
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

  /**
   * @public Método público
   * @description Método para adicionar uma Decisão a lista de decisões
   * @author Douglas da Silva Monteles
   */
  public adicionarDecisao(): void {
    this._emitirOsDadosDaDecisao();
    this.formDecisao.reset();
    this.limparProcessosSelecionados = true;
  }

  /**
   * @public Método público
   * @description Método para emitir um evento autorizando a exclusão de uma Decisão
   * @author Douglas da Silva Monteles
   */
  public excluirDecisao(): void {
    this.excluirDadosDaDecisao.emit(true);
  }

  /**
   * @public Método público
   * @description Método para salvar uma Decisão via requisição POST
   * @author Douglas da Silva Monteles
   */
  public salvarDecisao(): void {
    if (this.formDecisao.valid) {
      this._resultadoJulgamento.savarDecisao(this.idProcesso, {
        decisao: this.formDecisao.value,
        processos_mesma_decisao: this.idsDosProcessos,
      }).subscribe({
        next: (data) => {
          console.log('Decisao salva');
          console.log(data);
          this.excluirDecisao();
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
    this.formDecisao = this._fb.group({
      descricao: [{value: this.decisao.capitulo.descricao, disabled: this.isDesabilitarForm}, Validators.required],
      tipo: [{value: this.decisao.capitulo.tipo, disabled: this.isDesabilitarForm}, Validators.required],
      dispositivo: [{value: this.decisao.capitulo.dispositivo, disabled: this.isDesabilitarForm}, Validators.required],
      ministros_acordam: [{value: this.decisao.capitulo.ministros_acordam, disabled: this.isDesabilitarForm}, Validators.required],
      ministro_condutor: [{value: this.decisao.capitulo.ministro_condutor, disabled: this.isDesabilitarForm}, Validators.required],
      texto: [{value: this.decisao.capitulo.texto, disabled: this.isDesabilitarForm}, Validators.required], 
    });

    this.ministros$ = this._ministroService.listarMinistros();
    this.tipos$ = this._processoService.obterTiposDoProcesso();

    if (this.decisao.capitulo.dispositivo && this.decisao.capitulo.dispositivo != '') {
      const e: EventEmitter<MatSelectChange> = {} as EventEmitter<MatSelectChange>;
      e['value'] = this.decisao.capitulo.tipo;
      this.buscarDispositivos(e);
    }

    this.idsDosProcessos = [];
    this.decisao.processos_mesma_decisao
      .forEach(id => this.idsDosProcessos.push(+id));
  }

  /**
   * @private Método privado
   * @description Método para emitir um evento contendo os dados de Decisao
   * @author Douglas da Silva Monteles
   */
  private _emitirOsDadosDaDecisao(): void {
    this.dadosDaDecisao.emit({
      capitulo: this.formDecisao.value,
      processos_mesma_decisao: this.idsDosProcessos,
    });
  }

}
