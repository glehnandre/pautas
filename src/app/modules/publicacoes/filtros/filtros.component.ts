import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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

  data_inicio: Date = new Date();
  data_fim: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  removePesquisa(pesquisa: string){
    this.pesquisas.splice(this.pesquisas.indexOf(pesquisa), 1);
    this.removido.emit({
      chip: pesquisa
    })
  }

  filtrar(){
    
  }
  

}
