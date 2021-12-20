import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { MinistroService } from 'app/modules/services/ministro.service';
import { Observable } from 'rxjs';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoRecursoDto } from 'app/modules/acervo/model/interfaces/tipoRecursoDto';
import { RecursoService } from 'app/modules/services/recurso.service';
import { Destaque, Vista } from 'app/modules/acervo/model/interfaces/vista-e-destaque.interface';

interface FormVistaEDestaqueData {
  titulo: string;
  dados: any;
}

@Component({
  selector: 'app-form-vista-e-destaque',
  templateUrl: './form-vista-e-destaque.component.html',
  styleUrls: ['./form-vista-e-destaque.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class FormVistaEDestaqueComponent implements OnInit {

  formVistaEDestaque: FormGroup;
  ministros$: Observable<Ministro[]>;
  recursos$: Observable<TipoRecursoDto[]>;

  constructor(
    private _fb: FormBuilder,
    private _ministroService: MinistroService,
    private _recursoService: RecursoService,
    public dialogRef: MatDialogRef<FormVistaEDestaqueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormVistaEDestaqueData,
  ) { 
    if (this.data.dados) {
      const { data, ministro, texto } = this.data.dados;

      this.formVistaEDestaque = this._fb.group({
        data:       [data,            Validators.required],
        ministro:   [ministro.id,      Validators.required],
        texto:      [texto,           Validators.required],
      });
    } else {
      this.formVistaEDestaque = this._fb.group({
        data:       [null,      Validators.required],
        ministro:   [null,      Validators.required],
        texto:      ['',        Validators.required],
      });
    }
  }

  ngOnInit(): void {
    this.ministros$ = this._ministroService.listarMinistros();
    this.recursos$ = this._recursoService.obterListaDeRecursos();
  }

  public fecharModalEEmcaminharVistaOuDestaque(): void {
    if (this.formVistaEDestaque.valid) {
      this.dialogRef.close(this.formVistaEDestaque.value);
    }
  }

}
