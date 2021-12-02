import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { MinistroService } from 'app/modules/services/ministro.service';
import { ProcessoService } from 'app/modules/services/processo.service';
import { Observable } from 'rxjs';

interface FormRelatorData {
  idProcesso: number;
}

@Component({
  selector: 'app-form-relator',
  templateUrl: './form-relator.component.html',
  styleUrls: ['./form-relator.component.scss']
})
export class FormRelatorComponent implements OnInit {

  formRelator: FormGroup;
  ministros$: Observable<Ministro[]>;

  constructor(
    private _ministroService: MinistroService,
    private _processoService: ProcessoService,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<FormRelatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormRelatorData,
  ) { 
    this.formRelator = this._fb.group({
      id: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.ministros$ = this._ministroService.listarMinistros();
  }

  /**
   * @public Método público
   * @description Realiza a definição do relator do acórdão
   * @author Douglas da Silva Monteles
   */
  public publicar(): void {
    if (this.formRelator.valid) {
      this._processoService.definirRelatorDoProcesso(this.data.idProcesso, this.formRelator.value.id).subscribe({
        next: () => {
          this._dialogRef.close();
        }
      });
    }
  }

}
