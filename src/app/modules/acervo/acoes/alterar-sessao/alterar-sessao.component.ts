import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseAlertService } from '@fuse/components/alert';
import { JulgamentoService } from 'app/modules/services/julgamento.service';
import { Moment } from 'moment';
import { Processo } from '../../tabela/tabela.component';
import { Colegiado, Julgamento, Pauta } from '../pautar/pautar.component';
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
    pautas: [],
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

  constructor(
    private _julgamentoService: JulgamentoService,
    private _fuseAlertService: FuseAlertService,
    @Inject(MAT_DIALOG_DATA) public processos: Processo[], 
  ) {}

  ngOnInit(): void {
    const { id } = this.processos[0];

    this._julgamentoService.obterDadosDaPautaPeloProcesso(id).subscribe({
      next: (data) => {
        this.pauta = data;
        this.colegiadoEscolhido = this.pauta.colegiado;
      }
    });
  }

  isDataDeInicioValida(event: MatDatepickerInputEvent<Date>): void {
    const dataInicial = new Date(event.value);
    const dataFinal = new Date(this.pauta.data_fim);

    if (dataInicial > dataFinal) {
      alert('A data inicial não pode ser maior que a data final');
      this.pauta.data_inicio = '';
      this.isFormValido = false;
    } else {
      this.isFormValido = true;
    }
  }

  alterarDataDeJulgamento(): void {
    console.log(this.pauta);
    this._julgamentoService.pautarProcesso(this.pauta).subscribe({
        next: () => {
            this._fuseAlertService.show('sucesso');
            setTimeout(() => {
                this._fuseAlertService.dismiss('sucesso');
            }, 5000);
        }   
    });
  }

}
