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

  /**
   * Remove um termo da lista de termos pesquisados
   * @param pesquisa termo pesquisado
   */
  removePesquisa(pesquisa: string){
    this.pesquisas.splice(this.pesquisas.indexOf(pesquisa), 1);
    this.removido.emit(pesquisa);
    this.filtrar();
  }

  /**
   * Atualiza a lista de filtros selecionados de acordo com o status do checkbox
   * @param status checkbox que foi marcado/desmarcado
   */
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

  /**
   * Emite os filtros selecionados
   */
  filtrar(){
    this.emiteFiltros.emit(this.filtrados);
    this.filtrarData();
  }
  
  /**
   * Retorna um array da interface Filtros, que será usado na geração dos
   * componentes dos filtros dinâmicos no arquivo html
   */
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

  /**
   * Emite a data de inicio e a data de fim selecionados
   */
  filtrarData(){
    this.emiteData.emit({
      data_inicio: this.data_inicio,
      data_fim: this.data_fim
    })
  }

  /**
   * Trata o evento que contém a data de inicio para conter apenas a data 
   * @param event momentum que contem a data selecionada
   */
  trataDataInicio(event: any){
    if(event.value) 
      this.data_inicio = event.value._d;
  }

  /**
   * Trata o evento que contém a data de fim para conter apenas a data 
   * @param event momentum que contem a data selecionada
   */
  trataDataFim(event: any){
    if(event.value) 
      this.data_fim = event.value._d;
  }

}
