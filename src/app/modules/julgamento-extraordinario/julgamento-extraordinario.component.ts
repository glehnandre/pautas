import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { SituacaoDoProcesso } from '../acervo/model/enums/situacaoDoProcesso.enum';
import { Processo } from '../acervo/model/interfaces/processo.interface';
import { SessaoDeJulgamento } from '../acervo/model/interfaces/sessaoDeJulgamento.interface';
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
  selector: 'app-julgamento-extraordinario',
  templateUrl: './julgamento-extraordinario.component.html',
  styleUrls: ['./julgamento-extraordinario.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ],
})
export class JulgamentoExtraordinarioComponent implements OnInit {

  formJulgamento: FormGroup;
  panelOpenState: boolean = false;
  tags: string[] = ['Virtual', 'Segunda Turma'];
  sessao: SessaoDeJulgamento;
  processos: Processo[] = [];
  colegiado_ = {
    nome: "Primeira Turma",
    presidente: {
      id: 1,
      nome: "Dias Toffoli",
      abreviacao: "MDT",
      cadeira: "9"
    },
    composicao: [{
      ministro: {
        id: 1,
        nome: "Dias Toffoli",
        abreviacao: "MDT",
        cadeira: "9"
      },
      pode_votar: true,
      votou: false
    }],
    data: "string",
  }
  sessoes: SessaoDeJulgamento[] = [
    { id: 1, ano: 2021, numero: 1, colegiado: this.colegiado_, modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z', situacao: "Apto a julgar" },
    { id: 2, ano: 2021, numero: 2, colegiado: this.colegiado_, modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z', situacao: "Apto a julgar" },
    { id: 3, ano: 2021, numero: 3, colegiado: this.colegiado_, modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z', situacao: "Apto a julgar" },
    { id: 4, ano: 2021, numero: 4, colegiado: this.colegiado_, modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z', situacao: "Apto a julgar" },
    { id: 5, ano: 2021, numero: 5, colegiado: this.colegiado_, modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z', situacao: "Apto a julgar" },
    { id: 6, ano: 2021, numero: 6, colegiado: this.colegiado_, modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z', situacao: "Apto a julgar" },
    { id: 7, ano: 2021, numero: 7, colegiado: this.colegiado_, modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z', situacao: "Apto a julgar" },
    { id: 8, ano: 2021, numero: 8, colegiado: this.colegiado_, modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z', situacao: "Apto a julgar" },
    { id: 9, ano: 2021, numero: 9, colegiado: this.colegiado_, modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z', situacao: "Apto a julgar" },
    { id: 10, ano: 2021, numero: 10, colegiado: this.colegiado_, modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2016-08-29T09:12:33.001Z', data_fim: '2016-08-29T09:12:33.001Z', situacao: "Apto a julgar" }
  ];

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
      next: (julg) => {
        this.sessao = julg.sessao;
        const { numero, ano, data_inicio, data_fim } = this.sessao;
        this._julgamentoService.listarProcessosPautadosNasSessoes(numero, ano, SituacaoDoProcesso.Pautado, data_inicio, data_fim).subscribe({
          next: (processos) => {
            this.processos = processos;
          }
        });
      }
    });
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
