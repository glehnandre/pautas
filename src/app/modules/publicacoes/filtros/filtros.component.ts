import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { InformacoesDto } from 'app/modules/acervo/model/interfaces/informacoesDto.interface';


@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit {

  @Input() agregacoes: InformacoesDto[] = [];
  @Input() pesquisas: string[] = [];
  @Output() removido = new EventEmitter<any>();
  @Output() emiteFiltros = new EventEmitter<any>();

  data_inicio: Date = new Date();
  data_fim: Date = new Date();

  filtros: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  removePesquisa(pesquisa: string){
    this.pesquisas.splice(this.pesquisas.indexOf(pesquisa), 1);
    this.removido.emit(pesquisa);
    this.filtrar();
  }

  atualizaFiltros(status: MatCheckboxChange){
   if(status.checked) this.filtros.push(status.source.name);
   else this.filtros.splice(this.filtros.indexOf(status.source.name), 1);
  }

  filtrar(){
    this.emiteFiltros.emit(this.filtros);
  }
  

}
