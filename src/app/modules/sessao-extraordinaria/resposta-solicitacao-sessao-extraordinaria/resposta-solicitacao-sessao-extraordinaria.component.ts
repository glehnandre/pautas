import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SessaoJulgamento } from '../../acervo/model/interfaces/sessao-julgamento.interface';
import { JulgamentoService } from '../../services/julgamento.service';
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
  sessao: SessaoJulgamento;
  sessoes: SessaoJulgamento[] = [];

  constructor(
    private _matDialog: MatDialog,
    private _julgamentoService: JulgamentoService,
    private _route: ActivatedRoute,
  ) {  }

  ngOnInit(): void {
    const { numero, ano } = this._route.snapshot.queryParams;
    this._julgamentoService.listarSessoesDeJulgamento(numero, ano).subscribe({
      next: (sessao) => {
        console.log(sessao)
        this.sessao = sessao;
      }
    });
    this._julgamentoService.listarTodasAsSessoesDeJulgamento().subscribe(data=>{
      this.sessoes = data;
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
