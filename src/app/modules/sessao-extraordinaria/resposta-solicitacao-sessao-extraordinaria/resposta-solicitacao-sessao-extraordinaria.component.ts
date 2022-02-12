import { Component, OnInit } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlertaService } from 'app/modules/services/alerta.service';
import { SessaoDeJulgamento } from 'app/shared/model/interfaces/sessao-julgamento.interface';
import { SessaoDeJulgamentoService } from '../../services/sessao-de-julgamento.service';
import { FormEscolherSessaoComponent } from './form-escolher-sessao/form-escolher-sessao.component';


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

  panelOpenState: boolean = false;
  tags: string[] = ['Virtual', 'Segunda Turma'];
  sessao: SessaoDeJulgamento;
  sessoes: SessaoDeJulgamento[] = [];

  errorMessage: string;

  constructor(
    private _matDialog: MatDialog,
    private _julgamentoService: SessaoDeJulgamentoService,
    private _route: ActivatedRoute,
    private _alertaService: AlertaService
  ) {  }

  ngOnInit(): void {
    const { numero, ano } = this._route.snapshot.queryParams;
    this._julgamentoService.listarSessoesDeJulgamento(numero, ano).subscribe({
      next: (sessao) => {
        console.log(sessao)
        this.sessao = sessao;
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.message
        this._alertaService.exibirAlerta("Error");
      }
    });
    this._julgamentoService.listarTodasAsSessoesDeJulgamento().subscribe({
      next: (data) => {
      this.sessoes = data;
    },
    error: (error) => {
      console.log(error);
      this.errorMessage = error.message;
      this._alertaService.exibirAlerta("Error");
    }
    })
  }

  public modalEscolherSessao(): void {
    const dialogRef = this._matDialog.open(FormEscolherSessaoComponent, {
        data: {
            sessoes: this.sessoes
        },
        width: '580px'
    });
    dialogRef.afterClosed().subscribe(result => {
        console.log(result);
    });
  }
}
