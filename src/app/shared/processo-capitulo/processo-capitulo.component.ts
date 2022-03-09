import { Component, OnInit, Input } from '@angular/core';
import { SituacaoDoProcesso } from '../model/enums/situacaoDoProcesso.enum';
import { TipoDoProcesso } from '../model/enums/tipoDoProcesso.enum';
import { Processo } from '../model/interfaces/processo.interface';



@Component({
  selector: 'digital-processo-capitulo',
  templateUrl: './processo-capitulo.component.html',
  styleUrls: ['./processo-capitulo.component.scss']
})
export class ProcessoCapituloComponent implements OnInit {
  @Input() processo: Processo = {
    id: 0,
    ementa: '',
    lista: [],
    classe: '',
    numero: 0,
    cadeia: '',
    abreviacao: '',
    situacao: SituacaoDoProcesso['Apto a Pautar'],
    tipo: TipoDoProcesso.Merito,
    suspensoes: [],
    vistas: [],
    destaques: [],
    capitulos: [],
    ministros_impedidos: [],
    ministros_suspeitos: [],
    envolvidos: [],
  };

  constructor() { }

  ngOnInit(): void {
  }
}
