import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ITask } from '../acervo/model/interfaces/itask.interface';
import { FormComentarioComponent } from './form-comentario/form-comentario.component';

@Component({
    selector: 'app-minhas-tarefas',
    templateUrl: './minhas-tarefas.component.html',
    styleUrls: ['./minhas-tarefas.component.scss']
})
export class MinhasTarefasComponent implements OnInit {

    url: SafeResourceUrl = '';
    urlSelecionada: boolean = false;

    panelOpenState: boolean = false;
    filtrosSelecionados: any;
    tarefas: ITask[] = [];
    tarefasSelecionadas: ITask[] = [];

    constructor(
        private _sanitizer: DomSanitizer,
        private _dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.url = this._sanitizer.bypassSecurityTrustResourceUrl('');
    }

    mostrarPagina(): void {
        this.urlSelecionada = true;
        this.url = this._sanitizer.bypassSecurityTrustResourceUrl('http://localhost:4200/criacao-colegiado?processo=ADI100-Ag-Ag-Ag&data=2016-08-29T09%253A12%253A33.001Z&colegiado=pleno&sessao=1000-2021');
    }

    mostrarOutraPagina(): void {
        this.urlSelecionada = true;
        this.url = this._sanitizer.bypassSecurityTrustResourceUrl('/acervo');
    }

    public obterFiltrosSelecionados(filtros: any): void {
        this.filtrosSelecionados = filtros;
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
            const dialogRef = this._dialog.open(FormComentarioComponent, {});
        }
    }

    private _isTarefasSelecionadasVazia(): boolean {
        return this.tarefasSelecionadas.length === 0;
    }

}
