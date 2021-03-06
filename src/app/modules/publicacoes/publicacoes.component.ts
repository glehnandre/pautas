import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { PublicacaoService } from '../services/publicacao.service';
import { PublicacaoDto } from '../acervo/model/interfaces/publicacaoDto.interface';
import { InformacoesDto } from '../acervo/model/interfaces/informacoesDto.interface';


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
  exibidos: PublicacaoDto[] = [];
  right: number;
  left: number;

  pesquisas: string[] = [];
  termo: string;

  constructor(
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _publicacaoService: PublicacaoService,
  ) { }

  /**
     * On init
     */
  ngOnInit(): void {
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
      this.filtraData({data_inicio: new Date(), data_fim: new Date()});
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
   * Recupera todas as publica????es da api
   */
  recuperaPublicacoes(){
    this._publicacaoService.recuperarDje().subscribe(dje=>{
      this.publicacoes = dje.publicacoes;
      this.agregacoes = dje.agregacoes;
    })
  }

  /**
   * Filtra, nas publica????es, os termos j?? pesquisados antes
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
   * Atualiza o vetor "filtrados" com as publica????es filtradas pelo termo
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
   * Retorna um vetor de PublicaoDto com as publica????es filtradas
   * @param termo string que servir?? para fazer o filtro
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
   * Faz o tratamento dos e filtra as publica????es a partir dos filtos din??micos selecionados.
   * @param filtros filtros selecionados.
   */
  trataFiltros(filtros: any[]){
    let filtrar = filtros.filter(filtro=>filtro.tipo==filtros[0].tipo);
    let filtrados = [];
    let tipos = [];

    while(filtrar[0]){
      tipos.push(filtrar[0].tipo);
      filtrar.forEach(filtro=>{
        this.filtrar(filtro.filtro).forEach(filtrado=>{
          if(filtrados.indexOf(filtrado)==-1) filtrados.push(filtrado);
        })
      })
      this.filtrados = filtrados;
      this.trataExibidos();
      filtrados = [];
      filtrar = filtros.filter(filtro=>tipos.indexOf(filtro.tipo)==-1)
    }
    this.hasFiltros = true;
  }

  /**
   * Faz a filtragem de quando todos os filtros din??micos forem desmarcados.
   * @param event contem os atributos "data_inicio" e "data_inicio" que
   * ser??o utilizados para chamar a fun????o filtraData().
   */
  removeFiltros(event: any){
      if(this.pesquisas.length!=0) this.refazPesquisa();
      else this.filtraData(event);
      this.hasFiltros = true;
  }

  /**
   * Filtra as publica????es que est??o no intervalo das datas de inicio e fim.
   * @param event contem os atributos "data_inicio" e "data_inicio" que
   * ser??o utilizados para a filtragem.
   */
  filtraData(event: any){
    if(!event.data_inicio) {
        this.filtrados = this.publicacoes;
        this.trataExibidos();
    }
    else{
      let data_inicio: Date = new Date(event.data_inicio.toString().slice(0, 16));
      let data_fim: Date = new Date(new Date(event.data_fim.toString().slice(0, 16)).setHours(23,59,59));
      let filtros = [];

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
   * Atualiza as publica????es que ser??o exibidas com base nas publica????es
   * filtradas
   */
  trataExibidos(){
    this.exibidos = this.filtrados.slice(0,30);
    this.right = this.exibidos.length;
    this.left = 0;
  }

  /**
   * Desloca as publica????es exibidas para a direita
   */
  proximoExibidos(){
    if(this.filtrados.length>this.right){
      this.exibidos = this.filtrados.slice(this.left+30,this.right+30);
      this.right += this.exibidos.length;
      this.left += 30;
    }
  }

  /**
   * Desloca as publica????es exibidas para a esquerda
   */
  anteriorExibidos(){
    if(this.left>0){
      this.right -= this.exibidos.length;
      this.left -= 30;
      this.exibidos = this.filtrados.slice(this.left,this.right);
    }
  }

}
