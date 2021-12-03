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
    let inicio = '', fim = '', dataInicio, dataFim, semanaInicio = '', semanaFim = '';
      inicio = datepipe.transform(this.sessao.data_inicio, 'dd/MM-EEEE');
      if(inicio){
        dataInicio = inicio.split('-')[0];
        semanaInicio = inicio.split('-')[1];
        semanaInicio = this.firstToUpperCase(semanaInicio);
      }
      fim = datepipe.transform(this.sessao.data_fim, 'dd/MM-EEEE');
      if(fim){
        dataFim = fim.split('-')[0];
        semanaFim = fim.split('-')[1];
        semanaFim = this.firstToUpperCase(semanaFim);
      }

    return `${semanaInicio} (${dataInicio}) - ${semanaFim} (${dataFim})`;
  }

  firstToUpperCase(str: string){
    if(str){
    str = str.toLowerCase();
    return str[0].toUpperCase() + str.substr(1);
    }
  }
}
