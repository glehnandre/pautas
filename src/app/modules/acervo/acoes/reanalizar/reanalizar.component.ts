import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertaService } from 'app/modules/services/alerta.service';
import { ProcessoService } from 'app/modules/services/processo.service';
import { Processo } from '../../model/interfaces/processo.interface';

@Component({
  selector: 'app-reanalizar',
  templateUrl: './reanalizar.component.html',
  styleUrls: ['./reanalizar.component.scss']
})
export class ReanalizarComponent implements OnInit {

  reanalizeForm: FormGroup;
  descricoes: string;

  errorMessage: string;

  constructor(
    private _fb: FormBuilder,
    private _processoService: ProcessoService,
    private _dialogRef: MatDialogRef<ReanalizarComponent>,
    private _alertaService: AlertaService,
    @Inject(MAT_DIALOG_DATA) private _processos: Processo[],
  ) {
    this.reanalizeForm = this._fb.group({
      descricao: [''],
    });
  }

  ngOnInit(): void {
    this.descricoes = this._processoService
      .exibeDescricaoDosProcessos(this._processos);
  }

  public reanalizar(): void {
    this._processos.forEach(({id}) => {
      this._processoService.reanalizarProcesso(id, {...this.reanalizeForm.value, data: new Date().toISOString()})
        .subscribe({
          next: () => {},
          error: (error) => {
            console.log(error);
            this.errorMessage = error.message
            this._alertaService.exibirAlerta("Error");
          }
        });
    });

    this._dialogRef.close('ok');
  }

}
