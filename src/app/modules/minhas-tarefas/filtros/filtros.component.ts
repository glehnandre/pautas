import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ITaskTag } from 'app/modules/acervo/model/interfaces/itask.interface';
import { TarefaService } from 'app/modules/services/tarefa.service';

@Component({
    selector: 'app-filtros',
    templateUrl: './filtros.component.html',
    styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit {

    panelOpenState = false;
    
    tags: ITaskTag[] = [];
    tags2: ITaskTag[] = [];
    tags3: ITaskTag[] = [];
    filtrosSelecionados: ITaskTag[] = [];
    tipos: string[] = [];

    formFiltro: FormGroup;

    @Input() classes: Array<{nome:string, total:number}> = [];
    @Output() emitirFiltrosSelecionados = new EventEmitter<any>();

    constructor(
        private _tarefaService: TarefaService,
        private _fb: FormBuilder,
    ) { 
        this.formFiltro = this._fb.group({
            data_inicio: [new Date()],
            data_fim: [new Date()],
            numeroProcesso: [null],
            classesSelecionadas: [[]],
        });
    }

    ngOnInit(): void {
        this._tarefaService.obterListaDeFiltrosTags2().subscribe({
            next: (tags2) => {
                this.tags2 = tags2;

                this._tarefaService.obterListaDeFiltrosTags3().subscribe({
                    next: (tags3) => {
                        this.tags3 = tags3;
                        this.tags = [...new Set([...this.tags2, ...this.tags3])];

                        this._obterOsTiposDasTarefas();
                    }
                });
            }
        });
    }

    public marcarOuDesmarcarFiltro(tag: ITaskTag): void {
        const index = this.filtrosSelecionados
            .findIndex(filtro => filtro.id === tag.id);
        
        if (index === -1) { // Essa tag ainda não foi selecionada
            this.filtrosSelecionados.push(tag);
        } else { // Essa tag já estar selecionada
            this.filtrosSelecionados.splice(index, 1);
        }

        console.log(this.filtrosSelecionados)
        // this.emitirFiltrosSelecionados.emit(this.filtrosSelecionados);
    }

    public limparDatasDoPeriodo(): void {
        this.formFiltro.controls.data_inicio.setValue(null);
        this.formFiltro.controls.data_fim.setValue(null);
    }

    public selecionarOuDeselecionarClasse(classe: {nome:string, total:number}): void {
        const classes = this.formFiltro.controls.classesSelecionadas.value;
        const index = classes.findIndex(c => c.nome === classe.nome);

        if (index === -1) {
            classes.push(classe);
        } else {
            classes.splice(index, 1);
        }

        this.formFiltro.controls.classesSelecionadas.setValue(classes);
    }

    public limparFiltros(): void {
        this.formFiltro.reset();
        this.emitirFiltrosSelecionados.emit(null);
    }

    public filtrar(): void {
        this.emitirFiltrosSelecionados.emit(this.formFiltro.value);
    }

    private _obterOsTiposDasTarefas(): void {
        this.tipos = [];

        this.tags.forEach(tag => {
            if (!this.tipos.includes(tag.type)) {
                this.tipos.push(tag.type);
            }
        });
    }

}
