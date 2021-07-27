import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, Output, SimpleChange, EventEmitter } from '@angular/core';
import { ProcessoService } from 'app/modules/services/processo.service';
import { Tag } from '../acoes/agrupar-emlista/agrupar-emlista.component';
import { Paginacao } from './paginacao/paginacao.component';

export enum SituacaoDoProcesso {
  'Apto a Julgar' = 1, 
  'Em julgamento', 
  'Vista', 
  'Pautado', 
  'Suspenso', 
  'Retirado de pauta', 
  'Retorno de Vista',
}

export enum TipoDoProcesso {
  'Merito' = 1, 
  'Incidente',
}

export interface Capitulo {
  id: number;
  descricao: string;
  ordem: number;
  tipo: string;
}

export interface Processo {
  id: number;
  nome: string;
  lista: Tag[];
  classe: string;
  numero: number;
  cadeira: number;
  descricao: string;
  situacao: SituacaoDoProcesso;
  tipo: TipoDoProcesso;
  capitulos: Capitulo[];
  checked?: boolean;
}

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {
  @Input() Allselected: any;
  @Output() SelectAll: any;
  @Output() data: {
    checked: Boolean,
    nome: String,
    descricao: String,
    capitulo: {
      titulo: String,
      preliminares: [{
        subtitulo: String,
        texto: String,
      }]
    }
  }

  processosSelecionados: Processo[] = [];
  processos: Processo[];
  
  constructor(
    private _processoService: ProcessoService,
  ) {}

  ngOnInit(): void {
    this._processoService.isCarregarProcesso().subscribe(() => {
      this.processos = [];
      this._buscarProcessos();
    });
  }

  ngOnChanges(changes: SimpleChange) {
    // Extract changes to the input property by its name
    let change: SimpleChange = changes['Allselected']; 
    this.SelectAll = changes['Allselected'].currentValue?.checked;
    if (this.SelectAll) {
      this._processoService.setProcessosSelecionados(this.processos);
      this.processosSelecionados = [...this.processos];
    } else {
      this.processosSelecionados = [];
    }
  }


  check(){
    //this.SelectAll = this.Allselected
  }

  trataEventoDeChecked(data: Processo) {
    if (data.checked) {
      const index = this.processosSelecionados.findIndex(({id}) => id === data.id);
      if (index !== -1) {
        // id do processo já está na coleção
        this.processosSelecionados.splice(index, 1);
      } else {
        // id não está na coleção
        this.processosSelecionados.push(data);
      }
    } else {
      const index = this.processosSelecionados.findIndex(({id}) => id === data.id);
      this.processosSelecionados.splice(index, 1);
    }
    
    this._processoService.setProcessosSelecionados(this.processosSelecionados);
  }

  dadosDaPaginacao(dados: Paginacao): void {
    let params = new HttpParams();
    params = params.set('itensPorPagina', dados.itensPorPagina);
    params = params.set('numeroDaPagina', dados.numeroDaPagina);
    params = params.set('offset', dados.offset);

    this._buscarProcessos(params);
  }

  private _buscarProcessos(params?: HttpParams): void {
    this._processoService.listarProcessos(params).subscribe({
      next: (data) => {
        this.processos = data;
      }
    });
  }

}
