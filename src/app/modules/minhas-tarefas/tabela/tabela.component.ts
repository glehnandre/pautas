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
    classesSelecionadas?: Array<{nome:string, total:number}>;
}

@Component({
    selector: 'app-tabela',
    templateUrl: './tabela.component.html',
    styleUrls: ['./tabela.component.scss'],
    providers: [{provide: MatPaginatorIntl, useClass: PaginacaoCustomizadaComponent}],
})
export class TabelaComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

    tarefas: ITask[] = [];
    displayedColumns: string[] = ['checkbox', 'descricao', 'responsavel', 'data_criacao', 'opcoes', 'prioridade'];
    dataSource = new MatTableDataSource<ITask>([]);
    selection = new SelectionModel<ITask>(true, []);

    resultsLength = 0;
    pageSize = 30;
    pageSizeOptions: number[] = [30, 50, 80, 100, 1000];
    pageEvent: PageEvent;

    isLoadingResults = true;
    isRateLimitReached = false;

    classes: Array<{nome: string; total: number}> = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    @Input() filtros: Filtro;
    @Output() emitirClassesDosProcessos = new EventEmitter();

    constructor(
        private _tarefaService: TarefaService,
    ) { }

    ngAfterViewInit(): void {
        this._carregarTarefas();
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes)
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
                    this._obterAsClassesDosProcessos();
                }

                const grupoDeTarefas = this._sliceIntoChunks(data, this.pageEvent?.pageSize);

                this.dataSource = new MatTableDataSource<ITask>(grupoDeTarefas[this.pageEvent?.pageIndex || 0]);
                console.log(this.dataSource.data);
            }
        });
    }

    private _filtrarListaDeTarefas(): void {
        let tarefasFiltradas: ITask[] = [];

        this.tarefas.forEach(t => {
            // Filtrar por data de inicio e fim
            if (this.filtros?.data_inicio && this.filtros?.data_fim) {
                const { data_inicio, data_fim } = this.filtros;
                const tarefasFiltradasPorPeriodo = [];

                const dataInicioDoFiltro = new Date(data_inicio);
                dataInicioDoFiltro.setHours(0,0,0,0);

                const dataFimDoFiltro = new Date(data_fim);
                dataFimDoFiltro.setHours(0,0,0,0);

                const dataInicioDaTarefa = new Date(t.startDate);
                dataInicioDaTarefa.setHours(0,0,0,0);

                const dataFimDaTarefa = new Date(t.completedDate);
                dataFimDaTarefa.setHours(0,0,0,0);

                if (dataInicioDaTarefa.getTime() >= dataInicioDoFiltro.getTime()) {
                    if (dataFimDaTarefa.getTime() > 0) {
                        if (dataFimDaTarefa.getTime() <= dataFimDoFiltro.getTime()) {
                            tarefasFiltradasPorPeriodo.push(t);
                        }
                    } else {
                        if (dataInicioDaTarefa.getTime() <= dataFimDoFiltro.getTime()) {
                            tarefasFiltradasPorPeriodo.push(t);
                        }
                    }
                }

                tarefasFiltradas = tarefasFiltradasPorPeriodo;
            }

            // Filtrar por número do processo
            if (this.filtros?.numeroProcesso) {
                const tarefasFiltradasPorNumero = [];
                const { numeroProcesso } = this.filtros;

                for (const tarefa of this.tarefas) {
                    const numero = tarefa.searchableId.split(' ')[1];
                    
                    if (+numeroProcesso === +numero) {
                        tarefasFiltradasPorNumero.push(tarefa);
                    }
                }

                tarefasFiltradas = tarefasFiltradasPorNumero;
            }

            // Filtrar por classe
            if (this.filtros?.classesSelecionadas && this.filtros.classesSelecionadas.length > 0) {
                const { classesSelecionadas } = this.filtros;
                const tarefasFiltradasPorClasse = [];

                for (const t of this.tarefas) {
                    const classe = t.searchableId.split(" ")[0];

                    if (classesSelecionadas.findIndex(c => c.nome === classe) !== -1) {
                        tarefasFiltradasPorClasse.push(t);
                    }
                }

                tarefasFiltradas = tarefasFiltradasPorClasse;
            }
        });

        console.log(tarefasFiltradas)
        console.log(tarefasFiltradas.length)

        this._carregarTarefas(tarefasFiltradas);
    }

    private _obterAsClassesDosProcessos(): void {
        for (const t of this.tarefas) {
            const nome: any = t.searchableId.split(" ")[0];

            if (isNaN(nome)) { // true caso contenha letras
                const index = this.classes.findIndex(c => c.nome === nome);
                
                if (index === -1) {
                    this.classes.push({ nome, total: 1 });
                } else {
                    const aux = this.classes[index];

                    this.classes.splice(index, 1);
                    this.classes.push({
                        nome: aux.nome, 
                        total: aux.total+1,
                    });
                }
            }
        }

        this.emitirClassesDosProcessos.emit(this.classes);
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
