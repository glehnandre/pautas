import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, Output, SimpleChange, EventEmitter } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tag } from '../acoes/agrupar-emlista/agrupar-emlista.component';
import { ProcessoCheckboxProps } from './linha/linha.component';
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
  @Output() colecaoIdsProcesso = new EventEmitter<number[]>();

  idsDosProcessos: number[] = [];
  idsProcessoChecked: number[] = [];
  processos: Processo[] = [];
  
  constructor(private _httpClient: HttpClient) {
    this.data ={
      checked: true,
      nome: "Nome",
      descricao:"Descrição",
      capitulo: {
        titulo: "título",
        preliminares: [{
          subtitulo: "Subtitulo",
          texto: "texto",
        }]
      }

    }
  }

  ngOnInit(): void {
    // this._listarTodosOsProcessos().subscribe({
    //   next: (data) => {
    //     this.processos = data;
    //     this.processos
    //       .forEach(processo => this.idsDosProcessos.push(processo.id));
    //   }
    // });
  }

  ngOnChanges(changes: SimpleChange){
    // Extract changes to the input property by its name
    let change: SimpleChange = changes['Allselected']; 
    this.SelectAll = changes['Allselected'].currentValue?.checked;
    if (this.SelectAll) {
      this.colecaoIdsProcesso.emit(this.idsDosProcessos);
      this.idsProcessoChecked = [...this.idsDosProcessos];
    } else {
      this.idsProcessoChecked = [];
    }
  }


  check(){
    //this.SelectAll = this.Allselected
  }

  trataEventoDeChecked(data: ProcessoCheckboxProps) {
    if (data.checked) {
      const index = this.idsProcessoChecked.findIndex(id => id === data.processoId);
      if (index !== -1) {
        // id do processo já está na coleção
        this.idsProcessoChecked.splice(index, 1);
      } else {
        // id não está na coleção
        this.idsProcessoChecked.push(data.processoId);
      }
    } else {
      const index = this.idsProcessoChecked.findIndex(id => id === data.processoId);
      this.idsProcessoChecked.splice(index, 1);
    }

    this.colecaoIdsProcesso.emit(this.idsProcessoChecked);
  }

  private _listarTodosOsProcessos(params?: HttpParams): Observable<Processo[]> {
    return this._httpClient.get<Processo[]>('processos', {
      params
    }).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  dadosDaPaginacao(dados: Paginacao): void {
    let params = new HttpParams();
    params = params.set('itensPorPagina', dados.itensPorPagina);
    params = params.set('numeroDaPagina', dados.numeroDaPagina);
    params = params.set('offset', dados.offset);

    this._httpClient.get<Processo[]>('processos/paginacao', {
      params
    }).subscribe(data => {
      this.processos = data;
      console.log(this.processos)
      this.processos
          .forEach(processo => this.idsDosProcessos.push(processo.id));
    });
  }

}
