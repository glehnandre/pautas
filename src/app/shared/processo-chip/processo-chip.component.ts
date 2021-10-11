import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  @Input() dialogRef: MatDialogRef<any>;
  @Input() isReturnable: boolean = false;

  constructor(
    private _processoService: ProcessoService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  public removeChip(processo: Processo): void {
    processo.checked = false;
    this.processos.splice(this.processos.indexOf(processo), 1);

    if (this.isEmitRemoveEvent) {
      this._processoService.setProcessosSelecionados(this.processos);
    }

    if (this.isReturnable && this.processos.length === 0) {
      this._router.navigate(['../'], {relativeTo: this._route});
    }
  }

}
