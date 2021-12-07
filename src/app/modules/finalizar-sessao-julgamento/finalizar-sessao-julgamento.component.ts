import { Component, OnInit } from '@angular/core';
import { JulgamentoService } from '../services/julgamento.service';
import { SessaoJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { DatePipe } from '@angular/common';
import { Ministro } from '../acervo/model/interfaces/ministro.interface';
import { Secretario } from '../acervo/model/interfaces/secretario.interface';
import { FuseAlertService } from '@fuse/components/alert';
registerLocaleData(localePT);

interface SessaoFinalizada {
  cabecalho: string,
  secretario: Secretario,
  outros_presentes: string,
  presidencia: Ministro,
  ministros_presentes: Ministro[],
  ministros_ausentes: Ministro[],
}

@Component({
  selector: 'app-finalizar-sessao-julgamento',
  templateUrl: './finalizar-sessao-julgamento.component.html',
  styleUrls: ['./finalizar-sessao-julgamento.component.scss']
})

export class FinalizarSessaoJulgamentoComponent implements OnInit {

  constructor(
    private _julgamentoService: JulgamentoService,
    private _fuseAlertService: FuseAlertService,
  ) { }

  sessao: SessaoJulgamento = {} as SessaoJulgamento;
  sessaoFinalizada: SessaoFinalizada = {} as SessaoFinalizada;

  mensagem: string;

  ngOnInit(): void {
    this._julgamentoService.listarSessoesDeJulgamento(1000,2021).subscribe(sessao=>{
      this.sessao = sessao;
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

  recuperaComposicao(event: any){
    this.sessaoFinalizada.ministros_presentes = event.presentes;
    this.sessaoFinalizada.ministros_ausentes = event.ausentes;
    this.sessaoFinalizada.presidencia = event.presidencia;
  }

  recuperaForm(event: any){
    this.sessaoFinalizada.cabecalho = event.cabecalho;
    this.sessaoFinalizada.outros_presentes = event.outrosPresentes;

    if(event.secretario == this.sessao.secretario.nome)
      this.sessaoFinalizada.secretario = this.sessao.secretario;
    else this.sessaoFinalizada.secretario = null;
  }

  salvar(){
    if(!this.sessaoFinalizada.presidencia)
      this.alertaDeErro("Selecione um presidente");
    else if(!this.sessaoFinalizada.secretario)
      this.alertaDeErro("Secretário da sessão inválido");
    else {
      this._julgamentoService.finalizarSessaoDeJulgamento(1000, 2021, this.sessaoFinalizada).subscribe(data=>{
        console.log(data, this.sessaoFinalizada);
      });
    }
  }

  alertaDeErro(mensagem: string): void {
    
    this.mensagem = mensagem;

    this._fuseAlertService.show('alertBox');

    setTimeout(() => {
      this._fuseAlertService.dismiss('alertBox');
    }, 5000);
  }
}
