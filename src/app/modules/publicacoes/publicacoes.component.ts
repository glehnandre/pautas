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
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  removePesquisa(termo: any){
    this.pesquisas.forEach(pesquisa=>{
      this.filtrar("publicacoes", pesquisa);
    })
  }

  atualizaPesquisa(): void{
    if(this.termo && this.pesquisas.indexOf(this.termo)==-1)
    this.pesquisas.push(this.termo);
    if(this.pesquisas.length<=1) this.filtrar("publicacoes", this.termo);
    else this.filtrar("filtrados", this.termo);
    this.termo = '';
  }

  filtrar(campo: string, termo: string){
    let filtros;
    if(campo=="publicacoes"){
      filtros = this.publicacoes.filter(publicacao=>{
        return publicacao.relator.toLowerCase().includes(termo.toLowerCase())
            || publicacao.tipo.toLowerCase().includes(termo.toLowerCase())
            || publicacao.processo.toLowerCase().includes(termo.toLowerCase());
      })
    }
    else
      filtros = this.filtrados.filter(publicacao=>{
        return publicacao.relator.toLowerCase().includes(termo.toLowerCase())
            || publicacao.tipo.toLowerCase().includes(termo.toLowerCase())
            || publicacao.processo.toLowerCase().includes(termo.toLowerCase());
      })
      
    this.filtrados = filtros;
    
    //console.log(this.filtrados);
  }

}
