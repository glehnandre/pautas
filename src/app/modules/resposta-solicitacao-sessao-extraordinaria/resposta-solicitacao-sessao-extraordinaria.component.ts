import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { SessaoJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';
import { JulgamentoService } from '../services/julgamento.service';

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
  selector: 'app-resposta-solicitacao-sessao-extraordinaria',
  templateUrl: './resposta-solicitacao-sessao-extraordinaria.component.html',
  styleUrls: ['./resposta-solicitacao-sessao-extraordinaria.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
  ],
})
export class RespostaSolicitacaoSessaoExtraordinariaoComponent implements OnInit {

  formJulgamento: FormGroup;
  panelOpenState: boolean = false;
  tags: string[] = ['Virtual', 'Segunda Turma'];
  sessao: SessaoJulgamento;
  sessoes: SessaoJulgamento[] = [];

  constructor(
    private _fb: FormBuilder,
    private _julgamentoService: JulgamentoService,
  ) {
    this.formJulgamento = this._fb.group({
      nova_data: [moment(), Validators.required],
      sessao: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._julgamentoService.listarSessoesDeJulgamento(1000, 2021).subscribe({
      next: (sessao) => {
        console.log(sessao)
        this.sessao = sessao;
      }
    });
    this._julgamentoService.listarTodasAsSessoesDeJulgamento().subscribe(data=>{
      this.sessoes = data;
    })
  }

  public pautarNaSessao(): void {
    if (this.formJulgamento.valid) {
      console.log(this.formJulgamento.value);
    }
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

  getDataInicio(): _moment.Moment {
    return this.formJulgamento.controls.nova_data.value;
  }

  setDataInicio(value: _moment.Moment): void {
    this.formJulgamento.controls.nova_data.setValue(value);
  }

}
