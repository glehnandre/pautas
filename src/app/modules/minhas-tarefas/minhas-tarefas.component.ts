import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITask } from '../acervo/model/interfaces/itask.interface';
import { AlertaService } from '../services/alerta.service';
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
    alerta: { titulo: string; mensagem: string, tipo: 'warning' | 'success' | 'error'; } = null;
    timeoutId: any = null;

    readonly NOME_DO_ALERTA = 'minhas-tarefas-alert';

    constructor(
        private _dialog: MatDialog,
        private _alertaService: AlertaService,
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

            dialogRef.afterClosed().subscribe(data => {
                if (data) {
                    this.alerta = data;
                    this._alertaService.exibirAlerta(this.NOME_DO_ALERTA);
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
                    tipo: 'warning',
                };
                
                this._alertaService.exibirAlerta(this.NOME_DO_ALERTA);
                return true;
            }

            return false;
        }
        return false;
    }

}
