import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { default as _rollupMoment } from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';import * as _moment from 'moment';
import { Observable } from 'rxjs';

import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { MinistroService } from 'app/modules/services/ministro.service';
import { SessaoJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface';

const moment = _rollupMoment || _moment;

const DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-publicar-form',
  templateUrl: './publicar-form.component.html',
  styleUrls: ['./publicar-form.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
  ],
})

export class PublicarFormComponent implements OnInit {

  ministros: Observable<Ministro[]>;
  formPublicacao: FormGroup;
  date: FormControl = new FormControl(moment())
  ministrosPresentes: Set<Ministro> = new Set();
  ministrosAusentes: Set<Ministro> = new Set();

  opcoesDataPublicacao = [
      { value: 0, view: 'Publicar Automaticamente' },
      { value: 1, view: 'Publicar na Próxima Sessão' },
      { value: 2, view: 'Publicar em uma Data' }
    ]

  constructor(
    private _ministroService: MinistroService,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<PublicarFormComponent>,
    @Inject(MAT_DIALOG_DATA) private sessao: SessaoJulgamento,
  ) {}

  ngOnInit(): void {
    this.formPublicacao = this._formBuilder.group({
      opcaoData: ['', Validators.required],
      dataPublicacao: ['', Validators.required],
    });
    this.ministros = this._ministroService.listarMinistros();
  }

  dataAutomatica(value: number): void {
    if(value != this.opcoesDataPublicacao[2].value)
      this.formPublicacao.controls.dataPublicacao.setValue(new Date(this.sessao.data_fim));
    else
      this.formPublicacao.controls.dataPublicacao.reset();
  }

  /**
   * Pega os dados do formulário e retorna para página Revisar Publicação
   */
  salvar(): void {
    const { opcaoData, dataPublicacao } = this.formPublicacao.getRawValue();
    const form = {
      dataPublicacao,
    }
    console.log('Ata Publicada:')
    console.log(this.opcoesDataPublicacao[opcaoData]);

    this._dialogRef.close(form);
  }
}
