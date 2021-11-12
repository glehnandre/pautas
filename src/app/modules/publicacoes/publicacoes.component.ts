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

      this._publicacaoService.recuperarDje().subscribe(dje=>{
        this.publicacoes = dje.publicacoes;
        this.agregacoes = dje.agregacoes;
      })
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
   * Filtra em publicações os termos já pesquisados antes
   */
  removePesquisa(){
    this.pesquisas.forEach(pesquisa=>{
      let termos = this.separaTermo(pesquisa);
      termos.forEach(termo=>this.filtrados = this.filtrar("publicacoes", termo));
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
    if(this.pesquisas.length<=1 && !this.hasFiltros) 
      termos.forEach(termo=>{
          if(termo) this.filtrar("publicacoes", termo).forEach(filtrado=>{
          if(filtros.indexOf(filtrado)==-1) filtros.push(filtrado);
        })
      });
    else 
      termos.forEach(termo=>{
          this.filtrar("filtrados", termo).forEach(filtrado=>{
          if(filtros.indexOf(filtrado)==-1) filtros.push(filtrado);
        })
      });

    this.filtrados = filtros;
    }
    this.termo = '';
  }

  /**
   * Retorna um vetor de PublicaoDto com as publicações filtradas
   * @param campo informa em qual campo será filtrado o termo, podendo ser em "publicacoes"
   * ou em "filtrados"
   * @param termo string que servirá para fazer o filtro
   */
  filtrar(campo: string, termo: string): PublicacaoDto[]{
    let filtros = [];
    if(campo=="publicacoes"){
      filtros = this.publicacoes.filter(publicacao=>{
        return publicacao.relator.toLowerCase().includes(termo.toLowerCase())
            || publicacao.tipo.toLowerCase().includes(termo.toLowerCase())
            || publicacao.processo.toLowerCase().includes(termo.toLowerCase())
            || publicacao.envolvidos.find(envolvido=>envolvido.nome.toLowerCase().includes(termo.toLowerCase()))
            || publicacao.envolvidos.find(envolvido=>envolvido.identificacoes.find(identificacao=>identificacao.toLowerCase().includes(termo.toLowerCase())));
      })
    }
    else
      filtros = this.filtrados.filter(publicacao=>{
        return publicacao.relator.toLowerCase().includes(termo.toLowerCase())
            || publicacao.tipo.toLowerCase().includes(termo.toLowerCase())
            || publicacao.processo.toLowerCase().includes(termo.toLowerCase())
            || publicacao.envolvidos.find(envolvido=>envolvido.nome.toLowerCase().includes(termo.toLowerCase()))
            || publicacao.envolvidos.find(envolvido=>envolvido.identificacoes.find(identificacao=>identificacao.toLowerCase().includes(termo.toLowerCase())));
      })
      
    //console.log(filtros);
    return filtros;
    
  }

  /**
   * Separa a string "termo" e retorna um vetor das strings separadas
   * @param termo string a ser separada
   */
  separaTermo(termo: string): string[] {
    let str = [termo];
    if(termo.indexOf('"')==-1)
      str = termo.split(' ');
    else 
      str = termo.split('"');
    
    return str;
  }

  /**
   * Faz o tratamento dos e filtra as publicações a partir dos filtos dinâmicos selecionados.
   * @param filtros filtros selecionados.
   */
  trataFiltros(filtros: any[]){
    if(filtros.length==0){
      this.removePesquisa();
      this.hasFiltros = false;
    }
    else{
      filtros.forEach((filtro, i)=>{
        if(i==0 && this.pesquisas.length==0) this.filtrados = this.filtrar("publicacoes", filtro)
        else this.filtrados = this.filtrar("filtrados", filtro)
      })
      this.hasFiltros = true;
    }
  }

  /**
   * Filtra as publicações que estão no intervalo das datas de inicio e fim.
   * @param event contem os atributos "data_inicio" e "data_inicio" que
   * serão utilizados para a filtragem.
   */
  filtraData(event: any){
    let data_inicio: Date = new Date(event.data_inicio.toString().slice(0, 16));
    let data_fim: Date = new Date(event.data_fim.toString().slice(0, 16));
    let filtros = [];
    if(this.pesquisas.length<=1 && !this.hasFiltros)
      filtros = this.publicacoes.filter(publicacao=>{
        const data_publicacao = new Date(new Date(publicacao.publicacao).setHours(0,0,0,0));
        return data_publicacao >= data_inicio 
            && data_publicacao <= data_fim;
      })
    else
      filtros = this.filtrados.filter(publicacao=>{
        const data_publicacao = new Date(new Date(publicacao.publicacao).setHours(0,0,0,0));
        return data_publicacao >= data_inicio 
            && data_publicacao <= data_fim;
      })
      this.filtrados = filtros;
  }

}
