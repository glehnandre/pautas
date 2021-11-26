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
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/ja';
import 'moment/locale/fr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface FormVistaEDestaqueData {
  titulo: string;
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

  constructor(
    private _fb: FormBuilder,
    private _ministroService: MinistroService,
    public dialogRef: MatDialogRef<FormVistaEDestaqueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormVistaEDestaqueData,
  ) { 
    this.formVistaEDestaque = this._fb.group({
      data:       ['',        Validators.required],
      ministro:   [null,      Validators.required],
      texto:      ['',        Validators.required],
    });
  }

  ngOnInit(): void {
    this.ministros$ = this._ministroService.listarMinistros();
  }

  public fecharModalEEmcaminharVistaOuDestaque(): void {
    if (this.formVistaEDestaque.valid) {
      this.dialogRef.close(this.formVistaEDestaque.value);
    }
  }

}
