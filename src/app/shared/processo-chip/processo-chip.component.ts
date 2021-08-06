import { Component, Input, OnInit } from '@angular/core';
import { Processo } from 'app/modules/acervo/model/interfaces/processo.interface';
import { ProcessoService } from 'app/modules/services/processo.service';

@Component({
  selector: 'app-processo-chip',
  templateUrl: './processo-chip.component.html',
  styleUrls: ['./processo-chip.component.scss']
})
export class ProcessoChipComponent implements OnInit {

  @Input() isRemovable: boolean = false;
  @Input() isEmitRemoveEvent: boolean = false;
  @Input() processos: Processo[] = [];
  // camila, rosana, monica, denise e estela

  constructor(
    private _processoService: ProcessoService,
  ) { }

  ngOnInit(): void {
  }

  public removeChip(processo: Processo): void {
    processo.checked = false;
    this.processos.splice(this.processos.indexOf(processo), 1);

    if (this.isEmitRemoveEvent) {
      this._processoService.setProcessosSelecionados(this.processos);
    }
  }

}
