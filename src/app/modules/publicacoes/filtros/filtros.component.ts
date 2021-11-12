import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { InformacoesDto } from 'app/modules/acervo/model/interfaces/informacoesDto.interface';

interface Filtros {
  agregacao: InformacoesDto;
  selecionados: string[];
}

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit{

  @Input() agregacoes: InformacoesDto[] = [];
  @Input() pesquisas: string[] = [];
  @Output() removido = new EventEmitter<any>();
  @Output() emiteFiltros = new EventEmitter<any>();
  @Output() emiteData = new EventEmitter<any>();

  filtros: Filtros[] = [];
  data_inicio: Date = new Date();
  data_fim: Date = new Date();

  filtrados: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  removePesquisa(pesquisa: string){
    this.pesquisas.splice(this.pesquisas.indexOf(pesquisa), 1);
    this.removido.emit(pesquisa);
    this.filtrar();
  }

  atualizaFiltros(status: MatCheckboxChange){
    const name = status.source.name;
    if(status.checked){
      this.filtrados.push(name);

      this.filtros.forEach(filtro=>{
        if(filtro.agregacao.itens.find(item=>item.descricao==name))
          filtro.selecionados.push(name);
      })
    }
    else{
      this.filtrados.splice(this.filtrados.indexOf(name), 1);

      this.filtros.forEach(filtro=>{
        if(filtro.agregacao.itens.find(item=>item.descricao==name))
          filtro.selecionados.splice(filtro.selecionados.indexOf(name), 1);
      })
    } 
  }

  filtrar(){
    this.emiteFiltros.emit(this.filtrados);
    this.filtrarData();
  }
  
  recuperaFiltros(): Filtros[]{
    if(this.filtros.length<this.agregacoes.length)
    this.agregacoes.forEach(agregacao=>{
      this.filtros.push({
        agregacao: agregacao,
        selecionados: []
      })
    })
    return this.filtros;
  }

  filtrarData(){
    this.emiteData.emit({
      data_inicio: this.data_inicio,
      data_fim: this.data_fim
    })
  }

  trataDataInicio(event){
    if(event.value) 
      this.data_inicio = event.value._d;
  }

  trataDataFim(event){
    if(event.value) 
      this.data_fim = event.value._d;
  }

}
