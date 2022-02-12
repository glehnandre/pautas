import { Component, Input, OnInit } from '@angular/core';
import { TipoDoProcesso } from 'app/shared/model/enums/tipoDoProcesso.enum';
import { Processo } from '../model/interfaces/processo.interface';


@Component({
  selector: 'app-processo-painel-expansivo',
  templateUrl: './processo-painel-expansivo.component.html',
  styleUrls: ['./processo-painel-expansivo.component.scss']
})
export class ProcessoPainelExpansivoComponent implements OnInit {

  panelOpenState: boolean = false;
  @Input() processo: Processo;

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  getTipoProcesso(): string {
    return TipoDoProcesso[this.processo.tipo];
  }

}
