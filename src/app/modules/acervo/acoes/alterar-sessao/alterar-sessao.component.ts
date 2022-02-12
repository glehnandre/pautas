import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseAlertService } from '@fuse/components/alert';
import { AlertaService } from 'app/modules/services/alerta.service';
import { SessaoDeJulgamentoService } from 'app/modules/services/sessao-de-julgamento.service';
import { Pauta } from 'app/shared/model/interfaces/pauta.interface';
import { Processo } from 'app/shared/model/interfaces/processo.interface';
import { Colegiado } from '../pautar/pautar.component';
import { SessaoJulgamento } from '../pautar/sessaoJulgamento';

@Component({
  selector: 'app-alterar-sessao',
  templateUrl: './alterar-sessao.component.html',
  styleUrls: ['./alterar-sessao.component.scss']
})
export class AlterarSessaoComponent implements OnInit {

  pauta: Pauta = {
    assunto: '',
    colegiado: '',
    data_inicio: '',
    data_fim: '',
    sessao: 0,
    processos: [],
  };

  colegiados: Colegiado[] = [
    { value: 'primeira-turma', viewValue: 'Primeira Turma' },
    { value: 'segunda-turma', viewValue: 'Segunda Turma' },
    { value: 'colegiado-pleno', viewValue: 'Pleno' },
  ];

  //Deve recuperar o valor da Sessoes de Julgamento Integralmente para aquele ano por meio de serviço
  sessoes: SessaoJulgamento[] = [
      {id: 1, ano: 2021, numero: 1, colegiado: 'Primeira Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 7, 1), data_fim: new Date(2021, 7, 5)},
      {id: 2, ano: 2021, numero: 2, colegiado: 'Primeira Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 7, 6), data_fim: new Date(2021, 7, 11)},
      {id: 3, ano: 2021, numero: 3, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 7, 13), data_fim: new Date(2021, 7, 18)},
      {id: 4, ano: 2021, numero: 4, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 7, 20), data_fim: new Date(2021, 7, 25)},
      {id: 5, ano: 2021, numero: 5, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 7, 27), data_fim: new Date(2021, 8, 3)},
      {id: 6, ano: 2021, numero: 6, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 8, 5), data_fim: new Date(2021, 8, 10)},
      {id: 7, ano: 2021, numero: 7, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 8, 12), data_fim: new Date(2021, 8, 17)},
      {id: 8, ano: 2021, numero: 8, colegiado: 'Pleno', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 8, 12), data_fim: new Date(2021, 8, 17)},
      {id: 9, ano: 2021, numero: 9, colegiado: 'Pleno', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 8, 12), data_fim: new Date(2021, 8, 17)},
      {id: 10, ano: 2021, numero: 10, colegiado: 'Pleno', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 8, 20), data_fim: new Date(2021, 8, 25)}
  ];

  colegiadoEscolhido: string = this.colegiados[0].value;
  isFormValido: boolean = true;

  errorMessage: string;

  constructor(
    private _sessaoDeJulgamentoService: SessaoDeJulgamentoService,
    private _fuseAlertService: FuseAlertService,
    private _alertaService: AlertaService,
    @Inject(MAT_DIALOG_DATA) public processos: Processo[],
  ) {}

  ngOnInit(): void {
    const { id } = this.processos[0];

    this._sessaoDeJulgamentoService.obterDadosDaPautaPeloProcesso(id).subscribe({
      next: (data) => {
        this.pauta = data;
        this.colegiadoEscolhido = this.pauta.colegiado;
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.message;
        this._alertaService.exibirAlerta("Error");
      }
    });
  }

  isDataDeInicioValida(event: MatDatepickerInputEvent<Date>): void {
    const dataInicial = new Date(event.value);
    const dataFinal = new Date(this.pauta.data_fim);

    if (dataInicial > dataFinal) {
        this._fuseAlertService.show('alertBoxInitialDate');

        setTimeout(() => {
            this._fuseAlertService.dismiss('alertBoxInitialDate');
        }, 5000);

      this.pauta.data_inicio = '';
      this.isFormValido = false;
    } else {
      this.isFormValido = true;
    }
  }

  isDataDeFimValida(event: MatDatepickerInputEvent<Date>): void {
      const dataInicial = new Date(this.pauta.data_inicio);
      const dataFinal = new Date(event.value);

      if (dataFinal < dataInicial) {
         this._fuseAlertService.show('alertBoxFinalDate');

         setTimeout(() => {
           this._fuseAlertService.dismiss('alertBoxFinalDate');
         }, 5000);

          this.pauta.data_fim = '';
          this.isFormValido = false;
      } else {
          this.isFormValido = true;
      }
  }

  alterarDataDeJulgamento(): void {
    this._sessaoDeJulgamentoService.pautarProcesso(this.pauta).subscribe({
        next: () => {
            this._alertaService.exibirAlertaDeSucesso();
        },
        error: (error) => {
          console.log(error);
          this.errorMessage = error.message;
          this._alertaService.exibirAlerta("Error");
        }
    });
  }

}
