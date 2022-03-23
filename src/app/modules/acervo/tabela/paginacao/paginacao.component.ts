import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

export interface Paginacao {
  itensPorPagina: number;
  numeroDaPagina: number;
  offset: number;
}

@Component({
  selector: 'digital-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.scss']
})
export class PaginacaoComponent implements OnInit {

  @Input() totalDeDados: number = 0;
  @Output() paginacao = new EventEmitter<Paginacao>();

  pageSizeOptions: number[] = [5, 10, 15];

  dadosDaPaginacao: PageEvent;

  offset: number;

  constructor() { 
    this.dadosDaPaginacao = {
      length: this.totalDeDados,
      pageSize: this.pageSizeOptions[0],
      pageIndex: 0,
    }; 
  }

  ngOnInit(): void {
    this._obterOffset();
    this._emitirDadosDaPaginacao();
  }

  private _emitirDadosDaPaginacao(): void {
    this.paginacao.emit({
      itensPorPagina: this.dadosDaPaginacao.pageSize,
      numeroDaPagina: this.dadosDaPaginacao.pageIndex,
      offset: this.offset,
    });
  }

  private _obterOffset(): void {
    this.offset = (this.dadosDaPaginacao.pageSize * this.dadosDaPaginacao.pageIndex);
  }

  public obterDadosDaPaginacao(event: PageEvent): void {
    this.dadosDaPaginacao = event;
    this._obterOffset();
    this._emitirDadosDaPaginacao();
  }

}
