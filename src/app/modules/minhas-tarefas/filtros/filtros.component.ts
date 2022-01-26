import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ITask, ITaskTag } from 'app/modules/acervo/model/interfaces/itask.interface';
import { TarefaService } from 'app/modules/services/tarefa.service';

@Component({
    selector: 'app-filtros',
    templateUrl: './filtros.component.html',
    styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit, OnChanges {

    panelOpenState = false;
    
    tags: ITaskTag[] = [];
    tiposDasTags: string[] = [];
    filtrosSelecionados: ITaskTag[] = [];

    formFiltro: FormGroup;

    @Input() tarefas: ITask[] = [];
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
            tags: [[]],
        });
    }

    ngOnInit(): void {
        this._tarefaService.obterTags().subscribe({
            next: (tags) => {
                this.tags = tags;
                this._obterTiposDasTags();
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes.tarefas.currentValue);
    }

    public limparDatasDoPeriodo(): void {
        this.formFiltro.controls.data_inicio.setValue(null);
        this.formFiltro.controls.data_fim.setValue(null);
    }

    public selecionarOuDeselecionarClasse(classe: {nome:string, total:number}): void {
        const classes = this.formFiltro.controls.classesSelecionadas.value ?? [];
        const index = classes.findIndex(c => c.nome === classe.nome);

        if (index === -1) {
            classes.push(classe);
        } else {
            classes.splice(index, 1);
        }

        this.formFiltro.controls.classesSelecionadas.setValue(classes);
    }

    public selecionarOuDeselecionarFiltro(tag: ITaskTag) {
        const tags = this.formFiltro.controls.tags.value ?? [];
        const index = tags.findIndex(t => t.id === tag.id);

        if (index === -1) {
            tags.push(tag);
        } else {
            tags.splice(index, 1);
        }

        this.formFiltro.controls.tags.setValue(tags);
    }

    public contarTarefasComEsseFiltro(tag: ITaskTag): number {
        let cont: number = 0;

        for (const t of this.tarefas) {
            if (t.etags && t.etags.length > 0 && tag.tasks && tag.tasks.length > 0) {
                for (const task of tag.tasks) {
                    if (t.etags.includes(task)) {
                        cont++;
                    }
                }
            }
        }

        return cont;
    }
    
    public limparFiltros(): void {
        this.formFiltro.reset();
        this.emitirFiltrosSelecionados.emit(null);
    }
    
    public filtrar(): void {
        this.emitirFiltrosSelecionados.emit(this.formFiltro.value);
    }
    
    private _obterTiposDasTags(): void {
        const tipos = [];
    
        for (const tag of this.tags) {
            if (!tipos.includes(tag.type)) {
                tipos.push(tag.type);
            }
        }
    
        this.tiposDasTags = tipos;
    }
}
