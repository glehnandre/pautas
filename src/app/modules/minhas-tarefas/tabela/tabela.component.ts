import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ITask } from 'app/modules/acervo/model/interfaces/itask';
import { TarefaService } from 'app/modules/services/tarefa.service';

@Component({
    selector: 'app-tabela',
    templateUrl: './tabela.component.html',
    styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit, OnDestroy {

    tarefas: any[] = [];

    displayedColumns: string[] = ['checkbox', 'descricao', 'responsavel', 'data_criacao', 'opcoes'];
    dataSource = new MatTableDataSource<ITask>([]);
    selection = new SelectionModel<ITask>(true, []);

    constructor(
        private _tarefaService: TarefaService,
    ) { }

    ngOnInit(): void {
        this._tarefaService.obterTaferas().subscribe({
            next: (tarefas) => {
                this.tarefas = tarefas;
                this.dataSource = new MatTableDataSource<ITask>(this.tarefas);
                console.log(this.tarefas);
            }
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

}
