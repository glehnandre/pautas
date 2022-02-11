import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, HostListener, Injectable, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ITask, ITaskTag } from 'app/modules/acervo/model/interfaces/itask.interface';
import { PaginacaoCustomizadaComponent } from 'app/modules/acervo/tabela/paginacao/paginacao-customizada.component';
import { AlertaService } from 'app/modules/services/alerta.service';
import { TarefaService } from 'app/modules/services/tarefa.service';
import { EMPTY, merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

export interface Filtro {
    numeroProcesso?: number;
    data_inicio?: string;
    data_fim?: string;
    tags?: ITaskTag[];
}

@Component({
    selector: 'app-tabela',
    templateUrl: './tabela.component.html',
    styleUrls: ['./tabela.component.scss'],
    providers: [{provide: MatPaginatorIntl, useClass: PaginacaoCustomizadaComponent}],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class TabelaComponent implements OnInit, AfterViewInit, OnDestroy {

    tarefas: ITask[] = [];
    displayedColumns: string[] = ['checkbox', 'descricao', 'responsavel', 'data_criacao', 'assumir', 'expandir', 'prioridade'];
    dataSource = new MatTableDataSource<ITask>([]);
    selection = new SelectionModel<ITask>(true, []);
    expandedElement: ITask | null;

    resultsLength = 0;
    pageSize = 30;
    pageSizeOptions: number[] = [30, 50, 80, 100, 1000];
    pageEvent: PageEvent;

    isLoadingResults = true;
    isRateLimitReached = false;

    errorMessage: string;

    @Output() emitirTarefas = new EventEmitter<ITask[]>();
    @Output() emitirTarefasSelecionadas = new EventEmitter<ITask[]>();
    
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private _tarefaService: TarefaService,
        private _route: ActivatedRoute,
        private _alertaService: AlertaService,
    ) { }

    ngAfterViewInit(): void {
        this._route.queryParams.subscribe(params => {
            this._carregarTarefas(params);
        });
    }

    ngOnInit(): void {
        this.selection.changed.subscribe({
            next: (tasksSelecinadas) => {
                this.emitirTarefasSelecionadas.emit(tasksSelecinadas.source.selected)
            },
        });
    }

    ngOnDestroy(): void {
        this.dataSource.disconnect();
    }

    /**
     * @description Whether the number of selected elements matches the total number of rows.
     * @author Douglas da Silva Monteles
    */
    public isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /**
     * @description Selects all rows if they are not all selected; otherwise clear selection.
     * @author Douglas da Silva Monteles
    */
    public masterToggle() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.dataSource.data);
    }

    public obterChavesDoObj(obj: any) {
        return Object.keys(obj);
    }

    @HostListener("window:resize")
    public isTelaPequena(): boolean {
        return window.screen.width < 600;
    }

    private _carregarTarefas(params?: Filtro): void {
        merge(this.paginator.page)
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;

              return this._tarefaService
                    .obterTaferas(params)
                    .pipe(
                        catchError(error => {
                          console.log(error);
                          this.errorMessage =  error.message;
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

              this.resultsLength = data.length;
              return data;
            }),
          ).subscribe({
            next: (data: ITask[]) => {
                this.tarefas = data;
                this.emitirTarefas.emit(this.tarefas);

                const grupoDeTarefas = this._sliceIntoChunks(this.tarefas, this.pageEvent?.pageSize);
                this.dataSource = new MatTableDataSource<ITask>(grupoDeTarefas[this.pageEvent?.pageIndex || 0]);
            }
        });
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
