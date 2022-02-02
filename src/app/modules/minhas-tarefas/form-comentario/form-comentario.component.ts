import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask, SetNotesTaskCommand } from 'app/modules/acervo/model/interfaces/itask.interface';
import { TarefaService } from 'app/modules/services/tarefa.service';

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

  constructor(
    private _tarefaService: TarefaService,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<FormComentarioComponent>,
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
      next: (data) => {
        console.log(data);
        this.formComentario.reset();
        this._dialogRef.close();
      }
    });
  }

  public excluir(): void {
    const cmd: SetNotesTaskCommand = {
      taskId: this.data.tarefas[0].id, 
      notes: null,
    };

    this._tarefaService.setNotes(cmd).subscribe({
      next: (data) => {
        console.log(data);
        this.formComentario.reset();
        this._dialogRef.close();
      }
    });
  }

}
