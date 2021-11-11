import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ministro } from 'app/modules/acervo/model/interfaces/ministro.interface';
import { MinistroService } from 'app/modules/services/ministro.service';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Observable } from 'rxjs';

const moment = _rollupMoment || _moment;


@Component({
  selector: 'app-publicar-form',
  templateUrl: './publicar-form.component.html',
  styleUrls: ['./publicar-form.component.scss']
})

export class PublicarFormComponent implements OnInit {

  ministros: Observable<Ministro[]>;
  formPublicacao: FormGroup;
  date: FormControl = new FormControl(moment())
  ministrosPresentes: Set<Ministro> = new Set();
  ministrosAusentes: Set<Ministro> = new Set();

  opcoesDataPublicacao = [
      { value: 1, view: 'Publicar Automaticamente' },
      { value: 2, view: 'Publicar na Próxima Sessão' },
      { value: 3, view: 'Publicar em uma Data' }
    ]

  constructor(
    private _ministroService: MinistroService,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) {}

  ngOnInit(): void {
    this.formPublicacao = this._formBuilder.group({
      presenca: [[], Validators.required],
      presidente: ['', Validators.required],
      acessor: ['', Validators.required],
      opcaoData: ['', Validators.required],
      dataPublicacao: ['', Validators.nullValidator],
      data_inicio: ['', Validators.nullValidator],
      data_fim: ['', Validators.nullValidator],
    });
    this.ministros = this._ministroService.listarMinistros();
  }

  salvar(): void {
    const { presidente, acessor, opcaoData, data_inicio, data_fim } = this.formPublicacao.getRawValue();
    const form = {
      acessor,
      data_opcao: this.opcoesDataPublicacao[opcaoData-1].view,
      data_fim,
      data_inicio,
      ministrosAusentes: this.ministrosAusentes,
      ministrosPresentes: this.ministrosPresentes,
      presidente,
    }
    console.log(form);
  }
}
