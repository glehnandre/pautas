import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'app/modules/acervo/model/interfaces/tarefa.interface';
import { TarefaService } from 'app/modules/services/tarefa.service';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
    selector: 'app-tabela',
    templateUrl: './tabela.component.html',
    styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {

    displayedColumns: string[] = ['checkbox', 'descricao', 'responsavel', 'data_criacao', 'opcoes'];
    dataSource = new TarefasDataSource([]);

    tarefas: any[] = [];

    constructor(
        private _tarefaService: TarefaService,
    ) { }

    ngOnInit(): void {
        this._tarefaService.obterTaferas().subscribe({
            next: (tarefas) => {
                this.tarefas = tarefas;
                this.dataSource.setData(this.tarefas);
                console.log(this.tarefas);
            }
        });
    }

}

class TarefasDataSource extends DataSource<Tarefa> {
    private _dataStream = new ReplaySubject<Tarefa[]>();

    constructor(initialData: Tarefa[]) {
        super();
        this.setData(initialData);
    }

    connect(): Observable<Tarefa[]> {
        return this._dataStream;
    }

    disconnect() { }

    setData(data: Tarefa[]) {
        this._dataStream.next(data);
    }
}
