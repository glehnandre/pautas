import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITask } from '../acervo/model/interfaces/itask.interface';
import { FormComentarioComponent } from './form-comentario/form-comentario.component';

@Component({
    selector: 'app-minhas-tarefas',
    templateUrl: './minhas-tarefas.component.html',
    styleUrls: ['./minhas-tarefas.component.scss']
})
export class MinhasTarefasComponent implements OnInit {

    panelOpenState: boolean = false;
    tarefas: ITask[] = [];
    tarefasSelecionadas: ITask[] = [];

    constructor(
        private _dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        
    }

    @HostListener("window:resize")
    public isTelaPequena(): boolean {
        return window.screen.width < 600;
    }

    public obterTarefasSelecionadas(tarefas: ITask[]) {
        this.tarefasSelecionadas = tarefas;
    }

    public abrirModalDeIncluirComentario(): void {
        if (!this._isTarefasSelecionadasVazia()) {
            const dialogRef = this._dialog.open(FormComentarioComponent, {
                data: {
                    tarefas: [...this.tarefasSelecionadas],
                }
            });
        }
    }

    private _isTarefasSelecionadasVazia(): boolean {
        return this.tarefasSelecionadas.length === 0;
    }

}
