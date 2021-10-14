import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';

@Component({
  selector: 'app-aplicar-decisoes',
  templateUrl: './aplicar-decisoes.component.html',
  styleUrls: ['./aplicar-decisoes.component.scss']
})
export class AplicarDecisoesComponent implements OnInit {

  @Input() processos: Processo[] = [];
  @Input() processosParaAplicarAMesmaDecisao: Processo[] = [];
  @Output() obterProcessosSelecionados = new EventEmitter<Processo[]>();

  processosSelecionados: Processo[] = [];

  constructor() { }

  ngOnInit(): void {}

  public selecionaProcesso(processo: Processo) {
    const index = this.processosSelecionados.findIndex(p => p.id === processo.id);

    if (index !== -1) {
      this.processosSelecionados.splice(index, 1);
    } else {
      this.processosSelecionados.push(processo);
    }

    this.obterProcessosSelecionados.emit(this.processosSelecionados);
  }

  public isProcessoSelecionado(processo: Processo): boolean {
    if (this.processosParaAplicarAMesmaDecisao.length > 0) {
      const index = this.processosParaAplicarAMesmaDecisao
      .findIndex(({id}) => id === processo.id);

      return (index !== -1);
    }

    return false;
  }

}
