import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
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

@Component({
  selector: 'app-form-decisao',
  templateUrl: './form-decisao.component.html',
  styleUrls: ['./form-decisao.component.scss']
})
export class FormDecisaoComponent implements OnInit, OnChanges {

  formDecisao: FormGroup;
  ministros$: Observable<Ministro []>
  tipos$: Observable<string[]>; 
  dispositivos$: Observable<Dispositivo[]>;
  idsDosProcessos: number[] = [];
  limparProcessosSelecionados: boolean = false;

  @Input() idProcesso: number = 0;
  @Input() isDesabilitarForm: boolean = false;
  @Input() isExibirBtnAdicionarDecisao: boolean = false;
  @Input() isExibirBtnSalvarDecisao: boolean = false;
  @Input() isExibirBtnExcluirDecisao: boolean = false;
  @Input() decisao: {
    capitulo: Capitulo;
    processos_mesma_decisao: Processo[];
  } = {
    capitulo: {
      id: 0,
      descricao: '',
      dispositivo: '',
      ministro_condutor: null,
      ministros_acordam: [],
      ministros_impedidos: [],
      ministros_suspeitos: [],
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

  private _desabilitarEdicaoDoFormulario(): void {
    if (this.decisao.capitulo.id && this.decisao.capitulo.id > 0) {
      this.isDesabilitarForm = true;
    } else {
      this.isDesabilitarForm = false;
    }
  }

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

    this._desabilitarEdicaoDoFormulario();
  }

  public buscarDispositivos(event: EventEmitter<MatSelectChange>): void {
    const tipo: string = event['value'];
    this.dispositivos$ = this._dispositivoService.obterDispositivos(this.idProcesso, tipo);
  }

  public setIdsDosProcessosSelecionados(idsProcessos: number[]): void {
    this.idsDosProcessos = idsProcessos;
  }

  public adicionarDecisao(): void {
    this._emitirOsDadosDaDecisao();
    this.formDecisao.reset();
    this.limparProcessosSelecionados = true;
  }

  public excluirDecisao(): void {
    this.excluirDadosDaDecisao.emit(true);
  }

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

  private _emitirOsDadosDaDecisao(): void {
    this.dadosDaDecisao.emit({
      capitulo: this.formDecisao.value,
      processos_mesma_decisao: this.idsDosProcessos,
    });
  }

}
