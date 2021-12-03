import { Component, OnInit } from '@angular/core';
import { JulgamentoService } from '../services/julgamento.service';
import { SessaoJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { DatePipe } from '@angular/common';
registerLocaleData(localePT);

@Component({
  selector: 'app-finalizar-sessao-julgamento',
  templateUrl: './finalizar-sessao-julgamento.component.html',
  styleUrls: ['./finalizar-sessao-julgamento.component.scss']
})

export class FinalizarSessaoJulgamentoComponent implements OnInit {

  constructor(
    private _julgamentoService: JulgamentoService
  ) { }
  sessao: SessaoJulgamento = {} as SessaoJulgamento;

  ngOnInit(): void {
    this._julgamentoService.listarSessoesDeJulgamento(1000,2021).subscribe(sessao=>{
      this.sessao = sessao;
      console.log(sessao);

    });
  }

  getData(): string{
    const datepipe: DatePipe = new DatePipe('pt-BR');

    const diaSemana_dia_mes = (data: string) => {
      if(data == null) return 'Falha ao pegar data';
      const dataCompleta = datepipe.transform(data, 'EEEE-dd/MM').split('-');
      const dia_mes = dataCompleta.pop();
      let diaSemana = dataCompleta.shift()
      diaSemana = this.firstToUpperCase(diaSemana);
      return `${diaSemana} (${dia_mes})`;
    }
    const dataInicio = diaSemana_dia_mes(this.sessao?.data_inicio);
    const dataFim = diaSemana_dia_mes(this.sessao?.data_fim);
    return dataInicio==dataFim? dataFim:`${dataInicio} - ${dataFim}`;
  }

  firstToUpperCase(str: string){
    if(str){
    str = str.toLowerCase();
    return str[0].toUpperCase() + str.substr(1);
    }
  }
}
