import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Decisao } from 'app/modules/acervo/model/interfaces/decisao.interface';
import { Manifestacao } from 'app/modules/acervo/model/interfaces/manifestacao.interface';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { MinistroService } from 'app/modules/services/ministro.service';
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
  tipos: string[] = [
    'Preliminar',
    'Mérito',
    'Modulação de efeitos',
    'Questão de ordem',
    'Tese',
  ];
  selecionarTodos: boolean;
  aplicarMesmasDecisoesAosProcessos: number[] = [];

  @Input() decisao: Decisao = {
    descricao: '',
    tipo: '',
    dispositivo: '',
    ministros_acordam: [],
    ministro_condutor: '',
    texto: '', 
  };
  @Input() isDecisaoSalva: boolean = false;
  @Input() processo: number = 0;
  @Input() dispositivos: Manifestacao[] = [];
  @Input() processosMesmaDecisoes: Processo[] = [];
  @Input() idsProcessosSelecionados: number[] = [];

  @Output() decisaoCadastrada = new EventEmitter<{decisao: Decisao, processos_mesma_decisao: number[]}>();
  @Output() decisaoExcluida = new EventEmitter<Decisao>();

  constructor(
    private _fb: FormBuilder,
    private _resultadoJulgamento: ResultadoJulgamentoService,
    private _ministroService: MinistroService,
  ) {}

  ngOnInit(): void {
    this._recarregarOsDados();
  }

  ngOnChanges(): void {
    this._recarregarOsDados();
  }

  private _recarregarOsDados(): void {
    this.formDecisao = this._fb.group({
      descricao: [this.decisao.descricao, Validators.required],
      tipo: [this.decisao.tipo, Validators.required],
      dispositivo: [this.decisao.dispositivo, Validators.required],
      ministros_acordam: [this.decisao.ministros_acordam, Validators.required],
      ministro_condutor: [this.decisao.ministro_condutor, Validators.required],
      texto: [this.decisao.texto, Validators.required], 
    });

    this.ministros$ = this._ministroService.listarMinistros();
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
        decisao: this.formDecisao.value,
        processos_mesma_decisao: this.aplicarMesmasDecisoesAosProcessos,
      }).subscribe({
        next: (data) => {
          console.log('Decisao salva!');
          console.log(data);
          this.decisaoCadastrada.emit({
            decisao: this.formDecisao.value, 
            processos_mesma_decisao: this.aplicarMesmasDecisoesAosProcessos,
          });
          this.isDecisaoSalva = true;
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

}
