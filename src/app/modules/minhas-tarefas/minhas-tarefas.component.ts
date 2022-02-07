import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseAlertService } from '@fuse/components/alert';
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
    alerta: { titulo: string; mensagem: string } = null;
    timeout = null;

    readonly NOME_DO_ALERTA = 'minhas-tarefas-alert';

    constructor(
        private _dialog: MatDialog,
        private _fuseAlertService: FuseAlertService,
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
        if (!this._isTarefasSelecionadasVazia() && !this._isLimiteDeSelecaoAtingido(1)) {
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

    private _isLimiteDeSelecaoAtingido(limite?: number) {
        if (limite) {
            if (this.tarefasSelecionadas.length > limite) {   
                this.alerta = {
                    titulo: 'Limite atingido',
                    mensagem: `Para executar essa funcionalidade, selecione no máximo ${limite} tarefa(as).`,
                };
                
                this._exibirAlerta();
                return true;
            }

            return false;
        }
        return false;
    }

    private _exibirAlerta(): void {
        this._fuseAlertService.show(this.NOME_DO_ALERTA);

        clearTimeout(this.timeout);
    
        this.timeout = setTimeout(() => {
            this._fuseAlertService.dismiss(this.NOME_DO_ALERTA);
            this.alerta = null;
        }, 6000);
    }

}
