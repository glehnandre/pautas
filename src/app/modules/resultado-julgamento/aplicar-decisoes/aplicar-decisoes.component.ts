import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AlertaService } from 'app/modules/services/alerta.service';
import { ProcessoService } from 'app/modules/services/processo.service';
import { Processo } from 'app/shared/model/interfaces/processo.interface';


@Component({
  selector: 'app-aplicar-decisoes',
  templateUrl: './aplicar-decisoes.component.html',
  styleUrls: ['./aplicar-decisoes.component.scss']
})
export class AplicarDecisoesComponent implements OnInit, OnChanges {

  @Input() selecionarTodos: boolean;
  @Input() desabilitar: boolean;
  @Input() limparProcessosSelecionados: boolean = false;
  @Input() processosParaAplicarAMesmaDecisao: number[] = [];
  @Output() obterProcessosSelecionados = new EventEmitter<number[]>();
  
  processos: Processo[] = [];
  processosSelecionados: number[] = [];
  isCarregando: boolean = true;

  errorMessage: string;

  constructor(
    private _processoService: ProcessoService,
    private _alertaService: AlertaService,
  ) {
    this._processoService.listarProcessos().subscribe({
      next: (data) => {
        this.processos = data;
        this.isCarregando = false;
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.message
        this._alertaService.exibirAlerta("Error");
      }
    });
  }

  ngOnInit(): void {
    this.processosSelecionados = this.processosParaAplicarAMesmaDecisao;
  }

  ngOnChanges(): void {
    if (this.limparProcessosSelecionados) {
      this.processosSelecionados = [];
      this.processosParaAplicarAMesmaDecisao = [];
      this.selecionarTodos = false;
    }
  }

  /**
   * @public Método público
   * @param processo Objeto javascript com os dados do processo
   * @description Método para emitir um evento com os dados do processo selecionado
   * @author Douglas da Silva Monteles
   */
  public selecionarProcesso(processo: Processo) {
    const index = this.processosSelecionados.findIndex(id => id === processo.id);

    if (index !== -1) {
      this.processosSelecionados.splice(index, 1);
    } else {
      this.processosSelecionados.push(processo.id);
    }

    this.obterProcessosSelecionados.emit(this.processosSelecionados);
  }

  /**
   * @public Método público
   * @param processo Objeto javascript com os dados do processo
   * @description Método para verificar se um dado processo já foi selecionado
   * @returns boolean
   * @author Douglas da Silva Monteles
   */
  public isProcessoSelecionado(processo: Processo): boolean {
    if (this.processosParaAplicarAMesmaDecisao.length > 0) {
      const index = this.processosParaAplicarAMesmaDecisao
        .findIndex(id => id === processo.id);

      return (index !== -1);
    }

    return false;
  }

}
