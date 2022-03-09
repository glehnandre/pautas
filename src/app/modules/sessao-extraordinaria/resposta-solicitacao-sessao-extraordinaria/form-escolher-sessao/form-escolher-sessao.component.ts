import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessaoDeJulgamento } from 'app/shared/model/interfaces/sessao-julgamento.interface';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';


const moment = _rollupMoment || _moment;

const DATE_FORMATS = {
    parse: {
      dateInput: 'MM/YYYY',
    },
    display: {
      dateInput: 'MM/YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };

@Component({
  selector: 'digital-form-escolher-sessao',
  templateUrl: './form-escolher-sessao.component.html',
  styleUrls: ['./form-escolher-sessao.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
  ],
})
export class FormEscolherSessaoComponent implements OnInit {

  formJulgamento: FormGroup;
  sessoes: SessaoDeJulgamento[];

  constructor(
      private _fb: FormBuilder,
      private dialogRef: MatDialogRef<FormEscolherSessaoComponent>,
      @Inject(MAT_DIALOG_DATA) private data: {
          sessoes: SessaoDeJulgamento[],
      },
  ) {
        this.formJulgamento = this._fb.group({
            sessao: ['', Validators.required],
            colegiado: [''],
            modalidade: [''],
            data_inicio: ['', Validators.required],
            data_fim: ['', Validators.required],
        });
}

  ngOnInit(): void {
    this.sessoes = this.data.sessoes;
  }

  getDataInicio(): _moment.Moment {
    return this.formJulgamento.controls.nova_data.value;
  }

  setDataInicio(value: _moment.Moment): void {
    this.formJulgamento.controls.nova_data.setValue(value);
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.getDataInicio();
    ctrlValue.year(normalizedYear.year());
    this.setDataInicio(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.getDataInicio();
    ctrlValue.month(normalizedMonth.month());
    this.setDataInicio(ctrlValue);
    datepicker.close();
  }

  atualizarSessao(form: any): void {
      this.formJulgamento.setValue(form);
  }

  escolherSessao(): void {
    if (this.formJulgamento.valid) {
      console.log(this.formJulgamento.value);
    }
    this.dialogRef.close('Escolhido Sessão');
  }
}
