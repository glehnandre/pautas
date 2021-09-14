import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResultadoJulgamentoService } from '../services/resultado-julgamento.service';

@Component({
  selector: 'app-resultado-julgamento',
  templateUrl: './resultado-julgamento.component.html',
  styleUrls: ['./resultado-julgamento.component.scss']
})
export class ResultadoJulgamentoComponent implements OnInit, OnDestroy {

  data_inicio: string = '2021-09-14T03:00:00.000Z';
  data_fim: string = '2021-09-16T03:00:00.000Z';
  cont: string = '';
  idCronometro: any;

  constructor(
    private resultadoJulgamento: ResultadoJulgamentoService,
  ) { }

  ngOnInit(): void {
    this.resultadoJulgamento.listarDecisoes().subscribe({
      next: (data) => {
        console.log(data)
      }
    });
    this.cronometro();
  }

  ngOnDestroy(): void {
    clearInterval(this.idCronometro);
  }

  cronometro() {
    let data = this.data_fim;
    let falta = (new Date(data).getTime() - new Date().getTime()) / 1000;
    let segundos = Math.round(falta % 60);
    let minutos = Math.round(falta / 60 % 60);
    let horas = Math.round(falta / 60 / 60 % 24);
    let dias = Math.round(falta / 60 / 60 / 24);

    if (falta <= 0) {
      this.cont = `${0} dias - ${0} horas - ${0} minustos - ${0} segundos`;
      return;
    }

    this.idCronometro = setInterval(() => {
        if (segundos == 0) {
            segundos = 60;
            minutos--;
        }
        if (minutos == 0) {
            minutos = 60;
            horas--;
        }
        if (horas == 0) {
            horas = 24;
            dias--;
        }
        segundos--;
        this.cont = `${dias} dias - ${horas} horas - ${minutos} minustos - ${segundos} segundos`;
      }, 1000);
  }

}
