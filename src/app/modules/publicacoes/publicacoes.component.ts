import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { PublicacaoService } from '../services/publicacao.service';
import { PublicacaoDto } from '../acervo/model/interfaces/publicacaoDto.interface';
import { InformacoesDto } from '../acervo/model/interfaces/informacoesDto.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertaService } from '../services/alerta.service';


@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PublicacoesComponent implements OnInit, OnDestroy {

  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  publicacoes: PublicacaoDto[] = [];
  agregacoes: InformacoesDto[] = [];
  filtrados: PublicacaoDto[] = [];
  hasFiltros: boolean = false;
  hasNumeroProcesso: boolean = false;
  exibidos: PublicacaoDto[] = [];
  right: number;
  left: number;
  data_inicio: Date = new Date();
  data_fim: Date = new Date();

  queryParams: Params;
  tiposParams: string[] = [];

  pesquisas: string[] = [];
  termo: string;

  constructor(
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _alertaService: AlertaService,
    private _publicacaoService: PublicacaoService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  /**
     * On init
     */
  ngOnInit(): void {
    this._router.navigate(
      [],
      {
        relativeTo: this._route,
        queryParams: null,
        replaceUrl: true,
      });
    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Set the drawerMode and drawerOpened if
        if (matchingAliases.includes('lg')) {
          this.drawerMode = 'side';
          this.drawerOpened = true;
        }
        else {
          this.drawerMode = 'over';
          this.drawerOpened = false;
        }
      });

      this.recuperaPublicacoes();
      if(this.data_inicio.getDay()==6) this.data_inicio.setDate(this.data_inicio.getDate()-1);
      else if(this.data_inicio.getDay()==0) this.data_inicio.setDate(this.data_inicio.getDate()-2);
      if(this.data_fim.getDay()==6) this.data_fim.setDate(this.data_fim.getDate()-1);
      else if(this.data_fim.getDay()==0) this.data_fim.setDate(this.data_fim.getDate()-2);
      this.filtraData({data_inicio: this.data_inicio, data_fim: this.data_fim});

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /**
   * Recupera todas as publicações da api
   */
  recuperaPublicacoes(){
    this._publicacaoService.recuperarDje().subscribe(dje=>{
      this.publicacoes = dje.publicacoes;
      this.agregacoes = dje.agregacoes;
    })
  }

  /**
   * Filtra, nas publicações, os termos já pesquisados antes
   */
  refazPesquisa(){
    this.pesquisas.forEach((pesquisa, i)=>{
      let termos = this.separaTermo(pesquisa);
      let filtros = [];
      termos.forEach(termo=>{
        if(termo){
            this.filtrar(termo).forEach(filtrado=>{
              if(filtros.indexOf(filtrado)==-1) filtros.push(filtrado);
            })
          this.filtrados = filtros;
          this.trataExibidos();
        }
      });
    })
  }

  /**
   * Atualiza o vetor "filtrados" com as publicações filtradas pelo termo
   * pesquisado
   */
  atualizaPesquisa(): void{
    if(this.termo && this.pesquisas.indexOf(this.termo)==-1){

    this.pesquisas.push(this.termo);

    let termos = this.separaTermo(this.termo);
    let filtros = [];

    termos.forEach(termo=>{
        this.filtrar(termo).forEach(filtrado=>{
        if(filtros.indexOf(filtrado)==-1) filtros.push(filtrado);
      })
    });

    this.filtrados = filtros;
    this.trataExibidos();
    }
    this.termo = '';
  }

  /**
   * Retorna um vetor de PublicaoDto com as publicações filtradas
   * @param termo string que servirá para fazer o filtro
   */
  filtrar(termo: string): PublicacaoDto[]{
    let filtros = [];
    filtros = this.filtrados.filter(publicacao=>{
      return publicacao.relator.toLowerCase().includes(termo.toLowerCase())
          || publicacao.tipo.toLowerCase().includes(termo.toLowerCase())
          || publicacao.processo.toLowerCase().includes(termo.toLowerCase())
          || publicacao.envolvidos.find(envolvido=>envolvido.nome.toLowerCase().includes(termo.toLowerCase()))
          || publicacao.envolvidos.find(envolvido=>envolvido.identificacoes.find(identificacao=>identificacao.toLowerCase().includes(termo.toLowerCase())));
    })

    return filtros;

  }

  /**
   * Separa a string "termo" e retorna um vetor das strings separadas
   * @param termo string a ser separada
   */
  separaTermo(termo: string): string[] {
    let str1 = [termo];
    let str = [];
    if(termo.indexOf('"')==-1)
      str1 = termo.split(' ');
    else
      str1 = termo.split('"');

    str1.forEach(string=>{
      if(string!='') str.push(string);
    })
    return str;
  }

  /**
   * Faz o tratamento e filtra as publicações a partir dos filtos dinâmicos selecionados.
   * @param filtros filtros selecionados.
   */
  trataFiltros(filtros: any[], toParams: boolean = true){
    let filtrar = filtros.filter(filtro=>filtro.tipo==filtros[0].tipo);
    let filtrados = [];
    let tipos = [];
    let params = [];
    
    this.redefinirParams();
    
    while(filtrar[0]){
      tipos.push(filtrar[0].tipo);
      filtrar.forEach(filtro=>{
        this.filtrar(filtro.filtro).forEach(filtrado=>{
          if(filtrados.indexOf(filtrado)==-1) filtrados.push(filtrado);
        })
        params.push(filtro.filtro.replace(/ /g, '-'));
      })
      if(!toParams){
        this.filtrados = filtrados;
        this.trataExibidos();
      }

      if(this.tiposParams.indexOf(filtrar[0].tipo)==-1)
      this.tiposParams.push(filtrar[0].tipo);
      this.montaParams(filtrar[0].tipo, params);

      params = [];
      filtrados = [];
      filtrar = filtros.filter(filtro=>tipos.indexOf(filtro.tipo)==-1)
    }
    this.hasFiltros = true;
  }

  /**
   * Faz o tratamento e filtra as publicações a partir do numero do processo.
   * @param numeroProcesso numero do processo inserido.
   */
  trataProcesso(numeroProcesso: string){
    this.hasNumeroProcesso = true;
    let filtros = [];
    this.filtrar(numeroProcesso).forEach(filtrado=>{
      if(filtros.indexOf(filtrado)==-1) filtros.push(filtrado);
    })
    this.filtrados = filtros;
    this.trataExibidos();
  }

  /**
   * Faz a filtragem de quando todos os filtros dinâmicos forem desmarcados.
   * @param event contem os atributos "data_inicio" e "data_inicio" que
   * serão utilizados para chamar a função filtraData().
   */
  removeFiltros(event: any){
      if(this.pesquisas.length!=0) this.refazPesquisa();
      else if(!this.hasNumeroProcesso) this.filtraData(event);
      this.tiposParams.forEach(tipo=>{
        this.montaParams(tipo, null);
      })
      this.hasFiltros = true;
  }

  /**
   * Filtra as publicações que estão no intervalo das datas de inicio e fim.
   * @param event contem os atributos "data_inicio" e "data_inicio" que
   * serão utilizados para a filtragem.
   */
  filtraData(event: any){
    if(!event.data_inicio) {
        this.filtrados = this.publicacoes;
        this.trataExibidos();
        this.montaParams("Data", null)
    }
    else{
      let data_inicio: Date = new Date(event.data_inicio.toString().slice(0, 16));
      let data_fim: Date = new Date(new Date(event.data_fim.toString().slice(0, 16)).setHours(23,59,59));
      let filtros = [];
      this.montaParams("Data", [data_inicio.toISOString() + "_" + data_fim.toISOString()])
      filtros = this.publicacoes.filter(publicacao=>{
        let day: number;

        if(publicacao.publicacao.length>10)
          day = new Date(publicacao.publicacao).getDate();
        else
          day = new Date(publicacao.publicacao).getDate()+1;

        const data_publicacao = new Date(new Date(publicacao.publicacao).setDate(day));

        return data_publicacao >= data_inicio
            && data_publicacao <= data_fim;
      })
        this.filtrados = filtros;
        this.trataExibidos();
    }

    this.refazPesquisa();
  }

  /**
   * Atualiza as publicações que serão exibidas com base nas publicações
   * filtradas
   */
  trataExibidos(){
    this.exibidos = this.filtrados.slice(0,30);
    this.right = this.exibidos.length;
    this.left = 0;
  }

  /**
   * Desloca as publicações exibidas para a direita
   */
  proximoExibidos(){
    if(this.filtrados.length>this.right){
      this.exibidos = this.filtrados.slice(this.left+30,this.right+30);
      this.right += this.exibidos.length;
      this.left += 30;
    }
  }

  /**
   * Desloca as publicações exibidas para a esquerda
   */
  anteriorExibidos(){
    if(this.left>0){
      this.right -= this.exibidos.length;
      this.left -= 30;
      this.exibidos = this.filtrados.slice(this.left,this.right);
    }
  }

  montaParams(tipo: string, descricoes: any[]){
    let param: string = null;
    if(descricoes)
    descricoes.forEach((descricao, i)=>{
      if(i==0) param = `${descricao}`;
      else param += `_${descricao}`
    })
    this.queryParams = { [tipo]: param };

    this._router.navigate(
      [],
      {
        relativeTo: this._route,
        queryParams: this.queryParams,
        queryParamsHandling: 'merge',
      });
  }

  redefinirParams(){
    this._router.navigate(
      [],
      {
        relativeTo: this._route,
        replaceUrl: true
      });
  }

  alertaFiltroVazio() {
    if(this.pesquisas.length == 0) {
      this._alertaService.exibirAlerta('Filtro Vazio');
    }
  }
}
