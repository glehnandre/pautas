import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InformacoesDto } from 'app/modules/acervo/model/interfaces/informacoesDto.interface';
import { isEmpty } from 'lodash';

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
export class FiltrosComponent implements OnInit, OnChanges{

  @Input() agregacoes: InformacoesDto[] = [];
  @Input() pesquisas: string[] = [];
  @Input() data_inicio: Date = new Date();
  @Input() data_fim: Date = new Date();
  @Output() removido = new EventEmitter<any>();
  @Output() emiteFiltros = new EventEmitter<any>();
  @Output() removeFiltros = new EventEmitter<any>();
  @Output() emiteData = new EventEmitter<any>();
  @Output() emiteProcesso = new EventEmitter<any>();
  @Output() emiteAlerta = new EventEmitter<void>();

  filtros: Filtros[] = [];
  numeroProcesso = new FormControl('');
  filtrados: Filtrados[] = [];

  pastPesquisasLength = 0;
  pastProcessoValue = '';
  queryParams: Params;
  checkbox: MatCheckboxChange[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    ) { }

  ngOnInit(): void {
    if(!isEmpty(this._route.snapshot.queryParams)) this.trataParams()
    else
      this.montaParams("Periodo", [this.data_inicio.toISOString() + "_" + this.data_fim.toISOString()]);
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes.agregacoes.currentValue.length>0)
        this.atualizaCheckbox();
  }

  /**
   * Atualiza os filtros dinâmicos marcados de acordo com os queryParams
   */
  atualizaCheckbox(){
    this.checkbox.forEach(filtro=>{
      let name = filtro.source.name;
      let tipo = this.agregacoes.find(agregacao=>agregacao.itens.find(item=>item.descricao==name)).nome;
      this.filtrados.push({filtro: name, tipo: tipo});

      this.recuperaFiltros().forEach(filtro=>{
        if(filtro.agregacao.itens.find(item=>item.descricao==name))
        filtro.selecionados.push(name);
      })
    })
    this.filtrar();
  }

  /**
   * Retorna o vetor de pesquisas e atualiza o quaryParam do tipo "Palavra Chave"
   */
  getPesquisa(): string[]{
    if(this.pesquisas.length>this.pastPesquisasLength)
    this.subParams("Palavra Chave");
    this.pastPesquisasLength = this.pesquisas.length;
    return this.pesquisas;
  }

  /**
   * Remove um termo da lista de termos pesquisados
   * @param pesquisa termo pesquisado
   */
  removePesquisa(pesquisa: string){
    this.pesquisas.splice(this.pesquisas.indexOf(pesquisa), 1);
    this.subParams("Palavra Chave")
    this.pastPesquisasLength--;
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
      
      this.montaParams(tipo);

      this.filtros.forEach(filtro=>{
        if(filtro.agregacao.itens.find(item=>item.descricao==name))
        filtro.selecionados.push(name);
      })
    }
    else{
      this.filtrados.splice(this.filtrados.indexOf(this.filtrados.find(filtrado=>filtrado.filtro==name)), 1);

      this.subParams(tipo);

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
    this.filtrarProcesso();
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
    
    this.alertaFiltroVazio();
  }

  /**
   * Apaga todos os dados no filtro
   */
  limparFiltros() {
    this.filtrados.splice(0, this.filtrados.length);

    this.filtros.forEach(filtro=>{
      filtro.selecionados.splice(0, filtro.selecionados.length);
    });

    this.removeFiltros.emit({
      data_inicio: this.data_inicio,
      data_fim: this.data_fim
    });

    this.pesquisas.forEach(pesquisa =>
      this.removido.emit(pesquisa))
    this.pesquisas.splice(0, this.pesquisas.length);
    this.limparDatas();

    this.numeroProcesso.setValue('');
    this.subParams("Numero do processo");
    this.removeParams();
  }

  /**
   * Informa se um item de um determinado tipo de filtro foi marcado.
   * @param filtro filtro para fazer a comparação
   * @param descricao nome do item do filtro
   */
  selecionado(filtro: any, descricao: string): boolean {
    return filtro.selecionados.find(selecionado => selecionado === descricao) ? true: false;
  }

  /**
   * Emite um alerta caso nenhum filtro esteja selecionado
   */
  alertaFiltroVazio() {
    const isFiltros = this.filtros.filter(filtro => filtro.selecionados.length > 0).length > 0,
          isData = this.data_inicio !== null && this.data_fim !== null,
          isNumeroProcesso = this.numeroProcesso.value !== '';
    if(!(isFiltros || isData || isNumeroProcesso)) {
      this.emiteAlerta.emit();
    }
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
   * Emite o número do processo inserido para a filtragem
   */
  filtrarProcesso(){
    if(this.numeroProcesso.value)
      this.montaParams("Numero do processo", [this.numeroProcesso.value]);
    else if(this.numeroProcesso.value!=this.pastProcessoValue)
      this.subParams("Numero do processo");
    this.pastProcessoValue = this.numeroProcesso.value;
    this.emiteProcesso.emit(this.numeroProcesso.value);
  }

  /**
   * Trata o evento que contém a data de inicio para conter apenas a data
   * @param event momentum que contem a data selecionada
   */
  trataDataInicio(event: any){
    if(event.value){
      this.data_inicio = event.value._d;
      this.montaParams("Periodo", [this.data_inicio.toISOString()]);
    }
  }

  /**
   * Trata o evento que contém a data de fim para conter apenas a data
   * @param event momentum que contem a data selecionada
   */
  trataDataFim(event: any){
    if(event.value){
      this.data_fim = event.value._d;
      this.montaParams("Periodo", [this.data_inicio.toISOString() + "_" + this.data_fim.toISOString()]);
    }
  }

  /**
   * Apaga as datas inicial e final.
   */
  limparDatas(toFilter = true){
    this.data_inicio = null;
    this.data_fim = null;
    if(toFilter)
    this.filtrar();
    this.subParams("Periodo");
  }

  /**
   * Atualiza os queryParams com o tipo recebido
   * @param tipo tipo do queryParam.
   * @param descricoes descrição que será vilculada ao tipo (usado para os tipos Periodo
   * ou Numero do processo)
   */
  montaParams(tipo: string, descricoes: any[] = []){
    let param = null;

    if(tipo!="Periodo" && tipo!="Numero do porcesso" && tipo!="Palavra Chave"){
      this.filtrados.filter(filtrado=>filtrado.tipo==tipo).forEach(descricao=>{
        descricoes.push(descricao.filtro);
      });
    }

    if(tipo=="Palavra Chave"){
      this.pesquisas.forEach(pesquisa=>{
        descricoes.push(pesquisa);
      })
    }

    if(descricoes)
    descricoes.forEach((descricao, i)=>{
      if(i==0) param = `${descricao}`;
      else param += `_${descricao}`
    })

    this.queryParams = { [tipo.replace(/ /g, '-')]: param.replace(/ /g, '-') };

    this._router.navigate(
      [],
      {
        relativeTo: this._route,
        queryParams: this.queryParams,
        queryParamsHandling: 'merge',
      });
  }

  /**
   * Remove uma descrição dos queryParams do tipo recebido
   * @param tipo tipo do queryParam.
   */
  subParams(tipo: string){
    const tipos = ['Periodo', 'Numero do processo'];
    if(this.filtrados.some(filtrado=>filtrado.tipo==tipo) && !tipos.some(t=>t==tipo)) this.montaParams(tipo);
    else if(tipo=="Palavra Chave" && this.pesquisas.length>0) this.montaParams("Palavra Chave") 
    else {
      this._router.navigate(
        [],
        {
          relativeTo: this._route,
          queryParams: {[tipo.replace(/ /g, '-')]: null},
          queryParamsHandling: 'merge',
        });
    }
  }

  /**
   * Remove todos os queryParams
   */
  removeParams(){
    this._router.navigate(
      [],
      {
        relativeTo: this._route,
        queryParams: null,
        replaceUrl: true
      });
  }

  /**
   * Atualiza os filtros aplicados na página de acordo com os queryParams
   */
  trataParams(){
    let params = this._route.snapshot.queryParams;
    const estaticos = ["Palavra-Chave", "Periodo", "Numero-do-processo"];

    if(!params['Periodo']){
      this.limparDatas(false);
    }

    if(params['Numero-do-processo']){
      this.numeroProcesso.setValue(parseInt(params['Numero-do-processo']));
      this.pastProcessoValue = params['Numero-do-processo'];
    }

    let url = this._router.url.slice(13);
    url.split("&").forEach(param=>{
      if(!estaticos.includes(param.split("=")[0])){
        this.checkbox.push({
          checked: true, 
          source: {name: decodeURI(param.split("=")[1]).replace(/-/g, ' ')} as MatCheckbox
        });
      }
    })
  }

}
