import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { InformacoesDto } from 'app/modules/acervo/model/interfaces/informacoesDto.interface';

interface Filtros {
  agregacao: InformacoesDto;
  selecionados: string[];
}

interface Filtrados {
  filtro: string;
  tipo: string;
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
  @Output() removeFiltros = new EventEmitter<any>();
  @Output() emiteData = new EventEmitter<any>();

  filtros: Filtros[] = [];
  data_inicio: Date = new Date();
  data_fim: Date = new Date();

  filtrados: Filtrados[] = [];

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
    const tipo = this.agregacoes.find(agregacao=>agregacao.itens.find(item=>item.descricao==name)).nome;
    if(status.checked){
      this.filtrados.push({filtro: name, tipo: tipo});
      
      this.filtros.forEach(filtro=>{
        if(filtro.agregacao.itens.find(item=>item.descricao==name))
        filtro.selecionados.push(name);
      })
    }
    else{
      this.filtrados.splice(this.filtrados.indexOf(this.filtrados.find(filtrado=>filtrado.filtro==name)), 1);
      
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
    this.filtrarData();
    let emitir = this.filtrados;
    if(this.filtrados[0]){
      this.emiteFiltros.emit(this.filtrados);
      this.filtrados = emitir;
    } 
    else{
      this.removeFiltros.emit({
        data_inicio: this.data_inicio,
        data_fim: this.data_fim
      });
    } 
  }
  
  /**
   * Retorna um array da interface Filtros, que ser?? usado na gera????o dos
   * componentes dos filtros din??micos no arquivo html
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
   * Trata o evento que cont??m a data de inicio para conter apenas a data 
   * @param event momentum que contem a data selecionada
   */
  trataDataInicio(event: any){
    if(event.value) 
      this.data_inicio = event.value._d;
  }

  /**
   * Trata o evento que cont??m a data de fim para conter apenas a data 
   * @param event momentum que contem a data selecionada
   */
  trataDataFim(event: any){
    if(event.value) 
      this.data_fim = event.value._d;
  }

  /**
   * Apaga as datas inicial e final.
   */
  limparDatas(){
    this.data_inicio = null;
    this.data_fim = null;
    this.filtrar();
  }

}
