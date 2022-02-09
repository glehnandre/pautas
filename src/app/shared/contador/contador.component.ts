import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SessaoDeJulgamento } from 'app/modules/acervo/model/interfaces/sessao-julgamento.interface';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.scss']
})
export class ContadorComponent implements OnInit, OnDestroy {
  @Input() sessao: SessaoDeJulgamento;

  dias: string = '00';
  horas: string = '00';
  minutos: string = '00';
  segundos: string = '00';

  comecou: boolean = false;

  timer: ReturnType<typeof setInterval>;

  constructor() { }

  ngOnInit(): void {
    this.timer = setInterval(() => {
        this.atualizaTempo();
    }, 500);
  }

  ngOnDestroy(): void {
      if (this.timer) {
        clearInterval(this.timer);
      }
  }

  recuperaDiaDaSemana(numeroDiaDaSemana: number): string {
    switch(numeroDiaDaSemana) {
      case 0:
        return 'Domingo';
      case 1:
        return 'Segunda';
      case 2:
        return 'Terça';
      case 3:
        return 'Quarta';
      case 4:
        return 'Quinta';
      case 5:
        return 'Sexta';
      case 6:
        return 'Sábado';
    }
  }

  formatarData(data: Date): string {
    const diaDaSemana = this.recuperaDiaDaSemana(data.getDay());
    const diaDoMes = ('00' + data.getDate()).slice(-2);
    const mes = ('00' + (data.getMonth() + 1)).slice(-2);

    return `${diaDaSemana} (${diaDoMes}/${mes})`;
  }

  recuperaDataDaSessao(): string {
    if (!(this.sessao?.data_inicio && this.sessao?.data_fim)) {
        return '';
    }
    const dataInicio = new Date(this.sessao?.data_inicio);
    const dataFim = new Date(this.sessao?.data_fim);

    return `${this.formatarData(dataInicio)} - ${this.formatarData(dataFim)}`;
  }

  atualizaTempo(): void {
    const dataAtual = new Date();
    const dataFim = new Date(this.sessao?.data_inicio);

    let tempoRestante = dataFim.getTime() - dataAtual.getTime();

    if (tempoRestante <= 0) {
      this.comecou = true;

      return;
    }

    const dias = Math.trunc(tempoRestante / 86400000);
    this.dias = dias > 0 ? ('00' + dias).slice(-2) : '00';
    tempoRestante -= dias * 86400000;

    const horas = Math.trunc(tempoRestante / 3600000);
    this.horas = horas > 0 ? ('00' + horas).slice(-2) : '00';
    tempoRestante -= horas * 3600000;

    const minutos = Math.trunc(tempoRestante / 60000);
    this.minutos = minutos > 0 ? ('00' + minutos).slice(-2) : '00';
    tempoRestante -= minutos * 60000;

    const segundos = Math.trunc(tempoRestante / 1000);
    this.segundos = segundos > 0 ? ('00' + segundos).slice(-2) : '00';
  }
}
