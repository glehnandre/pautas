import { Component, OnInit, Input } from '@angular/core';
import { SituacaoDoProcesso } from 'app/modules/acervo/model/enums/situacaoDoProcesso.enum';
import { TipoDoProcesso } from 'app/modules/acervo/model/enums/tipoDoProcesso.enum';
import { Processo } from '../../modules/acervo/model/interfaces/processo.interface';

@Component({
  selector: 'app-processo-capitulo',
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
    nome: '',
    abreviacao: '',
    situacao: SituacaoDoProcesso['Apto a Pautar'],
    tipo: TipoDoProcesso.Merito,
    capitulos: [],
  };

  constructor() { }

  ngOnInit(): void {
  }
}
