import { SelectionModel } from '@angular/cdk/collections';
import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { AlertaService } from 'app/modules/services/alerta.service';
import { SessaoDeJulgamentoService } from 'app/modules/services/sessao-de-julgamento.service';
import { SessaoDeJulgamento } from 'app/shared/model/interfaces/sessao-julgamento.interface';
import { merge, startWith, switchMap, catchError, map, Observable, EMPTY } from 'rxjs';

interface Filtro {

}
@Component({
  selector: 'digital-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit, AfterViewInit {

  sessoes: SessaoDeJulgamento[] = [];
  displayedColumns: string[] = [
    'numero-ano-sessao', 
    'colegiado', 
    'modalidade', 
    'inicio', 
    'fim', 
    'qtd-processos', 
    'status-sessao'
  ];
  dataSource = new MatTableDataSource<SessaoDeJulgamento>([]);

  resultsLength = 0;
  pageSize = 30;
  pageSizeOptions: number[] = [30, 50, 80, 100, 1000];
  pageEvent: PageEvent;

  isLoadingResults = true;
  isRateLimitReached = false;

  errorMessage: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _sessaoJulgamento: SessaoDeJulgamentoService,
    private _alertaService: AlertaService,
    private _router: Router,
  ) { }

  ngAfterViewInit(): void {
    this._carregarSessoes();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }

  public obterChavesDoObj(obj: any) {
    return Object.keys(obj);
  }

  public getQtdProcessosFormatado(qtdProcessos: number, qtdZeros: number = 3): string {
    let zeros = "";

    for (let i = 0; i < qtdZeros; i++) {
      zeros += "0";
    }
    
    return (zeros + qtdProcessos).slice(-zeros.length);
  }

  @HostListener("window:resize", ['$event'])
  public isTelaPequena(): boolean {
    return window.innerWidth < 600;
  }

  public navegarParaDetalhesDaSessao(sessao: SessaoDeJulgamento): void {
    const {numero, ano} = sessao;

    this._router.navigate(['sessoes-julgamento/detalhes'], {
      queryParams: {
        numero, 
        ano,
      }
    });
  }

  private _carregarSessoes(params?: Filtro): void {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          return this._sessaoJulgamento
            .listarTodasAsSessoesDeJulgamento()
            .pipe(
              map(data => this._sortData(data, this.sort.active, 
                this.sort.direction, this.paginator.pageIndex)),
              catchError(error => {
                console.log(error);
                this.errorMessage = error.message;
                this._alertaService.exibirAlerta("Error")
                return EMPTY;
              })
            );
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          this.resultsLength = data.length; // tamanho da lista
          return data;
        }),
      ).subscribe({
        next: (data: any[]) => {
          this.sessoes = data;
          console.log(this.sessoes)

          const grupoDeTarefas = this._sliceIntoChunks(this.sessoes, this.pageEvent?.pageSize);
          this.dataSource = new MatTableDataSource<SessaoDeJulgamento>(grupoDeTarefas[this.pageEvent?.pageIndex || 0]);
        }
      });
  }

  private _sortData(data: Array<any>, sort: string, order: SortDirection, page: number): Array<any> {
    let keys = sort.split('-');
    let arr = data;
    
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      arr = arr.sort((a, b) => {
        let keyA = a[key];
        let keyB = b[key];

        if (key === 'inicio' || key === 'fim') { // ordenação por data
          if (order === 'asc') {
            if (new Date(keyA).getTime() > new Date(keyB).getTime()) return 1;
            if (new Date(keyA).getTime() < new Date(keyB).getTime()) return -1;
          } else {
            if (new Date(keyA).getTime() < new Date(keyB).getTime()) return 1;
            if (new Date(keyA).getTime() > new Date(keyB).getTime()) return -1;
          }
        } else {
          if (order === 'asc') {
            if (keyA > keyB) return 1;
            if (keyA < keyB) return -1;
          } else {
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
          }
        }
        return 0;
      });
    }

    return arr;
  }

  private _sliceIntoChunks(arr: Array<any>, chunkSize: number = 30): Array<any> {
    const res = [];

    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }

    return res;
  }

}
