import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Decisao } from 'app/modules/acervo/model/interfaces/decisao.interface';
import { Dispositivo } from 'app/modules/acervo/model/interfaces/dispositivo.interface';
import { Manifestacao } from 'app/modules/acervo/model/interfaces/manifestacao.interface';
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
  isDecisaoSalva: boolean = false;
  selecionarTodos: boolean;
  aplicarMesmasDecisoesAosProcessos: number[] = [];
  dispositivos$: Observable<Dispositivo[]>;

  @Input() decisao: Decisao = {
    descricao: '',
    tipo: '',
    dispositivo: '',
    ministros_acordam: [],
    ministro_condutor: '',
    texto: '', 
  };
  @Input() processo: number = 0;
  @Input() desabilitarForm: boolean;
  @Input() processosMesmaDecisoes: Processo[] = [];
  @Input() idsProcessosSelecionados: number[] = [];

  @Output() decisaoCadastrada = new EventEmitter<{decisao: Decisao, processos_mesma_decisao: number[]}>();
  @Output() decisaoExcluida = new EventEmitter<Decisao>();

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

  private _recarregarOsDados(): void {
    this.formDecisao = this._fb.group({
      descricao: [{value: this.decisao.descricao, disabled: this.desabilitarForm}, Validators.required],
      tipo: [{value: this.decisao.tipo, disabled: this.desabilitarForm}, Validators.required],
      dispositivo: [{value: this.decisao.dispositivo, disabled: this.desabilitarForm}, Validators.required],
      ministros_acordam: [{value: this.decisao.ministros_acordam, disabled: this.desabilitarForm}, Validators.required],
      ministro_condutor: [{value: this.decisao.ministro_condutor, disabled: this.desabilitarForm}, Validators.required],
      texto: [{value: this.decisao.texto, disabled: this.desabilitarForm}, Validators.required], 
    });

    this.ministros$ = this._ministroService.listarMinistros();
    this.tipos$ = this._processoService.obterTiposDoProcesso();

    if (this.decisao.dispositivo && this.decisao.dispositivo != '') {
      const e: EventEmitter<MatSelectChange> = {} as EventEmitter<MatSelectChange>;
      e['value'] = this.decisao.tipo;
      this.buscarDispositivos(e);
    }
  }

  public cadastrarDecisao(): void {
    if (this.formDecisao.valid) {
      this.decisaoCadastrada.emit({
        decisao: this.formDecisao.value, 
        processos_mesma_decisao: this.aplicarMesmasDecisoesAosProcessos,
      });
      this.idsProcessosSelecionados = [];
      this.selecionarTodos = false;
      this.formDecisao.reset();
    }
  }

  public excluirDecisao(): void {
    if (this.formDecisao.valid && !this.isDecisaoSalva) {
      this.decisaoExcluida.emit(this.decisao);
    } 
  }

  public salvarDecisao(): void {
    if (this.formDecisao.valid && this.processo > 0 && !this.isDecisaoSalva) {
      this._resultadoJulgamento.savarDecisao(this.processo, {
        decisao: this.formDecisao.value as Decisao,
        processos_mesma_decisao: this.aplicarMesmasDecisoesAosProcessos,
      }).subscribe({
        next: (data) => {
          console.log('Decisao salva!');
          console.log(data);
          this.isDecisaoSalva = true;
          this.decisaoCadastrada.emit({
            decisao: this.formDecisao.value, 
            processos_mesma_decisao: this.aplicarMesmasDecisoesAosProcessos,
          });
        }
      });
    }
  }

  public isDecisao(): boolean {
    const isVazio = Object.values(this.decisao).every(dec => dec !== '');
    return isVazio;
  }

  public obterProcessos(idsProcesso: number[]): void {
    this.aplicarMesmasDecisoesAosProcessos = idsProcesso;
  }

  public buscarDispositivos(event: EventEmitter<MatSelectChange>): void {
    const tipo: string = event['value'];
    this.dispositivos$ = this._dispositivoService.obterDispositivos(this.processo, tipo);
  }
}
