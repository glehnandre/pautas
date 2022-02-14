import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertaService } from 'app/modules/services/alerta.service';
import { TarefaService } from 'app/modules/services/tarefa.service';
import { ITask, ITaskTag } from 'app/shared/model/interfaces/itask.interface';


@Component({
    selector: 'app-filtros',
    templateUrl: './filtros.component.html',
    styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit {

    formFiltro: FormGroup;
    
    tags: ITaskTag[] = [];
    tiposDasTags: string[] = [];
    panelOpenState = false;

    errorMessage: string;

    @Input() tarefas: ITask[] = [];

    constructor(
        private _tarefaService: TarefaService,
        private _fb: FormBuilder,
        private _router: Router,
        private _alertaService: AlertaService,
    ) {
        this.formFiltro = this._fb.group({
            data_inicio: [null],
            data_fim: [null],
            numeroProcesso: [null],
            tags: [null],
        });
    }

    ngOnInit(): void {
        this._tarefaService.obterTags().subscribe({
            next: (tags) => {
                this.tags = tags;
                this._obterTiposDasTags();
            },
            error: (error) => {
              console.log(error);
              this.errorMessage = error.message
              this._alertaService.exibirAlerta("Error");
            }
        });
    }

    public limparDatasDoPeriodo(): void {
        this.formFiltro.controls.data_inicio.setValue(null);
        this.formFiltro.controls.data_fim.setValue(null);
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

    public obterNomeDasTagsSelecionadasPeloTipo(tipo: string): string[] {
        let tags: string[] = [];

        if (this.formFiltro.controls.tags.value) {
            tags = (this.formFiltro.controls.tags.value as ITaskTag[])
                .filter(tag => tag.type === tipo)
                .map(tag => tag.name);
        }

        return tags;
    }

    public limparFiltros(): void {
        this.formFiltro.reset();
        this._router.navigate([], {
            queryParams: null,
        });
    }

    public filtrar(): void {
        const queryParams = {};

        for (const key of Object.keys(this.formFiltro.value)) {
            if (this.formFiltro.value[key]) {
                if (key !== 'tags') {
                    queryParams[key] = this.formFiltro.value[key];
                } else {
                    for (const tag of (this.formFiltro.value[key] as ITaskTag[])) {
                        const tasks = [];
                        
                        for (const t of (this.formFiltro.value[key] as ITaskTag[])) {
                            if (t.type === tag.type) {
                                tasks.push(t.tasks.toString());
                            }
                        }
    
                        queryParams[tag.type.toLowerCase()] = tasks.toString();
                    }
                }
            }
        }

        this._router.navigate([], {
            queryParams,
        });
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
