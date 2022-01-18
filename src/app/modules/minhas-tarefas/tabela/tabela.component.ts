import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Injectable, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ITask, ITaskTag } from 'app/modules/acervo/model/interfaces/itask.interface';
import { PaginacaoCustomizadaComponent } from 'app/modules/acervo/tabela/paginacao/paginacao-customizada.component';
import { TarefaService } from 'app/modules/services/tarefa.service';
import { EMPTY, merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-tabela',
    templateUrl: './tabela.component.html',
    styleUrls: ['./tabela.component.scss'],
    providers: [{provide: MatPaginatorIntl, useClass: PaginacaoCustomizadaComponent}],
})
export class TabelaComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

    displayedColumns: string[] = ['checkbox', 'descricao', 'responsavel', 'data_criacao', 'opcoes', 'prioridade'];
    dataSource = new MatTableDataSource<ITask>([]);
    selection = new SelectionModel<ITask>(true, []);

    resultsLength = 0;
    pageSize = 30;
    pageSizeOptions: number[] = [30, 50, 80, 100, 1000];
    pageEvent: PageEvent;

    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    @Input() filtros: ITaskTag[];

    constructor(
        private _tarefaService: TarefaService,
    ) { }

    ngAfterViewInit(): void {
        this._carregarTarefas();
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes)
        if (!changes.filtros.firstChange) {
            this._filtrarListaDeTarefas();
        }

        if (changes.filtros.currentValue.length === 0 && !changes.filtros.firstChange) {
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

    public criarChipsDaTarefa(extraInfo: {[key: string]: string}): Array<string> {
        if (extraInfo) {
            const chips: string[] = [];

            Object.keys(extraInfo).forEach((key: string) => {
                const newKey = `${key[0].toUpperCase()}${key.substring(1)}`;
                chips.push(`${newKey}: ${extraInfo[key]}`);
            });

            return chips;
        }

        return [];
    }

    private _carregarTarefas(): void {
        merge(this.paginator.page, this.filtros)
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;

              return this._tarefaService
                .obterTaferas(
                    this.pageEvent?.pageSize,
                    this.pageEvent?.pageIndex
                )
                .pipe(catchError(() => EMPTY));
            }),
            map(data => {
              this.isLoadingResults = false;
              this.isRateLimitReached = data === null;

              if (data === null) {
                return [];
              }

              // Alterar o length para o atributo que informa o total de resultados
              this.resultsLength = data['totalDeItens'];
              return data['data'];
            }),
          ).subscribe({
            next: (tarefas: ITask[]) => {
                this.dataSource = new MatTableDataSource<ITask>(tarefas);
                console.log(this.dataSource.data);
            }
        });
    }

    private _filtrarListaDeTarefas(): void {
        const tarefas = this.dataSource.data;
        
        const tarefasFiltradas = tarefas.filter(({context, command}) => {
            if (this.filtros.length > 0) {
                const index = this.filtros
                    .findIndex(t => t.id === `${context}:${command}`);

                return index !== -1;
            }
            return false;
        });

        this.dataSource = new MatTableDataSource<ITask>(tarefasFiltradas);
    }

}
