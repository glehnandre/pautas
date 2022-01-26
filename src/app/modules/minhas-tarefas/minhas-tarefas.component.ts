import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ITask } from '../acervo/model/interfaces/itask.interface';

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

    constructor(
        private _sanitizer: DomSanitizer,
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

}
