import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertaService } from 'app/modules/services/alerta.service';
import { TarefaService } from 'app/modules/services/tarefa.service';
import { DialogoConfirmacaoComponent } from 'app/shared/dialogo-confirmacao/dialogo-confirmacao.component';
import { ITask, SetNotesTaskCommand } from 'app/shared/model/interfaces/itask.interface';


interface FormComentarioData {
  tarefas: ITask[];
}

@Component({
  selector: 'app-form-comentario',
  templateUrl: './form-comentario.component.html',
  styleUrls: ['./form-comentario.component.scss']
})
export class FormComentarioComponent implements OnInit {

  formComentario: FormGroup;
  alerta: { titulo: string; mensagem: string; tipo: 'success' | 'warning' | 'error'; } = null;

  errorMessage: string;

  constructor(
    private _tarefaService: TarefaService,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<FormComentarioComponent>,
    private _alertaService: AlertaService,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: FormComentarioData,
  ) { 
    this.formComentario = this._fb.group({
      comentario: [data.tarefas[0].notes],
    });
  }

  ngOnInit(): void {
    
  }

  public salvar(): void {
    const cmd: SetNotesTaskCommand = {
      taskId: this.data.tarefas[0].id, 
      notes: this.formComentario.controls.comentario.value,
    };

    this._tarefaService.setNotes(cmd).subscribe({
      next: () => {
        this._setAlerta('Salvo!', 'O comentário foi salvo com sucesso!', 'success');

        this.formComentario.reset();
        this._dialogRef.close(this.alerta);
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.message
        this._alertaService.exibirAlerta("Error");
      }
    });
  }

  public excluir(): void {
    const dialogRef = this._dialog.open(DialogoConfirmacaoComponent, {
      data: {
        titulo: 'Excluir Comentário',
        mensagem: 'Deseja realmente excluir este comentário?',
      },
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        const cmd: SetNotesTaskCommand = {
          taskId: this.data.tarefas[0].id, 
          notes: null,
        };
    
        this._tarefaService.setNotes(cmd).subscribe({
          next: () => {
            this._setAlerta('Excluído!', 'O comentário foi excluído com sucesso!', 'success');
            this.formComentario.reset();
            this._dialogRef.close(this.alerta);
          },
          error: (error) => {
            console.log(error);
            this.errorMessage = error.message
            this._alertaService.exibirAlerta("Error");
          }
        });
      }
    }); 
  }

  private _setAlerta(titulo: string, mensagem: string, tipo: 'success' | 'warning' | 'error'): void {
    this.alerta = {
      titulo,
      mensagem,
      tipo,
    };
  }

}
