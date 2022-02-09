import { Component, OnInit } from '@angular/core';
import { SessaoDeJulgamentoService } from '../services/sessao-de-julgamento.service';
import { SessaoDeJulgamento } from '../acervo/model/interfaces/sessao-julgamento.interface';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { DatePipe } from '@angular/common';
import { Ministro } from '../acervo/model/interfaces/ministro.interface';
import { Secretario } from '../acervo/model/interfaces/secretario.interface';
import { ActivatedRoute } from '@angular/router';
import { AlertaService } from '../services/alerta.service';
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
    private _sessaoDeJulgamentoService: SessaoDeJulgamentoService,
    private _route: ActivatedRoute,
    private _alertaService: AlertaService,
  ) { }

  queryParams: {
    numero: number;
    ano: number;
  };

  sessao: SessaoDeJulgamento = {} as SessaoDeJulgamento;
  sessaoFinalizada: SessaoFinalizada = {} as SessaoFinalizada;

  mensagem: string;

  /**
   * On init
   */
  ngOnInit(): void {
    const { numero, ano } = this._route.snapshot.queryParams;
    this.queryParams = {
      numero,
      ano
    };

    this._sessaoDeJulgamentoService.listarSessoesDeJulgamento(numero,ano).subscribe(sessao=>{
      this.sessao = sessao;
    });
  }

  /**
   * Retorna uma string contendo o dia da semana e a data em números
   * Ex: Segunda (12/10)
   */
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

  /**
   * Transforma apenas a primeira letra da string em maiúscula
   * @param str string para ser tratada
   */
  firstToUpperCase(str: string){
    if(str){
    str = str.toLowerCase();
    return str[0].toUpperCase() + str.substr(1);
    }
  }

  /**
   * Recupera a composição da sessão
   * @param event evento que é retornado do componente
   */
  recuperaComposicao(event: any){
    this.sessaoFinalizada.ministros_presentes = event.presentes;
    this.sessaoFinalizada.ministros_ausentes = event.ausentes;
    this.sessaoFinalizada.presidencia = event.presidencia;
  }

  /**
   * Recupera o form da sessão inserido pelo usuário
   * @param event evento que é retornado do componente
   */
  recuperaForm(event: any){
    console.log("EVENTO!");
    console.log(event);
    this.sessaoFinalizada.cabecalho = event.cabecalho;
    this.sessaoFinalizada.outros_presentes = event.outrosPresentes;
    this.sessaoFinalizada.secretario = event.secretario;
  }

  /**
   * Verifica se não há erro na finalização da sessão e emite o resultado para
   * JulgamentoService.
   */
  salvar(){
    if(!this.sessaoFinalizada.presidencia)
      this.alertaDeErro("Selecione um presidente");
    else if(!this.sessaoFinalizada.secretario)
      this.alertaDeErro("Secretário da sessão inválido");
    else {
      this._sessaoDeJulgamentoService.finalizarSessaoDeJulgamento(this.queryParams.numero, this.queryParams.ano, this.sessaoFinalizada).subscribe(data=>{ 
        //refatorar para incluir o retorno da mensagem 
      });
      this.mensagem = `A sessão ${this.sessao.numero}/${this.sessao.ano} ${this.sessao.tipo} ${this.sessao.modalidade} foi encerrada e as atividades decorrentes da finalização foram criadas.`
      this._alertaService.exibirAlerta('Sucesso')
    }
  }

  /**
   * Exibe uma mensagem de erro na tela
   * @param mensagem mensagem para ser exibida
   */
  alertaDeErro(mensagem: string): void {

    this.mensagem = mensagem;

    this._alertaService.exibirAlerta('Sessao invalida')
  }
}
