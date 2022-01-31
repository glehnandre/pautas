import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Injectable, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ITask, ITaskTag } from 'app/modules/acervo/model/interfaces/itask.interface';
import { PaginacaoCustomizadaComponent } from 'app/modules/acervo/tabela/paginacao/paginacao-customizada.component';
import { TarefaService } from 'app/modules/services/tarefa.service';
import { EMPTY, merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

interface Filtro {
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
export class TabelaComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

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

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Input() filtros: Filtro;
    @Output() emitirTarefas = new EventEmitter<ITask[]>();

    constructor(
        private _tarefaService: TarefaService,
    ) { }

    ngAfterViewInit(): void {
        this._carregarTarefas();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.filtros.firstChange === false) {
            this.paginator.firstPage();
            this._filtrarListaDeTarefas();
        }

        if (changes.filtros.currentValue === null) {
            this._carregarTarefas();
        }
    }

    ngOnInit(): void {}

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

    /**
     * @description The label for the checkbox on the passed row
     * @author Douglas da Silva Monteles
    */
    public checkboxLabel(row?: ITask): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

    public setPageSizeOptions(setPageSizeOptionsInput: string) {
        if (setPageSizeOptionsInput) {
            this.pageSizeOptions = setPageSizeOptionsInput
                .split(',')
                .map(str => +str);
        }
    }

    public obterChavesDoObj(obj: any) {
        return Object.keys(obj);
    }

    private _carregarTarefas(tarefas: ITask[] = []): void {
        merge(this.paginator.page)
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;

              if (this.filtros) {
                return Promise.resolve(tarefas);
              } else {
                return this._tarefaService
                    .obterTaferas(
                        this.pageEvent?.pageSize,
                        this.pageEvent?.pageIndex
                    )
                    .pipe(catchError(() => EMPTY));
              }
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
                if (!this.filtros) {
                    this.tarefas = data;
                    this.emitirTarefas.emit(this.tarefas);
                }

                const grupoDeTarefas = this._sliceIntoChunks(data, this.pageEvent?.pageSize);

                this.dataSource = new MatTableDataSource<ITask>(grupoDeTarefas[this.pageEvent?.pageIndex || 0]);
                
            }
        });
    }

    private _filtrarListaDeTarefas(): void {
        let tarefasFiltradas = [...this.tarefas];
        console.log(this.filtros)

        // Filtrar por data de inicio e fim
        if (this.filtros?.data_inicio && this.filtros?.data_fim) {
            const { data_inicio, data_fim } = this.filtros;

            const dataInicioDoFiltro = new Date(data_inicio);
            dataInicioDoFiltro.setHours(0,0,0,0);

            const dataFimDoFiltro = new Date(data_fim);
            dataFimDoFiltro.setHours(0,0,0,0);

            
            tarefasFiltradas = tarefasFiltradas.filter(t => {
                const dataInicioDaTarefa = new Date(t.startDate);
                dataInicioDaTarefa.setHours(0,0,0,0);

                const dataFimDaTarefa = new Date(t.completedDate);
                dataFimDaTarefa.setHours(0,0,0,0);

                if (dataInicioDaTarefa.getTime() >= dataInicioDoFiltro.getTime()) {
                    if (dataFimDaTarefa.getTime() > 0) {
                        if (dataFimDaTarefa.getTime() <= dataFimDoFiltro.getTime()) {
                            return true;
                        }
                    } else {
                        if (dataInicioDaTarefa.getTime() <= dataFimDoFiltro.getTime()) {
                            return true;
                        }
                    }
                }

                return false;
            });
        }
        console.log(tarefasFiltradas)

        // Filtrar por número do processo
        if (this.filtros?.numeroProcesso) {
            const { numeroProcesso } = this.filtros;
            
            tarefasFiltradas = tarefasFiltradas.filter(t => {
                const numero = t.searchableId.split(' ')[1];
                return (+numeroProcesso === +numero);
            });
        }
        console.log(tarefasFiltradas)

        // Filtrar por tag
        if (this.filtros?.tags && this.filtros.tags.length > 0) {
            const { tags } = this.filtros;

            for (const tag of tags) {
                for (const task of tag.tasks) {
                    tarefasFiltradas = tarefasFiltradas.filter(t => {
                        return (t?.etags && t.etags.includes(task));
                    });
                }
            }
        }
        console.log(tarefasFiltradas)

        this._carregarTarefas(tarefasFiltradas);
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
