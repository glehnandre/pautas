import { Component, OnInit, Input } from '@angular/core';
import { SessaoJulgamento } from '../../acervo/model/interfaces/sessao-julgamento.interface';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.scss']
})
export class ContadorComponent implements OnInit {
  @Input() sessao: SessaoJulgamento;

  dias: string;
  horas: string;
  minutos: string;
  segundos: string;

  timer: ReturnType<typeof setInterval>;

  constructor() { }

  ngOnInit(): void {
    this.timer = setInterval(() => {
        this.atualizaTempo();
    }, 1000);
  }

  ngOnDestroy(): void {
      if (this.timer) {
        clearInterval(this.timer);
      }
  }

  recuperaDiaDaSemana(numeroDiaDaSemana: number): string {
    switch(numeroDiaDaSemana) {
      case 0:
        return "Domingo";
      case 1:
        return "Segunda";
      case 2:
        return "Terça";
      case 3:
        return "Quarta";
      case 4:
        return "Quinta";
      case 5:
        return "Sexta";
      case 6:
        return "Sábado";
    }
  }

  formatarData(data: Date): string {
    var diaDaSemana = this.recuperaDiaDaSemana(data.getDay());
    var diaDoMes = ("00" + data.getDate()).slice(-2);
    var mes = ("00" + (data.getMonth() + 1)).slice(-2);

    return `${diaDaSemana} (${diaDoMes}/${mes})`;
  }

  recuperaDataDaSessao(): string {
    var data_inicio = new Date(this.sessao.data_inicio);
    var data_fim = new Date(this.sessao.data_fim);

    return `${this.formatarData(data_inicio)} - ${this.formatarData(data_fim)}`;
  }

  atualizaTempo(dataFim: Date = new Date()): void {
    var dataAtual = new Date();

    var tempoRestante = dataFim.getTime() - dataAtual.getTime();

    var dias = Math.trunc(tempoRestante / 86400000);
    this.dias = dias > 0 ? ("00" + dias).slice(-2) : "00";
    tempoRestante -= dias * 86400000;

    var horas = Math.trunc(tempoRestante / 3600000);
    this.horas = horas > 0 ? ("00" + horas).slice(-2) : "00";
    tempoRestante -= horas * 3600000;

    var minutos = Math.trunc(tempoRestante / 60000);
    this.minutos = minutos > 0 ? ("00" + minutos).slice(-2) : "00";
    tempoRestante -= minutos * 60000;

    var segundos = Math.trunc(tempoRestante / 1000);
    this.segundos = segundos > 0 ? ("00" + segundos).slice(-2) : "00";
  }
}
